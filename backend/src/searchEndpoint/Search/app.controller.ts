import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { WorkerService } from "./workers.service";

@Controller('/search')
export class BillController {
  constructor(private readonly appService: AppService , private readonly workerService : WorkerService) {}

  @Get("/bill")
  getBill(@Query("query") query: string) {
    return this.appService.getSearch(query);
  }


  @Get('/workers')
  getWorker(@Query("query") query: string) {
    return this.workerService.getWorker(query);
  }
}
