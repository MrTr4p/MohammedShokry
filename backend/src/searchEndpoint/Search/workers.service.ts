import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaClient, ProjectBill, Worker } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

@Injectable()
export class WorkerService {
  async workersSearch(query: string = "") {
    const workers = await prisma.worker.findMany({});
    const workersFuse = new Fuse(workers, { keys: ["name"] });
    const workersResult = workersFuse.search(query).map((x) => x.item);

    return {
      workers: workersResult,
    };
  }

  async getWorkers() {
    return await prisma.worker.findMany({ take: 50 });
  }

  async getWorker(id: string): Promise<Worker> {
    if (!id)
      throw new HttpException("يجب ملئ ايدى العامل", HttpStatus.BAD_REQUEST);
    let worker = await prisma.worker.findUnique({ where: { id } });
    if (!worker)
      throw new HttpException("لا يجود هذه العامل", HttpStatus.NOT_FOUND);
    return worker;
  }
}
