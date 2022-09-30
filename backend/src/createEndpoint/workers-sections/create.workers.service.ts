import { Injectable } from '@nestjs/common';
import { PrismaClient, ProjectBill } from '@prisma/client';
import { HttpException, HttpStatus } from "@nestjs/common";
import Fuse from 'fuse.js';
const prisma = new PrismaClient();

@Injectable()
export class CreateWorkerService {
  async createWorker(reqB) {
    const body = reqB.body;
    try {
      await prisma.worker.create({
        data:{
          name:body.name,
          work:body.name
        }
      })
      
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'يجب ملئ اسم و عمل العامل',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
