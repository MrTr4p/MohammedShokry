import { Controller, Get, Query, Req } from "@nestjs/common";
import { AnotherBilService } from "./bill.service";
import { Param } from "@nestjs/common";

@Controller("/bill/another")
export class AnotherBillController {
  constructor(private readonly appService: AnotherBilService) {}

  @Get("/get")
  async getBill(@Query("id") id: number) {
    console.log(id);
    return await this.appService.getBill(Number(id));
  }
}
