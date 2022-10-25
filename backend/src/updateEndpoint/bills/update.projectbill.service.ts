import { Injectable , HttpException, HttpStatus } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
import { PrismaService } from '../../prisma.service'
import { MeiliSearchService } from "src/meilisearch.service";

async function Validation(body) {
  if (body.name) {
    if(!body.date || !body.clientName || !body.clientAddress )
    {
      throw new HttpException(
        "يجب ملئ مدخلات الصف الاول",
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    for (let i = 0; i < body.workers.length; i++) {
      const element = body.workers[i];
      if (!element.project.date || !element.project.salary || !element.work || !element.name)
        throw new HttpException(
          "يبدو انك قمت باضافة عمال . تحقق و تاكد ان المدخلات ليست فارغة",
          HttpStatus.NOT_ACCEPTABLE,
        );
    }
    for (let i = 0; i < body.expenses.length; i++) {
      const element = body.expenses[i];
      console.log(element)
      if (
        !element.materialName ||
        !element.date ||
        !element.day ||
        !element.totalcost
      )
        throw new HttpException(
          "يبدو انك قمت باضافة مصروفات . تحقق و تاكد ان المدخلات ليست فارغة",
          HttpStatus.NOT_ACCEPTABLE,
        );
    }

   
    for (let i = 0; i < body.revenues.length; i++) {
      const element = body.revenues[i];
      console.log(element)
      if (!element.amount || !element.date)
        throw new HttpException(
          "يبدو انك قمت باضافة ارادات . تحقق و تاكد ان المدخلات ليست فارغة",
          HttpStatus.NOT_ACCEPTABLE,
        );
    }
  }else{
    throw new HttpException(
      "لقد حدث خطأ ما , يرجي التاكد من المدخلات",
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}




@Injectable()
export class CreateBillService {
  constructor(private prisma: PrismaService, private meili : MeiliSearchService) {}
  async updatePublicBill(req, id: number) {
    console.log("//")
    const body = req.body;
    const result = []
    const workers = (await req.body.workers) || [];
    const oldProject = await this.prisma.projectBill.findFirst({
      where: {
        id: id,
      },
    });
    await Validation(body)
    const projectBill = await this.prisma.projectBill.update({
      where: {
        id: oldProject.id,
      },
      data: {
        name: body.name || oldProject.name,
        clientAddress: body.clientAddress || oldProject.clientAddress,
        clientName: body.clientName || oldProject.clientName,
        date: body.date || oldProject.date,
        officePrecentage: Number(body.officePrecentage) || Number(oldProject.officePrecentage),
      },
    });
    result.push(projectBill)
    this.meili.index('project').addDocuments(result)
    try {
      await this.prisma.revenue.deleteMany({
        where: {
          projectBillId: projectBill.id,
        },
      });
    } catch (e) {}
  
    try {
      await this.prisma.expenses.deleteMany({
        where: {
          projectBillId: projectBill.id,
        },
      });
    } catch (e) {}
  
    try {
      await this.prisma.workerSalary.deleteMany({
        where: {
          projectBillId: projectBill.id,
        },
      });
    } catch (e) {}
    //not essential it is optional
    try {
      const revenues = body.revenues || [];
      for (let i = 0; i < revenues.length; i++) {
        await this.prisma.revenue.create({
          data: {
            amount: Number(revenues[i].amount),
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
    try {
      for (let i = 0; i < workers.length; i++) {
        const element = workers[i];
        const worker = await this.prisma.workerSalary.create({
          data: {
            Worker: {
              connect: {
                id: workers[i].id,
              },
            },
            date: element.project.date,
            amount: Number(element.project.salary),
            precentage: Number(element.project.precentage) || 0,
            ProjectBill: {
              connect: {
                id: projectBill.id,
              },
            },
          },
        });
      }
    } catch (e) {
      console.log(e);
    }

    const expenses = body.expenses;
    try {
      for (let i = 0; i < expenses.length; i++) {
        const element = expenses[i];
        console.log('hi' , element.section);
        let section = await this.prisma.section.findFirst({
          where: {
            id: element.section.id,
          },
        });
        if(!section){
          section = await this.prisma.section.create({
            data:{
              name: element.section.name,
              ProjectBill : {
                connect :{
                  id : projectBill.id
                }
              }
            
            }
          })
        }
        console.log('this' ,section)
        await this.prisma.expenses.create({
          data: {
            materialName: element.materialName,
            date: element.date,
            totalcost: Number(element.totalcost),
            day: element.day,

            ProjectBill: {
              connect: {
                id: projectBill.id,
              },
            },
            section: {
              connect: {
                id: section.id,
              },
            },
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
    return { message: "تم تعديل علي فاتورة مشروع بنجاح", error: true }
  }
}
