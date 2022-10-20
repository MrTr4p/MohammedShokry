import { Controller, Get, Req , Query } from "@nestjs/common";
import { AggregateBilService } from "./bill.service";
import { Param } from "@nestjs/common";

@Controller("/bill/aggregate")
export class AggregateBillController {
  constructor(private readonly appService: AggregateBilService) {}

  @Get("/get")
  async getBill(@Query() query) {
    return await this.appService.getAggregateBill(query);
  }
}
