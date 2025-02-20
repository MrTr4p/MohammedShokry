import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
import { PrismaService } from '../../prisma.service'
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
export class UpdateAnotherBillService {
  constructor(private prisma : PrismaService, private meili : MeiliSearchService) {}
  async createPublicBill(req) {
    
    const body = req.body
    await Validation(body)
    const result = []
    const oldBill = await this.prisma.anotherPaymentsBill.findFirst({
      where:{
        id:body.id
      }
    })
    try {
    const res = await this.prisma.anotherPaymentsBill.update({
      where:{
        id: oldBill.id

      },
      data:{
        projectName: body.name || oldBill.projectName,
        date:body.date || oldBill.date,
        description:body.description || oldBill.description,
        inReturn: body.inReturn || oldBill.inReturn,
        amount: body.amount || oldBill.amount
      }
    })
    result.push(res)
    this.meili.index('anotherBill').addDocuments(result)

    return { message: "تم تعديل فاتورة خاصة بنجاح", error: false}
  }
  catch(e){
    throw new HttpException("يجب ملئ كل المدخلات" , HttpStatus.NOT_ACCEPTABLE)
  }
  }
}
