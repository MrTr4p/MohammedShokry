import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

async function Validation(body){
  if(body.projectName){
    
    if(!body.date){
      throw new createError(
        "لقد نسيت ان تضع قيمة ل خانة التاريخ",
        status.NOT_ACCEPTABLE,
      );
    }
    if(!body.amount){
      throw new createError(
        "لقد نسيت ان تضع قيمة ل خانة المبلغ",
        status.NOT_ACCEPTABLE,
      );
    }
    if(!body.inReturn){
      throw new createError(
        "لقد نسيت ان تضع قيمة ل خانة المقابل",
        status.NOT_ACCEPTABLE,
      );
    }
  }else{
    throw new createError(
      "لقد حدث خطأ ما , يرجي التاكد من المدخلات",
      status.NOT_ACCEPTABLE,
    );
  }
}


async function updateOffice(req) {
    
  const body = req.body
  await Validation(body)
  const result = []
  const oldBill = await prisma.anotherPaymentsBill.findFirst({
    where:{
      id:body.id
    }
  })
  try {
  const res = await prisma.anotherPaymentsBill.update({
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
  //this.meili.index('anotherBill').addDocuments(result)

  return { message: "تم تعديل فاتورة خاصة بنجاح", error: false}
}
catch(e){
  throw new createError("يجب ملئ كل المدخلات" , status.NOT_ACCEPTABLE)
}
}

  export default async function handler(req, res) {
    const result = await updateOffice(req)
    res.status(200).json(result)
  }

