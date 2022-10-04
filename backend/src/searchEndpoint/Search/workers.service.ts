import { Injectable , HttpException, HttpStatus } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();


@Injectable()
export class WorkerService {

  async getWorker(query: string) {
    const [workers, allWorkers] = await Promise.all([ await prisma.projectBill.findMany({ take: 50}), await prisma.anotherPaymentsBill.findMany({})]);

    const workersFuse = new Fuse(allWorkers, { keys: ["name"] });

    const result = workersFuse
      .search(query)
      .map((x) => x.item);
    if(result){
      return {
        worker: result
      }
    }else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'يجب ملئ اسم و عمل العامل',
          worker: workers
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    
  }
}
