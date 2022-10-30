import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'
import MeiliSearch from 'meilisearch'


const meili =  new MeiliSearch({host:'http://localhost:7700'})
  
  async function filter(
    
    pageReq: number,
    limitReq: number,
    bpageReq: number,
    blimitReq: number,
  ) {
    await Promise.all([
      
      await meili.index('project').deleteAllDocuments(),
      await meili.index('anotherBill').deleteAllDocuments(),
      await meili.index('workers').deleteAllDocuments(),
      await meili.index('section').deleteAllDocuments(),
      await meili.index('anotherBill').addDocuments(await prisma.anotherPaymentsBill.findMany()),
      await meili.index('workers').addDocuments(await prisma.worker.findMany()),
      await meili.index('section').addDocuments(await prisma.section.findMany()),
      await meili.index('project').addDocuments(await prisma.projectBill.findMany()),
    ]);
    let anotherBills = { pagination: {}, data: {} } as any;
    let projectbill = { pagination: {}, data: {} } as any;
    let result = {};
    const [aBCount, bCount] = await Promise.all([
      await prisma.anotherPaymentsBill.count(),
      await prisma.projectBill.count(),
    ]);
    const abIndex = pageReq * limitReq;
    const bindex = bpageReq * blimitReq;
    const bskipindex = (bpageReq - 1) * blimitReq;
    const abskipindex = (pageReq - 1) * limitReq;
    const totalabPages = ((aBCount / Number(limitReq)) - Math.floor(aBCount / Number(limitReq))) !== 0 ? Math.round(aBCount / Number(limitReq)) + 1 : Math.round(aBCount / Number(limitReq))
    const totalBPages = ((bCount / Number(blimitReq)) - Math.floor(bCount / Number(blimitReq))) !== 0 ? Math.round(bCount / Number(blimitReq)) + 1 : Math.round(bCount / Number(blimitReq))
    
    anotherBills.pagination.currentPage = Number(pageReq);
    anotherBills.pagination.pageSize = Number(limitReq);
    anotherBills.pagination.totalCount = aBCount;
    anotherBills.pagination.totalPages = totalabPages;
  
    projectbill.pagination.currentPage = Number(bpageReq);
    projectbill.pagination.pageSize = Number(blimitReq);
    projectbill.pagination.totalCount = bCount;
    projectbill.pagination.totalPages = totalBPages;
  
    if (abIndex < aBCount) {
      anotherBills.pagination.lastPage = false;
    } else {
      anotherBills.pagination.lastPage = true;
    }
  
    if (bindex < bCount) {
      projectbill.pagination.lastPage = false;
    } else {
      projectbill.pagination.lastPage = true;
    }
  
    try {
      projectbill.data = await prisma.projectBill.findMany({
        take: Number(blimitReq),
        skip: Number(bskipindex),
      });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  
    try {
      anotherBills.data = await prisma.anotherPaymentsBill.findMany({
        take: Number(limitReq),
        skip: Number(abskipindex),
      });
    } catch (e) {
      console.log(e);
      throw new createError(e, status.BAD_REQUEST);
    }
  
    result = {
      projectBills: projectbill,
      anotherBills: anotherBills,
    };
    return result;
  }








  export default async function handler(req, res) {
    
    const result = await filter(
      Number(req.query.abpage),
      Number(req.query.ablimit),
      Number(req.query.bpage),
      Number(req.query.blimit),
     
    );
    res.status(200).json(result)
  }

