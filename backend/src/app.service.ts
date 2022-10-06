import { Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import * as jwt from "jsonwebtoken";
const AdminPass = "محمد شاكر5151";
import { HttpException, HttpStatus } from "@nestjs/common";
const SecertaryPass = "sh2022";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

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

async function filter(pageReq : number, limitReq : number, bpageReq : number, blimitReq : number) {
  console.log('/home')
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
    console.log(e)
    throw new Error(e);
  }

  try {
    anotherBills.data = await prisma.anotherPaymentsBill.findMany({
      take: Number(pageReq),
      skip: Number(abskipindex),
    });
    
  } catch (e) {
    console.log(e)
    throw new HttpException(e , HttpStatus.BAD_REQUEST);
  }
  

   result = {
    projectBills: projectbill,
    anotherBills: anotherBills,
  };
  console.log(result)
  return result
}

@Injectable()
export class AppService {
  async login(req) {
    const thetoken = "110ec58a-a0f2-4ac4-8393-c866d813b8d1";
    const body = req.body || "";
    const bearer = req.headers["authorization"] || "";
    console.log(bearer);
    const token = bearer.split(" ")[1];
    let pass;
    try {
      pass = jwt.verify(bearer, thetoken);
    } catch (e) {
      pass = "";
    }
    if (pass) {
      if (pass == AdminPass) {
        return { accountType: "create" };
      } else if (pass == SecertaryPass) {
        return { accountType: "edit" };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: "old token",
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    if (body.password == AdminPass || body.password == SecertaryPass) {
      return await jwt.sign(body.password, thetoken);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "لا يوجد حساب ب هذا الحساب",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  async getAll(query) {
    const result = await filter(
      query.abpage,
      query.ablimit,
      query.bpage,
      query.blimit,
    );
    return result;
  }
}
