import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'
import MeiliSearch from "meilisearch";
const meili =  new MeiliSearch({host:'http://localhost:7700'})

async function workersSearch(query: string = "") {
  const workers = await prisma.worker.findMany({});
  meili.index('workers').addDocuments(workers)
  try{
  const workersResult = await meili.index('workers').search(String(query) , {
    limit : 25
  })
  return {
    workers: workersResult.hits
  };
}
catch(e){
 return []
}


}

  export default async function handler(req, res) {
    const query = String(req.query.query)
    const result = await workersSearch(query)
    res.status(200).json(result)
  }