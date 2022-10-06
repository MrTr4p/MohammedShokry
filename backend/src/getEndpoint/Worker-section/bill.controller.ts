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

  @Get("/workers")
  async getWorkers() {
    return this.appService.getWorkers()
  }

  @Get('/worker/:name')
  async getWorker(@Query() query , @Req() req){
    return this.appService.getWorker(query , req)
  }
}
