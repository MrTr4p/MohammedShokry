import { Controller, Get, Req, Query, Delete } from "@nestjs/common";
import { GetService } from "./bill.service";
import { Param } from "@nestjs/common";

@Controller("/delete")
export class GetController {
  constructor(private readonly appService: GetService) {}

  @Delete("/section")
  async getSections(@Query('id') id) {
    return this.appService.deleteSection(id)
  }

  @Delete("/worker")
  async getWorkers(@Query('id') id) {
    return this.appService.deleteWorker(id)
  }

}
