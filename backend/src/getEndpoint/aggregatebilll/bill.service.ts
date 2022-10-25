import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

interface theFinalResult {
  result: any[];
  totalCost: number;
  totalRevenues: number;
  officeCost: number;
}

@Injectable()
export class AggregateBilService {
  constructor(private prisma: PrismaService) {}

  async getAggregateBill(param) {
    let theFinalResult: Partial<theFinalResult> = {};
    let result = [];
    let totalCost = 0;
    let totalRevenues = 0;
    let revenuesArray = [];
    let workersArray = [];
    let expensesArray = [];
    let officeCost = 0;
    const bill = await this.prisma.projectBill.findFirst({
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
    const revenues = await this.prisma.revenue.findMany({
      where: {
        projectBillId: bill.id,
      }
    });
    for (let i = 0; i < workers.length; i++) {
      if (!workersArray.includes(workers[i].Worker.work)) {
        workersArray.push(workers[i].Worker.work);
        
      }
    }
    for (let i = 0; i < workersArray.length; i++) {
      let workerCost = 0
      console.log(workersArray)
      for (let l = 0; l < workers.length; l++) {
        if(workersArray[i] == workers[l].Worker.work){
          workerCost = workerCost + workers[l].amount
        }
        
      }
      result.push({
        name:  ' مصنعية ' + workersArray[i],
        totalCost : workerCost
      })
    }
    for (let i = 0; i < expenses.length; i++) {
      if (!expensesArray.includes(expenses[i].section.name)) {
        expensesArray.push(expenses[i].section.name);
      }
    }

    for (let i = 0; i < expensesArray.length; i++) {
      let expensesCost = 0
      console.log(workersArray)
      for (let l = 0; l < expenses.length; l++) {
        if(expensesArray[i] == expenses[l].section.name){
          expensesCost = expensesCost + expenses[l].totalcost
        }
        
      }
      result.push({
        name:expensesArray[i],
        totalCost : expensesCost
      })
    }
    revenues.map(x => {
      totalRevenues =  totalRevenues + x.amount
    })
    result.map(x => {
      totalCost = totalCost + x.totalCost
    })
    theFinalResult.officeCost = totalCost * (bill.officePrecentage / 100);
    theFinalResult.result = result;
    theFinalResult.totalCost = totalCost;
    theFinalResult.totalRevenues = totalRevenues;
    return theFinalResult;
  }
}
