import { Controller, Get, Query, Req } from "@nestjs/common";
import { NormalBilService } from "./bill.service";
import { Param } from "@nestjs/common";

@Controller("/bill/another")
export class NormalBillController {
  constructor(private readonly appService: NormalBilService) {}

  @Get("/get")
  async getBill(@Query("id") id: number) {
    console.log(id);
    return await this.appService.getBill(Number(id));
  }
}
