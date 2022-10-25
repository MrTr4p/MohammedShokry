import { Controller, Get, Req, Query } from "@nestjs/common";
import { GetService } from "./bill.service";
import { Param } from "@nestjs/common";

@Controller("/get")
export class GetController {
  constructor(private readonly appService: GetService) {}

  @Get("/sections/:name")
  async getSections(@Param() param) {
    return this.appService.getSections(param)
  }

  @Get('/section')
  async getSection(@Query() query){
    return this.appService.getSection(query)
  }

  @Get("/workers")
  async getWorkers() {
    return this.appService.getWorkers()
  }

  @Get('/worker')
  async getWorker(@Query() query){
    return this.appService.getWorker(query)
  }
}
