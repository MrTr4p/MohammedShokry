import { Controller, Get, Post, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma, PrismaClient } from '@prisma/client'
import { Request } from '@nestjs/common';
const prisma = new PrismaClient()

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Post()
  async getHello( @Req() request: Request ) {
    const ApBill = await prisma.projectBill.create({
      data :{
        //@ts-ignore
        name: request.body.name,
        //@ts-ignore
        precentage : request.body.precentage
    }  
  })
      //@ts-ignore
      const revenues = request.body.revenues
      console.log(revenues.length)
      for(let i = 0 ; i < revenues.length; i++){
        console.log(revenues[i])
        const rev = await prisma.revenue.create({
          data: {
            //@ts-ignore
            amount: request.body.revenues[i].amount,
            //@ts-ignore
            date: new Date(request.body.revenues[i].date),
            ProjectBill:{
              connect:{
                id : ApBill.id
              }
            }
          } 
         
        })
        console.log(rev)
      }
    
  
  }

  }



