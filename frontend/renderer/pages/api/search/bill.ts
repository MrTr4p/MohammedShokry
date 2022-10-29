import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'
import MeiliSearch from "meilisearch";
const meili =  new MeiliSearch({host:'http://localhost:7700'})


async function getSearch(query: string, maxResults = 100) {
  let projectBillsResult
  let anotherBillsResult
  const [projectBills, anotherBills] = await Promise.all([
    await prisma.projectBill.findMany({
      select: { clientName: true, name: true },
    }),
    await prisma.anotherPaymentsBill.findMany({
      select: { projectName: true },
    }),
  ]);
  try{
    projectBillsResult = await meili.index('project').search(query)
  }
  catch(e){
   return []
  }
  
  try {
    anotherBillsResult = await meili.index('anotherBill').search(query)
  } catch(e){
   return []
  }
  return {
    projectBills: (await projectBillsResult).hits,
    anotherBills: (await anotherBillsResult).hits,
  };
}

  export default async function handler(req, res) {
    const result = await getSearch(req.query.query)
    res.status(200).json(result)
  }