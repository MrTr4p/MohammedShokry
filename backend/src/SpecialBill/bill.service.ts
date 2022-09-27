import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
const prisma = new PrismaClient();

@Injectable()
export class BilService {
  async createBill(request) {
    const req = request.body;
    console.log(req);

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
