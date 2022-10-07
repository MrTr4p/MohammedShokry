import { Controller, Delete, Get, Query, Req } from "@nestjs/common";
import { NormalBilService } from "./bill.service";
import { Param } from "@nestjs/common";

@Controller("/delete")
export class NormalBillController {
  constructor(private readonly appService: NormalBilService) {}

  @Delete("/bill")
  async getBill(@Query("id") id: number) {
    return await this.appService.deleteBill(Number(id));
  }
}
