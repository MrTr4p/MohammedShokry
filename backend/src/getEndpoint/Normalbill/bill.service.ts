import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

async function getBill(id: number) {
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

@Injectable()
export class NormalBilService {
  constructor(private prisma : PrismaService) {}  
  async getBill(param) {
    const bill = await getBill(param);
    return bill;
  }
}
