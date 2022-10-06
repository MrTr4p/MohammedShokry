import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
import { PrismaService } from "src/prisma.service";
import { MeiliSearchService } from "src/meilisearch.service";

async function Validation(body){
  if(body.projectName){
    
    if(!body.date){
      throw new HttpException(
        "لقد نسيت ان تضع قيمة ل خانة التاريخ",
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if(!body.amount){
      throw new HttpException(
        "لقد نسيت ان تضع قيمة ل خانة المبلغ",
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if(!body.inReturn){
      throw new HttpException(
        "لقد نسيت ان تضع قيمة ل خانة المقابل",
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
export class CreateAnotherBillService {
  constructor(private prisma: PrismaService, private meili : MeiliSearchService) {}
  async createPublicBill(req) {
    const body = req.body
    let ab = []
    await Validation(body)
    const res = await this.prisma.anotherPaymentsBill.create({
      data:{
        projectName: body.projectName,
        date:body.date,
        description:body.description || '',
        inReturn: body.inReturn,
        amount: Number(body.amount)
      }
    })
    console.log(ab)
    ab.push(res)
    this.meili.index('anotherBill').addDocuments(ab)
    return {message : "تم اضافة فاتورة خاصة بنجاح" , error : false};
  }
  }

