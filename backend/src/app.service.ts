import { Injectable } from '@nestjs/common';
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

async function filter(type){
  const filter = type || 'public'
  let result
  if(filter == 'office'){
    result = await prisma.anotherPaymentsBill.findMany()
  }else{
    result = await prisma.projectBill.findMany({
      include: {
        expenses: true,
        revenues: true,
        sections:true,
        workers:true,
        _count: true,
      },
    })

  }
  return result
}

@Injectable()
export class AppService {
  async getAll(query) {
    const result = await filter(query.type)
    return result
  }


  async getSearch(query , param){
    const result = await filter(query.type)
    const fuse = new Fuse(result, { keys: ["name"] });
    const searchResultBills = fuse.search(param.name).map((x) => x.item);

    return searchResultBills

  }
}