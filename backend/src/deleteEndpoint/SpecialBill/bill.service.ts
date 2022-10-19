import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { MeiliSearchService } from "src/meilisearch.service";

@Injectable()
export class AnotherBilService {
  constructor(private prisma: PrismaService , private meili : MeiliSearchService) {}
  async deleteBill(id: number) {
    const bill = await this.prisma.anotherPaymentsBill.findFirst({
      where:{
        id : id
      }
    })
    if(bill){
      await this.prisma.anotherPaymentsBill.delete({
        where: {
          id: id,
        },
      });
      await this.meili.index('anotherBill').deleteDocument(bill.id)
    }
   
  }
}
