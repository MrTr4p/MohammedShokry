import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'
import MeiliSearch from "meilisearch";
const meili =  new MeiliSearch({host:'http://localhost:7700'})

async function Validation(body){
  console.log(body)
  if(body.projectName){
    
    if(!body.date){
      return {msg :  "لقد نسيت ان تضع قيمة ل خانة التاريخ" , error : true}
    }
    if(!body.amount){
      return {msg :  "لقد نسيت ان تضع قيمة ل خانة المبلغ" , error : true}

    }
    if(!body.inReturn){
      return {msg :  "لقد نسيت ان تضع قيمة ل خانة المقابل", error : true}

    }
  }else{
    return {msg :  "لقد حدث خطأ ما , يرجي التاكد من المدخلات", error : true}

  }
  return {msg : 'تم بنجاح' , error : false}
}


  async function createOfficeBill(req, response) {
    const body = req.body
    let ab = []
    const val = await Validation(body)
    if(val.error == true){
      return response.status(406).send(val.msg)
    }
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

    meili.index('anotherBill').addDocuments(ab)

    return {message : "تم اضافة فاتورة خاصة بنجاح" , error : false};
  }

  export default async function handler(req, res) {
    const result = await createOfficeBill(req, res)
    res.status(200).json(result)
  }

