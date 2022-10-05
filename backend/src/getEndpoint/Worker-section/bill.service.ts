import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
const prisma = new PrismaClient();




@Injectable()
export class GetService {
  async getWorkers(){
    const result = await prisma.worker.findMany({ take: 50})
    return result
  }

  async getSections(param){
    const projectBill = await prisma.projectBill.findFirst({
      where:{
        name:param.name
      }
    })

    const sections = await prisma.section.findMany({
      where:{
        projectBillId:projectBill.id
      }
    })

    return sections
  }
}
