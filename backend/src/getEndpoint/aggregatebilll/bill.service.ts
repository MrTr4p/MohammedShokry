import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";



@Injectable()
export class AggregateBilService {
  constructor(private prisma : PrismaService) {}

  async getAggregateBill(param) {
    let workersArray = [];
    let expensesArray = [];
    let finalWorkersBill = [];
    let finalExpensesBill = [];
    const bill  = await this.prisma.projectBill.findFirst({
      where: {
        id: Number(param.id),
      },
    });
    const workers = await this.prisma.workerSalary.findMany({
      where: {
        projectBillId: bill.id,
      },
      include: {
        Worker: true,
      },
    });
    const expenses = await this.prisma.expenses.findMany({
      where: {
        projectBillId: bill.id,
      },
      include: {
        section: true,
      },
    }); 

    for (let i = 0; i < workers.length; i++) {
      if (!workersArray.includes(workers[i].Worker.work)) {
        workersArray.push(workers[i].Worker.work);
        console.log(workersArray)
      }
    }
    for (let i = 0; i < workersArray.length; i++) {
      let workerCost = 0;
      for (let i = 0; i < workers.length; i++) {
        if (workersArray.includes(workers[i].Worker.work)) {
          workerCost = workerCost + workers[i].amount;
        }
        finalWorkersBill.push({
          work:  "مصنعية " + workersArray[i] ,
          totalCost: workerCost
        })
    }
  }
    for (let i = 0; i < expenses.length; i++) {
      console.log("//")
      if (!expensesArray.includes(expenses[i].section.name)) {
        expensesArray.push(expenses[i].section.name);
        console.log(expensesArray)
      }
    }

    for (let i = 0; i < expensesArray.length; i++) {
      let expenseCost = 0;
      for (let i = 0; i < expenses.length; i++) {
        if (expensesArray.includes(expenses[i].section.name)) {
          expenseCost = expenseCost + expenses[i].totalcost;
        }
      }
      console.log(expensesArray[i])
      finalExpensesBill.push({
        section: expensesArray[i],
        totalCost: expenseCost,
      });
    }
    console.log('hi' , finalExpensesBill , finalWorkersBill)
    return { finalExpensesBill, finalWorkersBill };
  }
}

    


  
