import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

async function getBill(reqParam) {
  const bill = await this.prisma.projectBill.findFirst({
    where: {
      name: reqParam.name,
    },
  });
  return bill;
}

@Injectable()
export class DetailedBilService {
  constructor(private prisma : PrismaService) {}
  async getDetailedBill(param, request) {
    const projectBill : {id: any} = await getBill(param)
    let result = []
    const section = await this.prisma.section.findFirst({
      where:{
        projectBillId: projectBill.id,
        name:request.body.name
      }
    })
    if(section){
      result = await this.prisma.expenses.findMany({
        where:{
          secionId: section.id,
          projectBillId: projectBill.id
        }
      })
      return result
    }else{
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'لا يوجد هذا البند في هذا البرنامج',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  
  }
}
