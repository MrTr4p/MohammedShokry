import { Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

async function getWorkers(workers) {
  let result = [];
  for (let i = 0; i < workers.length; i++) {
    const elementResult = await prisma.worker.findFirst({
      where: {
        name: workers,
      },
    });
    result.push(elementResult);
  }
  return result;
}

@Injectable()
export class CreateBillService {
  async createPublicBill(req) {
    const body = req.body;
    const workers = (await req.body.workers) || [];
    const projectBill = await prisma.projectBill.create({
      data: {
        name: body.name,
        clientAddress: body.clientAddress,
        clientName: body.clientName,
        date: body.date,
        officePrecentage: body.officePrecentage,
      },
    });

    //not essential it is optional
    try {
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
    } catch (e) {}

    for (let i = 0; i < workers.length; i++) {
      const element = workers[i];
      for (let i = 0; i < workers.length; i++) {
        await prisma.workerSalary.create({
          data: {
            Worker: {
              connect: {
                id: workers[i].id,
              },
            },
            date: element.data,
            amount: element.amount,
            ProjectBill: {
              connect: {
                id: projectBill.id,
              },
            },
          },
        });
      }
    }

    return "تم اضافة فاتورة مشروع بنجاح";
  }
}
