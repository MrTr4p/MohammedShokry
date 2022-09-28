import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
const prisma = new PrismaClient();

@Injectable()
export class BilService {
  async createBill(request) {
    const req = request.body;
    console.log(req);

    if (!req.name || !req.date || !req.inReturn || !req.amount) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'يجب ملئ كل من ; اسم العميل , التاريخ, المقابل , المبلغ',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await prisma.anotherPaymentsBill.create({
      data: {
        name: req.name,
        date: req.date,
        inReturn: req.inReturn,
        description: req.description,
        amount: req.amount,
      },
    });
  }
  async getBill(param) {
    const par = param;
    const bill = await prisma.anotherPaymentsBill.findFirst({
      where: {
        name: par.name,
      },
    });

    return bill;
  }
}
