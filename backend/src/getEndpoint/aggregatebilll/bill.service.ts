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
      },
    });
    for (let i = 0; i < workers.length; i++) {
      if (!workersArray.includes(workers[i].Worker.work)) {
        workersArray.push(workers[i].Worker.work);
      }
    }
    for (let i = 0; i < workersArray.length; i++) {
      let workerCost = 0;
      for (let i = 0; i < workers.length; i++) {
        if (workersArray.includes(workers[i].Worker.work)) {
          workerCost = workerCost + workers[i].amount;
        }
        result.push({
          name: "مصنعية " + workersArray[i],
          totalCost: workerCost,
        });
      }
    }
    for (let i = 0; i < revenues.length; i++) {
      if (!revenuesArray.includes(revenues[i].date)) {
        revenuesArray.push(revenues[i].date);
      }
    }
    for (let i = 0; i < revenuesArray.length; i++) {
      let revenueCost = 0;
      for (let i = 0; i < revenues.length; i++) {
        if (revenuesArray.includes(revenues[i].date)) {
          revenueCost = revenueCost + revenues[i].amount;
        }
      }
      totalRevenues = totalRevenues + revenueCost;
    }
    for (let i = 0; i < expenses.length; i++) {
      if (!expensesArray.includes(expenses[i].section.name)) {
        expensesArray.push(expenses[i].section.name);
      }
    }

    for (let i = 0; i < expensesArray.length; i++) {
      let expenseCost = 0;
      for (let i = 0; i < expenses.length; i++) {
        if (expensesArray.includes(expenses[i].section.name)) {
          expenseCost = expenseCost + expenses[i].totalcost;
        }
      }
      result.push({
        name: expensesArray[i],
        totalCost: expenseCost,
      });
    }
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      totalCost = element.totalCost;
    }
    console.log("this is result ", result);
    theFinalResult.officeCost = totalCost * (bill.officePrecentage / 100);
    theFinalResult.result = result;
    theFinalResult.totalCost = totalCost;
    theFinalResult.totalRevenues = totalRevenues;
    console.log(theFinalResult);
    return theFinalResult;
  }
}
