import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

async function getDetailedBill(id, request) {
  let result = []
    const bill = await prisma.projectBill.findFirst({
      where: {
        id: Number(id),
      },
    });
  
 
  const section = await prisma.section.findFirst({
    where:{
      projectBillId: bill.id,
      name:request.body.name
    }
  })
  if(section){
    result = await prisma.expenses.findMany({
      where:{
        secionId: section.id,
        projectBillId: bill.id
      },
      include:{
        section: true
      }
    })

    return result
  }else{
    throw new createError(status.NOT_FOUND , 'لا يوجد هذا البند في هذا البرنامج')
  }

}

  export default async function handler(req, res) {
    const id = Number(req.query.id)
    const result = await getDetailedBill(id , req)
    res.status(200).json(result)
  }

