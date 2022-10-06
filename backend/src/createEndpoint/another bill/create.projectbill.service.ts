import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
import { PrismaService } from "src/prisma.service";

async function Validation(body){
  if(body.name){
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
  constructor(private prisma: PrismaService) {}
  async createPublicBill(req) {
    const body = req.body
    await Validation(body)
    try {
    await this.prisma.anotherPaymentsBill.create({
      data:{
        projectName: body.projectName,
        date:body.date,
        description:body.description || '',
        inReturn: body.inReturn,
        amount: Number(body.amount)
      }
    })

    return {message : "تم اضافة فاتورة خاصة بنجاح" , error : false};
  }
  catch(e){
    console.log(e)
    throw new HttpException("يجب ملئ كل المدخلات" , HttpStatus.NOT_ACCEPTABLE)
  }
  }
}
