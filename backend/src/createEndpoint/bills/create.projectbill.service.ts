import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

@Injectable()
export class CreateBillService {
  async createPublicBill(req) {
    const body = req.body;
    let message = "";
    const workers = (await req.body.workers) || [];
    let projectBill;

    projectBill = await prisma.projectBill.create({
      data: {
        name: body.name,
        clientAddress: body.clientAddress,
        clientName: body.clientName || null,
        date: body.date || null,
        officePrecentage: body.officePrecentage || null,
      },
    });

    console.log(projectBill);

    const revenues = body.revenues || [];
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

    for (let i = 0; i < workers.length; i++) {
      const element = workers[i];
      console.log(element);
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
}
