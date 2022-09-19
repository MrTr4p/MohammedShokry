import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    //@ts-ignore
    const ApBill = await prisma.AnotherPaymentsBill.create({
      //@ts-ignore
      data: {
        //@ts-ignore
        date : '2022',
        amount: 20,
        inReturn: '22'
      }
    })

  }
}
