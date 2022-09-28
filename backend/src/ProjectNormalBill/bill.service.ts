import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, ProjectBill } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { BillController } from './bill.controller';
const prisma = new PrismaClient();

async function modeifyAndDelete(reqBody) {
  try {
    for (let i = 0; i < reqBody.workers.length; i++) {
      await prisma.worker.delete({
        where: {
          id: reqBody.workers[i],
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
  try {
    for (let i = 0; i < reqBody.revenues.length; i++) {
      await prisma.revenue.delete({
        where: {
          id: reqBody.revenues[i],
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
  try {
    for (let i = 0; i < reqBody.expenses.length; i++) {
      await prisma.expenses.delete({
        where: {
          id: reqBody.expenses[i],
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
}

async function getBill(reqParam) {
  const bill = await prisma.projectBill.findFirst({
    where: {
      name: reqParam.name,
    },
  });
  return bill;
}

async function createAndModify(reqBody, projectBill) {
  try {
    const expenses = reqBody.expenses;

    for (let i = 0; i < expenses.length; i++) {
      const materialName = expenses[i].materialName.trim();
      const rev = await prisma.expenses.create({
        data: {
          materialName: materialName,
          totalcost: expenses[i].totalcost,
          date: new Date(expenses[i].date).toLocaleDateString(),

          day: expenses[i].day,
          billCode: expenses[i].billCode,
          ProjectBill: {
            connect: {
              id: projectBill.id,
            },
          },
        },
      });

      
    }
  } catch (e) {
    //console.log(e);
  }

  try {
    const workers = reqBody.workers;
    for (let i = 0; i < workers.length; i++) {
      if (workers[i].precentage == null) {
        workers[i].precentage = 0;
      }
      const workerName = workers[i].workerName.trim();
      const rev = await prisma.worker.create({
        data: {
          workerName: workerName,
          date: new Date(workers[i].date).toLocaleDateString(),
          salary: workers[i].salary,
          precentage: workers[i].precentage,
          salaryPrecentage: Number(
            workers[i].salary * (workers[i].precentage / 100),
          ),
          projectName: projectBill.name,
          work: workers[i].work,
          projects: {
            connect: {
              id: projectBill.id,
            },
          },
        },
      });
    }
  } catch (e) {
    //console.log(e);
  }

  try {
    const revenues = reqBody.revenues;

    for (let i = 0; i < revenues.length; i++) {
      const rev = await prisma.revenue.create({
        data: {
          amount: revenues[i].amount,
          date: new Date(revenues[i].date).toLocaleDateString(),
          ProjectBill: {
            connect: {
              id: projectBill.id,
            },
          },
        },
      });
      
    }
  } catch (e) {
    //console.log(e);
  }
  return 'تم انشاء الفاتورة بنجاح';
}

async function createBill(reqBody) {
  console.log('phase3');

  if (reqBody.expenses && reqBody.revenues && reqBody.workers) {
    try {
      const projectBill = await prisma.projectBill.create({
        data: {
          name: reqBody.name.trim(),
          date: new Date(reqBody.date).toLocaleDateString(),
          officePrecentage: reqBody.precentage,
          projectStatus: false,
          clientName: reqBody.clientName,
          clientAddress: reqBody.clientAddress,
        },
      });
      createAndModify(reqBody, projectBill);
      const totalExpensesCost = await prisma.expenses.aggregate({
        where:{
          projectBillId: projectBill.id
        },
        _sum:{
          totalcost:true
        }
      })
      const totalRevenue = await prisma.revenue.aggregate({
        where:{
          projectBillId:projectBill.id
        },
        _sum:{
          amount: true
        }
      })
      const status = (totalExpensesCost._sum.totalcost - totalRevenue._sum.amount <= 0)
      console.log(status)
      const rev = await prisma.projectBill.update({
        where:{
          id:projectBill.id
        },
        data:{
          projectStatus:status
        }
      })
    } catch (e) {
      console.log('error');
      console.log(e);
    }
  } else {
    console.log('Error');
    throw new HttpException(
      {
        status: HttpStatus.NOT_ACCEPTABLE,
        error: 'لا يمكن اضافة فاتورة جديدة بدون مصروفات و ارادات',
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}

@Injectable()
export class BilService {
  async createNewBill(request: Request) {
    console.log('phase2');
    //@ts-ignore
    let reqBody = request.body.new as any;
    let oldBill = (await prisma.projectBill.findFirst({
      where: {
        name: reqBody.name,
      },
    })) as any;
    console.log(oldBill);

    try {
      if (oldBill.expenses && oldBill.revenues) {
        await createBill(reqBody);
        console.log('12');
      } else {
        await prisma.projectBill.delete({
          where: {
            name: oldBill.name,
          },
        });
      }
    } catch (e) {
      console.log(e);
      await createBill(reqBody);
    }
  }

  async getBill(param) {
    const reqParam: { name: string } = param as any;
    const bill = await getBill(reqParam);

    if (bill) {
      const revenues = await prisma.revenue.findMany({
        where: {
          projectBillId: bill.id,
        },
      });
      const expenses = await prisma.expenses.findMany({
        where: {
          projectBillId: bill.id,
        },
      });
      const workers = await prisma.worker.findMany({
        where: {
          projectId: bill.id,
        },
      });
      const totalCost = await prisma.expenses.aggregate({
        where:{
          projectBillId:bill.id
        },
        _sum:{
          totalcost:true
        }
      })
      return { bill: bill, expenses, revenues, workers, totalCost };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'لا توجد فاتورة ب هذا الاسم',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteBill(param) {
    const reqParam = param;
    const bill = await getBill(reqParam);
    await prisma.revenue.deleteMany({
      where: {
        projectBillId: bill.id,
      },
    });
    await prisma.expenses.deleteMany({
      where: {
        projectBillId: bill.id,
      },
    });
    await prisma.worker.deleteMany({
      where: {
        projectId: bill.id,
      },
    });
    await prisma.projectBill.delete({
      where: {
        id: bill.id,
      },
    });
    return 'لقد تم مسح الفاتورة ب نجاح';
  }

  async modifyBill(param, request) {
    const reqParam = param;
    const newReqBody = request.body.new;
    const oldReqBody = request.body.delete;
    const bill = await getBill(reqParam);
    if (bill) {
      createAndModify(newReqBody, bill);
      modeifyAndDelete(oldReqBody);
      const totalExpensesCost = await prisma.expenses.aggregate({
        where:{
          projectBillId: bill.id
        },
        _sum:{
          totalcost:true
        }
      })
      const totalRevenue = await prisma.revenue.aggregate({
        where:{
          projectBillId:bill.id
        },
        _sum:{
          amount: true
        }
      })
      console.log(totalExpensesCost._sum.totalcost, totalRevenue._sum.amount)
      const status = (totalExpensesCost._sum.totalcost - totalRevenue._sum.amount <= 0)
      console.log(status)
      const rev = await prisma.projectBill.update({
        where:{
          id:bill.id
        },
        data:{
          projectStatus:status
        }
      })
      console.log(rev)
      return 'لقد تم تحديث الفاتورة ب نجاح';
    } else {
      return 'لا توجد فاتورة بهذا الاسم';
    }
  }
}
