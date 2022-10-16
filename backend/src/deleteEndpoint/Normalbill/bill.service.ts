import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { MeiliSearchService } from "src/meilisearch.service";


@Injectable()
export class NormalBilService {
  constructor(private prisma: PrismaService, private meili : MeiliSearchService) {}
  async deleteBill(id: number) {
    console.log(id, typeof(id))
    const rev = await this.prisma.projectBill.findFirst({
      where:{
        id: id
      }
    })
    if(rev){
      Promise.all([await this.prisma.expenses.deleteMany({
        where:{
          projectBillId: rev.id
        }
      }), await this.prisma.revenue.deleteMany({
        where:{
          projectBillId:rev.id
        }
      }),await this.prisma.workerSalary.deleteMany({
        where:{
          projectBillId:rev.id  
        }
      }),await this.prisma.section.deleteMany({
        where:{
          projectBillId:rev.id
        }
      })])
      
      await this.prisma.projectBill.delete({
        where: {
          name: rev.name,
        }
      });

      await this.meili.index('project').deleteDocument(rev.id)
    }
    
  }
}
