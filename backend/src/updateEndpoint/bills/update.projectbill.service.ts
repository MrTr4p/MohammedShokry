import { Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

async function deleteStage(projectBill) {
  console.log(projectBill.id);
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
}

@Injectable()
export class CreateBillService {
  async updatePublicBill(req, id: number) {
    const body = req.body;
    const workers = (await req.body.workers) || [];

    const oldProject = await prisma.projectBill.findFirst({
      where: {
        id: id,
      },
    });

    const projectBill = await prisma.projectBill.update({
      where: {
        id: oldProject.id,
      },
      data: {
        name: body.name || oldProject.name,
        clientAddress: body.clientAddress || oldProject.clientAddress,
        clientName: body.clientName || oldProject.clientName,
        date: body.date || oldProject.date,
        officePrecentage: body.officePrecentage || oldProject.officePrecentage,
      },
    });

    await deleteStage(projectBill);
    //not essential it is optional
    try {
      const revenues = body.revenues || [];
      console.log(revenues);
      for (let i = 0; i < revenues.length; i++) {
        await prisma.revenue.create({
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
      }
    } catch (e) {}
    try {
      for (let i = 0; i < workers.length; i++) {
        const element = workers[i];
        const worker = await prisma.workerSalary.create({
          data: {
            Worker: {
              connect: {
                id: workers[i].worker.id,
              },
            },
            date: element.date,
            amount: element.amount,
            precentage: element.precentage || 0,
            ProjectBill: {
              connect: {
                id: projectBill.id,
              },
            },
          },
        });
        console.log(worker);
      }
    } catch (e) {
      console.log(e);
    }

    const expenses = body.expenses;
    try {
      for (let i = 0; i < expenses.length; i++) {
        const element = expenses[i];
        const section = await prisma.section.findFirst({
          where: {
            name: element.section.name,
          },
        });
        await prisma.expenses.create({
          data: {
            materialName: element.materialName,
            date: element.date,
            totalcost: element.cost,
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

    return "تم تعديل علي فاتورة مشروع بنجاح";
  }
}
