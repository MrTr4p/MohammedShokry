import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AnotherBilService {
  constructor(private prisma: PrismaService) {}
  async deleteBill(id : number) {
    await this.prisma.anotherPaymentsBill.delete({
      where: {
        id: id,
      },
    });
  }
}
