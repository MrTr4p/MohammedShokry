import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
import { PrismaService } from "src/prisma.service";
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
  constructor(private prisma : PrismaService , private meili : MeiliSearchService) {}
  async createPublicBill(req) {
    const body = req.body;
    let project = [];
    const workers = (await req.body.workers) || [];
    let projectBill;
    await Validation(body);
    
    try {
      projectBill = await this.prisma.projectBill.create({
        data: {
          name: body.name,
          clientAddress: body.clientAddress,
          clientName: body.clientName || null,
          date: body.date || null,
          officePrecentage: Number(body.officePrecentage) || 0 ,
        },
      });
      project.push(projectBill)
      this.meili.index('project').addDocuments(project)
    } catch (e) {
      console.log(e)
      throw new HttpException("اسم هذا المشروع مستخدم في فاتورة مشروع مسبقا", HttpStatus.BAD_REQUEST);
    }

    const revenues = body.revenues;
    for (let i = 0; i < revenues.length; i++) {
      const revs = await this.prisma.revenue.create({
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
      console.log(revs);
    }

    console.log("phase 3");

    for (let i = 0; i < workers.length; i++) {
      const element = workers[i];
      console.log(element.project.salary);
      await this.prisma.workerSalary.create({
        data: {
          Worker: {
            connect: {
              id: element.id,
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

    const expenses = body.expenses;
    console.log(expenses);
    for (let i = 0; i < expenses.length; i++) {
      const element = expenses[i];
      console.log(element.totalcost);

      const section = await this.prisma.section.findFirst({
        where: {
          projectBillId: projectBill.id,
          name: element.section.name,
        },
      });
      console.log(section);
      if (section) {
        await this.prisma.expenses.create({
          data: {
            materialName: element.materialName,
            date: element.date,
            totalcost: element.totalcost,
            day: element.day,
            section: {
              connect: {
                id: element.section.id,
              },
            },
            ProjectBill: {
              connect: {
                id: projectBill.id,
              },
            },
          },
        });
      } else {
        console.log("new section");
        const newSection = await this.prisma.section.create({
          data: {
            name: element.section.name,
            ProjectBill: {
              connect: {
                id: projectBill.id,
              },
            },
          },
        });

        await this.prisma.expenses.create({
          data: {
            materialName: element.materialName,
            date: element.date,
            totalcost: element.totalcost,
            day: element.day,
            section: {
              connect: {
                id: newSection.id,
              },
            },
            ProjectBill: {
              connect: {
                id: projectBill.id,
              },
            },
          },
        });
      }
    }
  }
}
