import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class NormalBilService {
  constructor(private prisma: PrismaService) {}
  async getBill(id: number) {
    const bill = await this.prisma.projectBill.findFirst({
      where: {
        id: id,
      },
      include: {
        expenses: {
          include: {
            section: true,
          },
        },
        workers: {
          include: {
            Worker: true,
          },
        },
        revenues: true,
        sections: true,
        _count: true,
      },
    });
    return bill;
  }
}
