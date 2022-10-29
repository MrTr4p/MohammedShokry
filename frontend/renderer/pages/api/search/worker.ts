import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'


async function getWorker(id: string): Promise<Worker> {
    if (!id)
      throw new createError("يجب ملئ ايدى العامل", status.BAD_REQUEST);
    let worker = await prisma.worker.findUnique({ where: { id } }) as any;
    if (!worker)
      throw new createError("لا يجود هذا العامل", status.NOT_FOUND);
    return worker;
  }

  export default async function handler(req, res) {
    const id = String(req.query.id)
    const result = await getWorker(id)
    res.status(200).json(result)
  }