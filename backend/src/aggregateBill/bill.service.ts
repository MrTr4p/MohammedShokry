// import { Injectable } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function getBill(reqParam) {
//   const bill = await prisma.projectBill.findFirst({
//     where: {
//       name: reqParam.name,
//     },
//   });
//   return bill;
// }

// async function getRevenues(bill) {
//   let totalRevenue = 0;
//   const revenues = await prisma.revenue.findMany({
//     where: {
//       projectBillId: bill.id,
//     },
//   });
//   for (let i = 0; i < revenues.length; i++) {
//     totalRevenue = revenues[i].amount + totalRevenue;
//   }

//   return totalRevenue;
// }

// async function getTotalCost(expenses, workers, officePrecentage) {
//   let totalCost = 0;
//   for (let i = 0; i < expenses.length; i++) {
//     totalCost = totalCost + expenses[i].cost;
//   }
//   for (let i = 0; i < workers.length; i++) {
//     totalCost = totalCost + workers[i].salary;
//   }
//   const precentage = totalCost * (officePrecentage / 100);
//   totalCost = totalCost + precentage;
//   return { totalCost, precentage };
// }

// async function findAlll(bill) {
//   const expensesArray = [];
//   let finalExpensesBill = [];
//   let finalWorkersBill = [];
//   const workersArray = [];

//   //expenses
//   const expenses = await prisma.expenses.findMany({
//     where: {
//       projectBillId: bill.id,
//     },
//   });

//   for (let i = 0; i < expenses.length; i++) {
//     if (expensesArray.includes(expenses[i].materialName) == false) {
//       expensesArray.push(expenses[i].materialName);
//     }
//   }

//   for (let i = 0; i < expensesArray.length; i++) {
//     let expensesCost = 0;
//     for (let l = 0; l < expenses.length; l++) {
//       if (expenses[l].materialName == expensesArray[i]) {
//         expensesCost = expensesCost + expenses[i].totalcost;
//       }
//     }
//     finalExpensesBill.push({
//       material: expensesArray[i],
//       cost: expensesCost,
//     });
//   }

//   //worker
//   const workers = await prisma.worker.findMany({
//     where: {
//       projectName: bill.name,
//     },
//   });
//   for (let i = 0; i < workers.length; i++) {
//     if (workersArray.includes(workers[i].work) == false) {
//       workersArray.push(workers[i].work);
//     }
//   }
//   for (let i = 0; i < workersArray.length; i++) {
//     let workersCost = 0;
//     for (let l = 0; l < workers.length; l++) {
//       if (workers[i].work == workersArray[l]) {
//         workersCost =
//           workersCost + workers[i].salary + workers[i].salaryPrecentage;
//       }
//     }

//     finalWorkersBill.push({
//       work: " مصنعية " + workersArray[i],
//       salary: workersCost,
//     });
//   }

//   const { totalCost, precentage } = await getTotalCost(
//     finalExpensesBill,
//     finalWorkersBill,
//     bill.officePrecentage,
//   );
//   console.log(totalCost, precentage);
//   return { finalExpensesBill, finalWorkersBill, totalCost, precentage };
// }

// @Injectable()
// export class BilService {
//   async getBill(param) {
//     const bill = await getBill(param);
//     const { finalExpensesBill, finalWorkersBill, totalCost, precentage } =
//       await findAlll(bill);
//     const revenue = await getRevenues(bill);

//     return {
//       finalExpensesBill,
//       finalWorkersBill,
//       totalCost,
//       precentage,
//       revenue,
//     };
//   }
// }
