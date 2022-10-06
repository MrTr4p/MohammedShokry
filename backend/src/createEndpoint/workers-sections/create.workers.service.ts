import { Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import Fuse from "fuse.js";
import { PrismaService } from "src/prisma.service";
import { MeiliSearchService } from "src/meilisearch.service";

@Injectable()
export class CreateWorkerService {
  constructor(private prisma : PrismaService , private meili : MeiliSearchService) {}
  async createWorker(reqB) {
    let workers = []
    const body = reqB.body;
    try {
      let worker = await this.prisma.worker.create({
        data: {
          name: body.name,
          work: body.work,
        },
      });
      workers.push(worker)
      this.meili.index('workers').addDocuments(workers)
      return worker;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "يجب ملئ اسم و عمل العامل",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
