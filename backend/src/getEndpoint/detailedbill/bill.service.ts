import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
const prisma = new PrismaClient();

async function getBill(reqParam) {
  const bill = await prisma.projectBill.findFirst({
    where: {
      name: reqParam.name,
    },
  });
  return bill;
}

@Injectable()
export class BilService {
  async getDetailedBill(param, request) {
    const projectBill : {id: any} = await getBill(param)
    let result = []
    const section = await prisma.section.findFirst({
      where:{
        projectBillId: projectBill.id,
        name:request.body.name
      }
    })
    if(section){
      result = await prisma.expenses.findMany({
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
