import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'
import MeiliSearch from "meilisearch";
const meili =  new MeiliSearch({host:'http://localhost:7700'})

async function deleteBill(id: number) {
  const bill = await prisma.anotherPaymentsBill.findFirst({
    where:{
      id : id
    }
  })
  if(bill){
    await prisma.anotherPaymentsBill.delete({
      where: {
        id: id,
      },
    });
    await meili.index('anotherBill').deleteDocument(bill.id)
  }
 
}

  export default async function handler(req, res) {
    console.log("//")
    const id = Number(req.query.id)
    const result = await deleteBill(id)
    res.status(200).json(result)
  }

