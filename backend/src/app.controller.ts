import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const ApBill = await prisma.projectBill.create({
      data :{
        name: '30د',
        revenues: {
          //@ts-ignore
          createMany:{
            data:[
              {
                amount:20,
                date:new Date('2020')
              }
            ]
          }
        },
      }
    })


    return ApBill
  }
}
