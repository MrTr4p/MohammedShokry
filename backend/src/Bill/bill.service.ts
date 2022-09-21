import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Controller, Get, Post, Redirect, Req , HttpException, HttpStatus} from '@nestjs/common';
import { Request } from '@nestjs/common';
const prisma = new PrismaClient();

async function getBill(reqParam){
  const bill = await prisma.projectBill.findFirst({
    where:{
      name:reqParam.name
    }
    
  })
  return bill
}

async function createAndModify(reqBody, projectBill) {
  const expenses = reqBody.expenses;
    for (let i = 0; i < expenses.length; i++) {
      const materialName = expenses[i].materialName.trim()
      const rev = await prisma.expenses.create({
        data: {
          materialName: materialName,
          totalcost: expenses[i].totalcost,
          date: new Date(expenses[i].date),
          
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
    const workers = reqBody.workers
    for (let i = 0; i < workers.length; i++) {
      console.log(workers[i]);
      const workerName = workers[i].workerName.trim() 
      const rev = await prisma.worker.create({
        data: {
          workerName: workerName,
          date: new Date(workers[i].date),
          salary: workers[i].salary,
          precentage: workers[i].precentage,
          salaryPrecentage: workers[i].salary * ( workers[i].precentage/100),
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


    const revenues = reqBody.revenues;
    for (let i = 0; i < revenues.length; i++) {
      console.log(revenues[i]);
      const rev = await prisma.revenue.create({
        data: {
          amount: revenues[i].amount,
          date: new Date(revenues[i].date),
          ProjectBill: {
            connect: {
              id: projectBill.id,
            },
          },
        },
      });
    }
}

async function createBill(reqBody) {
  console.log("phase3")
  console.log(reqBody.expenses)

  if (reqBody.expenses && reqBody.revenues && reqBody.workers) {
    const projectName = reqBody.name.trim()
    const projectBill = await prisma.projectBill.create({
      data: {
        name: projectName,
        //@ts-ignore
        date: new Date(reqBody.date),
        officePrecentage: reqBody.precentage,
        clientName: reqBody.clientName,
        clientAddress: reqBody.clientAddress
      },
    });

    createAndModify(reqBody, projectBill)

    
  } else {
    console.log('Error')
    throw new HttpException({
      status: HttpStatus.NOT_ACCEPTABLE,
      error: 'لا يمكن اضافة فاتورة جديدة بدون مصروفات و ارادات',
    }, HttpStatus.NOT_ACCEPTABLE);
  }
}


@Injectable()
export class BilService {
  async createNewBill(request: Request) {
    console.log('phase2')
    let reqBody  = request.body as any
    let oldBill  = await prisma.projectBill.findFirst({
      where: {
        name: reqBody.name,
      },
    }) as any;
    
    
    try {
      if (oldBill.expenses && oldBill.revenues) {
        await createBill(reqBody);
      } else {
        await prisma.projectBill.delete({
          where: {
            name: oldBill.name,
          },
        });
      }
    } catch (e) {
      await createBill(reqBody);
    }
  }


  async getBill(param){
    const reqParam: {name: string} = param as any
    console.log(reqParam.name)
    const bill = await getBill(reqParam)
    
    
    if(bill){
      const revenues = await prisma.revenue.findMany({
        where:{
          projectBillId: bill.id
        }
      })
      const expenses = await prisma.expenses.findMany({
        where:{
          projectBillId: bill.id
        }
      })
      const workers = await prisma.worker.findMany({
        where:{
          projectId: bill.id
        }
      })
      return {bill,expenses, revenues, workers}
    }
    else{
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error:"لا توجد فاتورة ب هذا الاسم"
      }, HttpStatus.NOT_FOUND);
    }
  }

  async deleteBill(param){
    const reqParam = param
    const bill = await getBill(reqParam)
    await prisma.revenue.deleteMany({
      where:{
        projectBillId: bill.id
      }
    })
    await prisma.expenses.deleteMany({
      where:{
        projectBillId: bill.id
      }
    })
    await prisma.worker.deleteMany({
      where:{
        projectId: bill.id
      }
    })
    await prisma.projectBill.delete({
      where:{
        id: bill.id
      }
    })
    return "لقد تم مسح الفاتورة ب نجاح"
  }

  async modifyBill(param , request){
    const reqParam = param
    const reqBody = request.body
    const bill = await getBill(reqParam)
    createAndModify(reqBody, bill)
  }
}
