import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Controller, Get, Post, Redirect, Req , HttpException, HttpStatus} from '@nestjs/common';
import { Request } from '@nestjs/common';
const prisma = new PrismaClient();

async function createBill(reqBody) {
  console.log("phase3")
  console.log(reqBody.expenses)
  if (reqBody.expenses && reqBody.revenues) {
    const projectBill = await prisma.projectBill.create({
      data: {
        name: reqBody.name,
        officePrecentage: reqBody.precentage,
      },
    });

    const expenses = reqBody.expenses;
    for (let i = 0; i < expenses.length; i++) {
      const rev = await prisma.expenses.create({
        data: {
          totalcost: expenses[i].totalcost,
          date: new Date(expenses[i].date),
          materialName: expenses[i].materialName,
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
  } else {
    console.log('Error')
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}


@Injectable()
export class AppService {
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
        createBill(reqBody);
      } else {
        await prisma.projectBill.delete({
          where: {
            name: oldBill.name,
          },
        });
      }
    } catch (e) {
      createBill(reqBody);
    }
  }
}
