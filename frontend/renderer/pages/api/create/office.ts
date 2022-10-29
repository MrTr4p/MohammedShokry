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


  async function createOfficeBill(req) {
    const body = req.body
    let ab = []
    await Validation(body)
    const res = await prisma.anotherPaymentsBill.create({
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

    //this.meili.index('anotherBill').addDocuments(ab)

    return {message : "تم اضافة فاتورة خاصة بنجاح" , error : false};
  }

  export default async function handler(req, res) {
    const result = await createOfficeBill(req)
    res.status(200).json(result)
  }

