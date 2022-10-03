import { Controller, Get, Req } from "@nestjs/common";
import { DetailedBilService } from "./bill.service";
import { Param } from "@nestjs/common";

@Controller("/bill/detailed")
export class DetailedBillController {
  constructor(private readonly appService: DetailedBilService) {}

  @Get("/get/:name")
  async getBill(@Param() param, @Req() request) {
    console.log(param);
    return await this.appService.getDetailedBill(param, request);
  }
}
