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

// @Injectable()
// export class BilService {
//   async getWorkerBill(param, request) {
//     const bill = await getBill(param);
//     let totalsalary = 0;
//     const workerBill = await prisma.worker.findMany({
//       where: {
//         projectName: bill.name,
//         workerName: request.body.workerName,
//       },
//     });
//     for (let i = 0; i < workerBill.length; i++) {
//       totalsalary = totalsalary + workerBill[i].salary;
//     }
//     console.log(workerBill);
//     return { worker: workerBill, totalsalary: totalsalary };
//   }
// }
