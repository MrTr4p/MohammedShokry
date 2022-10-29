import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

interface theFinalResult {
  result: any[];
  totalCost: number;
  totalRevenues: number;
  officeCost: number;
}

async function getAggregateBill(id) {
  let theFinalResult: Partial<theFinalResult> = {};
  let result = [];
  let totalCost = 0;
  let totalRevenues = 0;
  let revenuesArray = [];
  let workersArray = [];
  let expensesArray = [];
  let officeCost = 0;
  const bill = await prisma.projectBill.findFirst({
    where: {
      id: Number(id),
    },
  });
  const workers = await prisma.workerSalary.findMany({
    where: {
      projectBillId: bill.id,
    },
    include: {
      Worker: true,
    },
  });
  const expenses = await prisma.expenses.findMany({
    where: {
      projectBillId: bill.id,
    },
    include: {
      section: true,
    },
  });
  const revenues = await prisma.revenue.findMany({
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

  export default async function handler(req, res) {
    const id = Number(req.query.id)
    const result = await getAggregateBill(id)
    res.status(200).json(result)
  }

