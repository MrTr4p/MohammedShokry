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
  async getBill(param) {
    const bill = await getBill(param)
    return bill
  }
}
