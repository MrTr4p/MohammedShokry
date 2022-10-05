import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
const prisma = new PrismaClient();

async function getBill(id: number) {
  const bill = await prisma.projectBill.findFirst({
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
  async getBill(param) {
    const bill = await getBill(param);
    return bill;
  }
}
