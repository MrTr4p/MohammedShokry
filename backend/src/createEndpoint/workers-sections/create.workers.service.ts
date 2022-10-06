import { Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import Fuse from "fuse.js";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CreateWorkerService {
  constructor(private prisma : PrismaService) {}
  async createWorker(reqB) {
    const body = reqB.body;
    try {
      let worker = await this.prisma.worker.create({
        data: {
          name: body.name,
          work: body.work,
        },
      });
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
