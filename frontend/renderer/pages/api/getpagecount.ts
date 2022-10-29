import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

async function getPageCount(query){
  const [aBCount, bCount] = await Promise.all([
    await prisma.anotherPaymentsBill.count(),
    await prisma.projectBill.count(),
  ]);
  const limit = Number(query.limit)
  const bPage = Math.round(Number(bCount)/limit)
  const abPage = Math.round(Number(aBCount)/limit)
  return {
    office: abPage, 
    public: bPage
  }
}

  export default async function handler(req, res) {
    const result = await getPageCount(req.query)
    res.status(200).json(result)
  }

