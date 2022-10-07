import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class NormalBilService {
  constructor(private prisma: PrismaService) {}
  async deleteBill(id: number) {
    await this.prisma.projectBill.delete({
      where:{
        id:id
      },
      include: {
        expenses:true,
        revenues:true,
        sections:true,
        workers:true
      }
    })
  }
}
