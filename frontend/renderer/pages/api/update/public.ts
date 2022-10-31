import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'
import MeiliSearch from "meilisearch";
const meili =  new MeiliSearch({host:'http://localhost:7700'})
async function Validation(body) {
  console.log(body);
  if (body.name) {
    if (!body.date || !body.clientName || !body.clientAddress) {
      return {
        msg: "يجب ملئ مدخلات الصف الاول",
        error: true,
        status: status.NOT_ACCEPTABLE,
      };
    }

    for (let i = 0; i < body.workers.length; i++) {
      const element = body.workers[i];
      if (
        !element.project.date ||
        !element.project.salary ||
        !element.work ||
        !element.name
      ) {
        return {
          msg: "يبدو انك قمت باضافة عمال تحقق و تاكد ان المدخلات ليست فارغة",
          error: true,
          status: status.NOT_ACCEPTABLE,
        };
      }
    }
    for (let i = 0; i < body.expenses.length; i++) {
      const element = body.expenses[i];
      if (
        !element.materialName ||
        !element.date ||
        !element.day ||
        !element.totalcost
      ) {
        return {
          msg: "يبدو انك قمت باضافة مصروفات . تحقق و تاكد ان المدخلات ليست فارغة",
          error: true,
          status: status.NOT_ACCEPTABLE,
        };
      }
    }

    for (let i = 0; i < body.revenues.length; i++) {
      const element = body.revenues[i];
      console.log(element);
      if (!element.amount || !element.date) {
        return {
          msg: "يبدو انك قمت باضافة ارادات . تحقق و تاكد ان المدخلات ليست فارغة",
          error: true,
          status: status.NOT_ACCEPTABLE,
        };
      }
    }
  } else {
    return {
      msg: " لقد حدث خطأ ما يرجي التاكد من مدخلات الصف الاول",
      error: true,
      status: status.NOT_ACCEPTABLE,
    };
  }
}

async function updatePublicBill(req, id: number , res) {
  const body = req.body;
  const result = []
  const workers = (await req.body.workers) || [];
  const oldProject = await prisma.projectBill.findFirst({
    where: {
      id: id,
    },
  });
  const val = await Validation(body);
  if (val.error == true) {
    return res.status(val.status).send(val.msg);
  }
  const projectBill = await prisma.projectBill.update({
    where: {
      id: oldProject.id,
    },
    data: {
      name: body.name || oldProject.name,
      clientAddress: body.clientAddress || oldProject.clientAddress,
      clientName: body.clientName || oldProject.clientName,
      date: body.date || oldProject.date,
      officePrecentage: Number(body.officePrecentage) || Number(oldProject.officePrecentage),
    },
  });
  result.push(projectBill)
  await meili.index('project').addDocuments(result)
  try {
    await prisma.revenue.deleteMany({
      where: {
        projectBillId: projectBill.id,
      },
    });
  } catch (e) {}

  try {
    await prisma.expenses.deleteMany({
      where: {
        projectBillId: projectBill.id,
      },
    });
  } catch (e) {}

  try {
    await prisma.workerSalary.deleteMany({
      where: {
        projectBillId: projectBill.id,
      },
    });
  } catch (e) {}
  //not essential it is optional
  try {
    const revenues = body.revenues || [];
    for (let i = 0; i < revenues.length; i++) {
      await prisma.revenue.create({
        data: {
          amount: Number(revenues[i].amount),
          date: revenues[i].date,
          ProjectBill: {
            connect: {
              id: projectBill.id,
            },
          },
        },
      });
    }
  } catch (e) {}
  try {
    for (let i = 0; i < workers.length; i++) {
      const element = workers[i];
      const worker = await prisma.workerSalary.create({
        data: {
          Worker: {
            connect: {
              id: workers[i].id,
            },
          },
          date: element.project.date,
          amount: Number(element.project.salary),
          precentage: Number(element.project.precentage) || 0,
          ProjectBill: {
            connect: {
              id: projectBill.id,
            },
          },
        },
      });
    }
  } catch (e) {
    console.log(e);
  }

  const expenses = body.expenses;
  try {
    for (let i = 0; i < expenses.length; i++) {
      const element = expenses[i];
      console.log('hi' , element.section);
      let section = await prisma.section.findFirst({
        where: {
          id: element.section.id,
        },
      });
      if(!section){
        section = await prisma.section.create({
          data:{
            name: element.section.name,
            ProjectBill : {
              connect :{
                id : projectBill.id
              }
            }
          
          }
        })
      }
      console.log('this' ,section)
      await prisma.expenses.create({
        data: {
          materialName: element.materialName,
          date: element.date,
          totalcost: Number(element.totalcost),
          day: element.day,

          ProjectBill: {
            connect: {
              id: projectBill.id,
            },
          },
          section: {
            connect: {
              id: section.id,
            },
          },
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
  return { message: "تم تعديل علي فاتورة مشروع بنجاح", error: true }
}

  export default async function handler(req, res) {
    const id = Number(req.query.id)
    const result = await updatePublicBill(req, id , res)
    res.status(200).json(result)
  }

