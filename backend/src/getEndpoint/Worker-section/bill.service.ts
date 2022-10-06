import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";




@Injectable()
export class GetService {
  constructor (private prisma : PrismaService) {}
  async getWorkers(){
    const result = await this.prisma.worker.findMany({ take: 50})
    return result
  }

  async getSections(param){
    const projectBill = await this.prisma.projectBill.findFirst({
      where:{
        name:param.name
      }
    })

    const sections = await this.prisma.section.findMany({
      where:{
        projectBillId:projectBill.id
      }
    })

    return sections
  }
}
