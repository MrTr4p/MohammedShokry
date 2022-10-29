import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

async function createWorker(reqB) {
  let workers = []
  const body = reqB.body;
  try {
    let worker = await prisma.worker.create({
      data: {
        name: body.name,
        work: body.work,
      },
    });
    workers.push(worker)
    //this.meili.index('workers').addDocuments(workers)
    return worker;
  } catch (e) {
    throw new createError(status.BAD_REQUEST , "يجب ملئ اسم و عمل العامل")
  }
}

  export default async function handler(req, res) {
    const result = await createWorker(req)
    res.status(200).json(result)
  }

