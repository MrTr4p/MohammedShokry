import { Controller, Get, Param, Query, Req, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { WorkerService } from "./workers.service";

@Controller("/search")
export class BillController {
  constructor(
    private readonly appService: AppService,
    private readonly workerService: WorkerService,
  ) {}

  @Get("/bill")
  getBill(
    @Query("query") query: string,
    @Query("max_results") maxResults: number,
  ) {
    return this.appService.getSearch(query, maxResults);
  }

  @Get("/workers")
  searchWorkers(@Query("query") query: string) {
    return this.workerService.workersSearch(query);
  }

  @Get("/workers/get")
  getWorkers() {
    return this.workerService.getWorkers();
  }

  @Get("/workers/get/single")
  getWorker(@Query("id") id: string) {
    return this.workerService.getWorker(id);
  }
}
