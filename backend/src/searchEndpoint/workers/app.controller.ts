import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/search')
export class WorkersController {
  constructor(private readonly getservice: AppService) {}


  @Get('/workers')
  getWorkers(@Query('query') query: string){
    return this.getservice.getWorkers(query)
  }

}
