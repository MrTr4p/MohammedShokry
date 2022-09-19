import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const ApBill = await prisma.anotherPaymentsBill.create({
      //@ts-ignore
      data: {
        Amount: 25,
        Date : '2022',
        InReturn : "Something"
      }
    })

    console.log(ApBill)
  }
}
