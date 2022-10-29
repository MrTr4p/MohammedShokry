import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

async function Validation(body){
  if(body.projectName){
    
    if(!body.date){
      throw new createError(
        "لقد نسيت ان تضع قيمة ل خانة التاريخ",
        status.NOT_ACCEPTABLE,
      );
    }
    if(!body.amount){
      throw new createError(
        "لقد نسيت ان تضع قيمة ل خانة المبلغ",
        status.NOT_ACCEPTABLE,
      );
    }
    if(!body.inReturn){
      throw new createError(
        "لقد نسيت ان تضع قيمة ل خانة المقابل",
        status.NOT_ACCEPTABLE,
      );
    }
  }else{
    throw new createError(
      "لقد حدث خطأ ما , يرجي التاكد من المدخلات",
      status.NOT_ACCEPTABLE,
    );
  }
}

async function updatePublicBill(req, id: number) {
  console.log("//")
  const body = req.body;
  const result = []
  const workers = (await req.body.workers) || [];
  const oldProject = await prisma.projectBill.findFirst({
    where: {
      id: id,
    },
  });
  await Validation(body)
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
  //this.meili.index('project').addDocuments(result)
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
    const result = await updatePublicBill(req, id)
    res.status(200).json(result)
  }

