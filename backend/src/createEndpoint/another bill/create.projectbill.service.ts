import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

@Injectable()
export class CreateAnotherBillService {
  async createPublicBill(req) {
    
    const body = req.body
    try {
    await prisma.anotherPaymentsBill.create({
      data:{
        projectName: body.projectName,
        date:body.date,
        description:body.description || '',
        inReturn: body.inReturn,
        amount: body.amount
      }
    })

    return "تم اضافة فاتورة خاصة بنجاح";
  }
  catch(e){
    throw new HttpException("يجب ملئ كل المدخلات" , HttpStatus.NOT_ACCEPTABLE)
  }
  }
}
