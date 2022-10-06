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
      console.log(!element.project.date)
      if (!element.project.date || !element.project.salary)
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
    
    const body = req.body;
    const result = []
    const workers = (await req.body.workers) || [];
    console.log(body)
    const oldProject = await this.prisma.projectBill.findFirst({
      where: {
        id: id,
      },
    });
    Validation(body)
    const projectBill = await this.prisma.projectBill.update({
      where: {
        id: oldProject.id,
      },
      data: {
        name: body.name || oldProject.name,
        clientAddress: body.clientAddress || oldProject.clientAddress,
        clientName: body.clientName || oldProject.clientName,
        date: body.date || oldProject.date,
        officePrecentage: body.officePrecentage || oldProject.officePrecentage,
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
      console.log(revenues);
      for (let i = 0; i < revenues.length; i++) {
        await this.prisma.revenue.create({
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
            amount: element.project.salary,
            precentage: element.project.precentage || 0,
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
        console.log(element);
        const section = await this.prisma.section.findFirst({
          where: {
            name: element.section.name,
          },
        });
        await this.prisma.expenses.create({
          data: {
            materialName: element.materialName,
            date: element.date,
            totalcost: element.totalcost,
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
