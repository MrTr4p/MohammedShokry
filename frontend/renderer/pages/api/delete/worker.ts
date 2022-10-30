import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'
import MeiliSearch from "meilisearch";
const meili =  new MeiliSearch({host:'http://localhost:7700'})

async function deleteWorker(id: string) {
  console.log("Delete worker");
  const worker = await prisma.worker.findFirst({
    where: {
      id: id,
    },
  });
  console.log(worker);
  if (worker) {
    await prisma.worker.delete({
      where: {
        id: worker.id,
      },
      include: {
        project: true,
      },
    });
    await meili.index("workers").deleteDocument(worker.id);
  }
}


  export default async function handler(req, res) {
    const id = String(req.query.id)
    const result = await deleteWorker(id)
    res.status(200).json(result)
  }

