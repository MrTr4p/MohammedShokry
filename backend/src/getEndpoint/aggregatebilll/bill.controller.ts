import { Controller, Get, Req , Query } from "@nestjs/common";
import { AggregateBilService } from "./bill.service";
import { Param } from "@nestjs/common";

interface theFinalResult {
  result: any[],
  totalCost : number,
  totalRevenues : number
}

@Controller("/bill/aggregate")
export class AggregateBillController {
  constructor(private readonly appService: AggregateBilService) {}

  @Get("/get")
  async getBill(@Query() query) : Promise<Partial<theFinalResult>> {
    return await this.appService.getAggregateBill(query);
  }
}
