import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaClient, ProjectBill, Worker } from "@prisma/client";
import Fuse from "fuse.js";
import { MeiliSearch } from 'meilisearch'
const prisma = new PrismaClient();

@Injectable()
export class WorkerService {
  async workersSearch(query: string = "") {
    const workers = await prisma.worker.findMany({});
    const workersMelie = new MeiliSearch({host: 'http://localhost:7700'})
    workersMelie.index('workers').addDocuments(workers)
    const workersFuse = new Fuse(workers, { keys: ["name"] });
    const workersResult = workersFuse.search(query).map((x) => x.item);

    return {
      workers: workersResult.slice(0, 15),
    };
  }

  async getWorkers() {
    return await prisma.worker.findMany({ take: 25 });
  }

  async getWorker(id: string): Promise<Worker> {
    if (!id)
      throw new HttpException("يجب ملئ ايدى العامل", HttpStatus.BAD_REQUEST);
    let worker = await prisma.worker.findUnique({ where: { id } });
    if (!worker)
      throw new HttpException("لا يجود هذا العامل", HttpStatus.NOT_FOUND);
    return worker;
  }
}
