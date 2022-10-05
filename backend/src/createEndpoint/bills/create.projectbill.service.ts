import { Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

@Injectable()
export class CreateBillService {
  async createPublicBill(req) {
    const body = req.body;
    const workers = (await req.body.workers) || [];
    const projectBill = await prisma.projectBill.create({
      data: {
        name: body.name,
        clientAddress: body.clientAddress,
        clientName: body.clientName,
        date: body.date,
        officePrecentage: body.officePrecentage,
      },
    });

    //not essential it is optional
    try {
      const revenues = body.revenues || [];
      for (let i = 0; i < revenues.length; i++) {
        await prisma.revenue.create({
          data: {
            amount: revenues[i].amount,
            date: revenues[i].date,
            ProjectBill: {
              connect: {
                id: projectBill.id,
              },
            },
          },
        });
      }
    } catch (e) {}

    for (let i = 0; i < workers.length; i++) {
      const element = workers[i];
        await prisma.workerSalary.create({
          data: {
            Worker: {
              connect: {
                id: workers[i].worker.id,
              },
            },
            date: element.date,
            amount: element.amount,
            //@ts-ignore
            precentage: element.precentage || 0,
            ProjectBill: {
              connect: {
                id: projectBill.id,
              },
            },
          },
        });
      }
    

        const expenses = body.expenses
        console.log(expenses)
        for (let i = 0; i < expenses.length; i++) {
          const element = expenses[i];
          console.log(element)

          const section = await prisma.section.findFirst({
            where:{
              projectBillId: projectBill.id,
              name: element.section.name
            }
          })
          if(section)
          {
            await prisma.expenses.create({
              data:{
                materialName: element.materialName, 
                date:element.date,
                totalcost: element.cost,
                day:element.day,
                section:{
                  connect:{
                    id:element.section.id
                  }
                },
                ProjectBill: {
                  connect:{
                    id: projectBill.id
                  }
                }
              }
            })
          }else {
            console.log('new section')
            const newSection = await prisma.section.create({
              data:{
                name: element.section.name    ,
                ProjectBill: {
                  connect:{
                    id:projectBill.id
                  }
                }
                  
              }
            })

            await prisma.expenses.create({
              data:{
                materialName: element.materialName, 
                date:element.date,
                totalcost: element.cost,
                day:element.day,
                section:{
                  connect:{
                    id:newSection.id
                  }
                },
                ProjectBill: {
                  connect:{
                    id: projectBill.id
                  }
                }
              }
            })

          }

          
        }

    return { message: "تم اضافة فاتورة مشروع بنجاح" };
  }
}
