import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
const prisma = new PrismaClient();

async function getBill(reqParam) {
  const bill = await prisma.projectBill.findFirst({
    where: {
      name: reqParam.name,
    },
  });
  return bill;
}

async function getAll(projectBill) {
  const workers = await prisma.workerSalary.findMany({
    where: {
      projectBillId: projectBill.id,
    },
    include: {
      Worker: true,
    },
  });
  const expenses = await prisma.expenses.findMany({
    where: {
      projectBillId: projectBill.id,
    },
    include: {
      section: true,
    },
  });

  return { workers, expenses };
}

@Injectable()
export class AggregateBilService {
  async getAggregateBill(param) {
    let workersArray = [];
    let expensesArray = [];
    let finalWorkersBill = [];
    let finalExpensesBill = [];
    const projectBill: { id: any } = await getBill(param);
    const { workers, expenses } = await getAll(projectBill);

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
<<<<<<< Updated upstream
=======
        finalWorkersBill.push({
          work:  "مصنعية " + workersArray[i] ,
          totalCost: workerCost
        })
>>>>>>> Stashed changes
      }
      finalWorkersBill.push({
        work: workersArray[i],
        totalCost: workerCost,
      });
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
      finalExpensesBill.push({
        section: expensesArray[i],
        totalCost: expenseCost,
      });
    }

    return { finalExpensesBill, finalWorkersBill };
  }
}
