import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'



  export default async function handler(req, res) {
    const result = await prisma.worker.findMany({ take: 50})
    res.status(200).json(result)
  }

