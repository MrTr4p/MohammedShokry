import { Injectable , HttpException , HttpStatus } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
import { PrismaService } from "src/prisma.service";
import { MeiliSearchService } from "src/meilisearch.service";

@Injectable()
export class AppService {
  constructor (private prisma : PrismaService , private meili : MeiliSearchService) {}
  async getSearch(query: string, maxResults = 100) {
    let projectBillsResult
    let anotherBillsResult
    const [projectBills, anotherBills] = await Promise.all([
      await this.prisma.projectBill.findMany({
        select: { clientName: true, name: true },
      }),
      await this.prisma.anotherPaymentsBill.findMany({
        select: { projectName: true },
      }),
    ]);

    try{
      projectBillsResult = await this.meili.index('project').search(query)
    }
    catch(e){
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "لا توجد معلومات",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    
    try {
      anotherBillsResult = await this.meili.index('anotherBill').search(query)
    } catch(e){
     return []
    }
   
    return {
      projectBills: (await projectBillsResult).hits,
      anotherBills: (await anotherBillsResult).hits,
    };
  }
}
