import { Injectable } from '@nestjs/common';
import { PrismaClient, ProjectBill } from '@prisma/client';
import Fuse from 'fuse.js';
const prisma = new PrismaClient();

@Injectable()
export class GetService {
  async getWorkers(){
    const result = await prisma.worker.findMany()
    return result
  }
}
