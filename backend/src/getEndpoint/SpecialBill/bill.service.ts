import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";



@Injectable()
export class AnotherBilService {
  constructor(private prisma : PrismaService) {}  
  async getBill(param) {
      const bill = await this.prisma.anotherPaymentsBill.findFirst({
        where: {
          id: param.id,
        }
        ,
      });
      return bill;
  }
}
