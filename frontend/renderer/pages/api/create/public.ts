import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient();
import * as status from "http-status";
import * as createError from "http-errors";
import MeiliSearch from "meilisearch";
const meili = new MeiliSearch({ host: "http://localhost:7700" });
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
    return {msg : '' , error : false , status: status.ACCEPTED}
  } else {
    return {
      msg: " لقد حدث خطأ ما يرجي التاكد من مدخلات الصف الاول",
      error: true,
      status: status.NOT_ACCEPTABLE,
    };
  }
}

async function createPublicBill(req, res) {
  const body = req.body;
  let project = [];
  const workers = (await req.body.workers) || [];
  let projectBill;
  const val = await Validation(body);
  if (val.error == true) {
    return res.status(val.status).send(val.msg);
  }
  try {
    projectBill = await prisma.projectBill.create({
      data: {
        name: body.name,
        clientAddress: body.clientAddress,
        clientName: body.clientName || null,
        date: body.date || null,
        officePrecentage: Number(body.officePrecentage) || 0,
      },
    });
    project.push(projectBill);
    await meili.index("project").addDocuments(project);
  } catch (e) {
    res.status(status.NOT_ACCEPTABLE).send("يبدو انه هنالك فاتورة مشروع اخري ب هذا الاسم")
  }

  const revenues = body.revenues;
  for (let i = 0; i < revenues.length; i++) {
    const revs = await prisma.revenue.create({
      data: {
        amount: revenues[i].amount,
        date: revenues[i].date,
        ProjectBill: {
          connect: {
            id: projectBill.id,
          },
        },
      },
    });
    console.log(revs);
  }

  console.log("phase 3");

  for (let i = 0; i < workers.length; i++) {
    const element = workers[i];
    console.log(element.project.salary);
    await prisma.workerSalary.create({
      data: {
        Worker: {
          connect: {
            id: element.id,
          },
        },
        date: element.project.date,
        amount: element.project.salary,
        precentage: element.project.precentage || 0,
        ProjectBill: {
          connect: {
            id: projectBill.id,
          },
        },
      },
    });
  }

  const expenses = body.expenses;
  console.log(expenses);
  for (let i = 0; i < expenses.length; i++) {
    const element = expenses[i];
    console.log(element.totalcost);

    const section = await prisma.section.findFirst({
      where: {
        projectBillId: projectBill.id,
        name: element.section.name,
      },
    });
    console.log(section);
    if (section) {
      await prisma.expenses.create({
        data: {
          materialName: element.materialName,
          date: element.date,
          totalcost: element.totalcost,
          day: element.day,
          section: {
            connect: {
              id: element.section.id,
            },
          },
          ProjectBill: {
            connect: {
              id: projectBill.id,
            },
          },
        },
      });
    } else {
      console.log("new section");
      const newSection = await prisma.section.create({
        data: {
          name: element.section.name,
          ProjectBill: {
            connect: {
              id: projectBill.id,
            },
          },
        },
      });

      await prisma.expenses.create({
        data: {
          materialName: element.materialName,
          date: element.date,
          totalcost: element.totalcost,
          day: element.day,
          section: {
            connect: {
              id: newSection.id,
            },
          },
          ProjectBill: {
            connect: {
              id: projectBill.id,
            },
          },
        },
      });
    }
  }
}

export default async function handler(req, res) {
  const result = await createPublicBill(req, res);
  res.status(200).json(result);
}
