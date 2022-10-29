import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

async function filter(
  pageReq: number,
  limitReq: number,
  bpageReq: number,
  blimitReq: number,
) {
  console.log(pageReq , limitReq , bpageReq , blimitReq)
  let anotherBills = { pagination: {}, data: {} } as any;
  let projectbill = { pagination: {}, data: {} } as any;
  let result = {};
  console.log(pageReq , limitReq , bpageReq , blimitReq)
  const [aBCount, bCount] = await Promise.all([
    await prisma.anotherPaymentsBill.count(),
    await prisma.projectBill.count(),
  ]);
  const abIndex = pageReq * limitReq;
  const bindex = bpageReq * blimitReq;
  const bskipindex = (bpageReq - 1) * blimitReq;
  const abskipindex = (pageReq - 1) * limitReq;
  const totalabPages = Math.round(aBCount / Number(limitReq));
  const totalBPages = Math.round(bCount / Number(blimitReq));

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
    console.log(req.query)
    const result = await filter(
      Number(req.query.abpage),
      Number(req.query.ablimit),
      Number(req.query.bpage),
      Number(req.query.blimit),
    );
    res.status(200).json(result)
  }

