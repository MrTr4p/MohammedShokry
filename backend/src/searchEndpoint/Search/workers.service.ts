import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaClient, ProjectBill, Worker } from "@prisma/client";
import Fuse from "fuse.js";
import { MeiliSearch } from 'meilisearch'
import { PrismaService } from "src/prisma.service";
import { MeiliSearchService } from "src/meilisearch.service";

@Injectable()
export class WorkerService {
  constructor (private prisma : PrismaService , private meili : MeiliSearchService) {}
  async workersSearch(query: string = "") {
    const workers = await this.prisma.worker.findMany({});
    this.meili.index('workers').addDocuments(workers)
    try{
    const workersResult = await this.meili.index('workers').search(query , {
      limit : 25
    })
    return {
      workers: workersResult.hits
    };
  }
  catch(e){
   return []
  }

  
  }

  async getWorkers() {
    const workers = await this.prisma.worker.findMany({ take: 25 });
    console.log(workers)
    return workers
  }

  async getWorker(id: string): Promise<Worker> {
    if (!id)
      throw new HttpException("يجب ملئ ايدى العامل", HttpStatus.BAD_REQUEST);
    let worker = await this.prisma.worker.findUnique({ where: { id } });
    if (!worker)
      throw new HttpException("لا يجود هذا العامل", HttpStatus.NOT_FOUND);
    return worker;
  }
}
