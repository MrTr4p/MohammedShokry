import { HttpException, Injectable , HttpStatus } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getWorkers(query) {
    const [allWorkers , workers] = await Promise.all([await prisma.worker.findMany({}) , await prisma.worker.findMany({
      take:50
    })])
    const workersFuse = new Fuse(allWorkers, { keys: ["name"] });
    const result = workersFuse.search(query).map(x => x.item)
    if(result){
      return {
        worker : result
      }
    }else{
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'لا يوجد عامل بهذا الاسم',
          data : workers
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

}
