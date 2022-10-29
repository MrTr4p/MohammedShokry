import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

async function deleteBill(id: number) {
  console.log(id, typeof(id))
  const rev = await prisma.projectBill.findFirst({
    where:{
      id: id
    }
  })
  if(rev){
    Promise.all([await prisma.expenses.deleteMany({
      where:{
        projectBillId: rev.id
      }
    }), await prisma.revenue.deleteMany({
      where:{
        projectBillId:rev.id
      }
    }),await prisma.workerSalary.deleteMany({
      where:{
        projectBillId:rev.id  
      }
    }),await prisma.section.deleteMany({
      where:{
        projectBillId:rev.id
      }
    })])
    
    await prisma.projectBill.delete({
      where: {
        name: rev.name,
      }
    });

    //await this.meili.index('project').deleteDocument(rev.id)
  }
  
}

  export default async function handler(req, res) {
    const id = Number(req.query.id)
    const result = await deleteBill(id)
    res.status(200).json(result)
  }

