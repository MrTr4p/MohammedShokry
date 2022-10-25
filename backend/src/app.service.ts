import { Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import * as jwt from "jsonwebtoken";
const AdminPass = "محمد شاكر5151";
import { HttpException, HttpStatus } from "@nestjs/common";
const SecertaryPass = "sh2022";
import Fuse from "fuse.js";
const prisma = new PrismaClient();
import { MeiliSearchService } from "src/meilisearch.service";
const open = require('open')

interface result {
  projectBills?: {
    pagination?: {
      totalCount: number;
      totalPages: number;
      pageSize: number;
      currentPage: number;
      lastPage: boolean;
    };
    data: object[];
  };
  anotherBills?: {
    pagination?: {
      totalCount: number;
      totalPages: number;
      pageSize: number;
      lastPage: boolean;
      currentPage: number;
    };
    data: object[];
  };
}

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
    throw new HttpException(e, HttpStatus.BAD_REQUEST);
  }

  result = {
    projectBills: projectbill,
    anotherBills: anotherBills,
  };
  return result;
}

@Injectable()
export class AppService {
  constructor(private meili : MeiliSearchService){}


  async login(req) {
    const body = req.body || { password: "" };
    if (body.password == AdminPass || body.password == SecertaryPass) {
      return {
        status: 200,
        error: false,
        accountType: body.password == AdminPass ? "edit" : "create",
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: "لا يوجد حساب ب هذا الرمز",
          error: true,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async openBrowser(req){
    const url = 'http://localhost:8000' + req.body.data
    open(url)
  }

  async getPageCount(query){
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

  async getAll(query) {
    await Promise.all([
      await this.meili.index('project').deleteAllDocuments(),
      await this.meili.index('anotherBill').deleteAllDocuments(),
      await this.meili.index('workers').deleteAllDocuments(),
      await this.meili.index('section').deleteAllDocuments(),
      await this.meili.index('project').deleteAllDocuments(),
      await this.meili.index('anotherBill').addDocuments(await prisma.anotherPaymentsBill.findMany()),
      await this.meili.index('workers').addDocuments(await prisma.worker.findMany()),
      await this.meili.index('section').addDocuments(await prisma.section.findMany()),
      await this.meili.index('project').addDocuments(await prisma.projectBill.findMany())
    ]);

    
    const result = await filter(
      query.abpage,
      query.ablimit,
      query.bpage,
      query.blimit,
    );

    return result;
  }
}
