import { Controller, Get, Req } from "@nestjs/common";
import { AggregateBilService } from "./bill.service";
import { Param } from "@nestjs/common";

@Controller("/bill/aggregate")
export class AggregateBillController {
  constructor(private readonly appService: AggregateBilService) {}

  @Get("/get/:name")
  async getBill(@Param() param) {
    console.log(param);
    return await this.appService.getAggregateBill(param);
  }
}
