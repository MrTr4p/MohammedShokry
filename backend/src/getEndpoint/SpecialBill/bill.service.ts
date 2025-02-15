import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AnotherBilService {
  constructor(private prisma: PrismaService) {}
  async getBill(id: number) {
    const bill = await this.prisma.anotherPaymentsBill.findFirst({
      where: {
        id: id,
      },
    });
    return bill;
  }
}
