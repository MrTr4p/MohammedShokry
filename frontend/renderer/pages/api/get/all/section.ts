import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

async function getSections(name){
  const projectBill = await prisma.projectBill.findFirst({
    where:{
      name:name
    }
  })

  const sections = await prisma.section.findMany({
    where:{
      projectBillId:projectBill.id
    }
  })

  return sections
}

  export default async function handler(req, res) {
    const result = await getSections(String(req.query.name))
    res.status(200).json(result)
  }

