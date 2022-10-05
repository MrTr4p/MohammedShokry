import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

@Injectable()
export class UpdateAnotherBillService {
  async createPublicBill(req) {
    
    const body = req.body
    const oldBill = await prisma.anotherPaymentsBill.findFirst({
      where:{
        id:body.id
      }
    })
    try {
    await prisma.anotherPaymentsBill.create({
      data:{
        projectName: body.name || oldBill.projectName,
        date:body.date || oldBill.date,
        description:body.description || oldBill.description,
        inReturn: body.inReturn || oldBill.inReturn,
        amount: body.amount || oldBill.amount
      }
    })

    return "تم تعديل فاتورة خاصة بنجاح";
  }
  catch(e){
    throw new HttpException("يجب ملئ كل المدخلات" , HttpStatus.NOT_ACCEPTABLE)
  }
  }
}
