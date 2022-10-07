import { Controller, Delete, Get, Query, Req } from "@nestjs/common";
import { AnotherBilService } from "./bill.service";
import { Param } from "@nestjs/common";

@Controller("/delete")
export class AnotherBillController {
  constructor(private readonly appService: AnotherBilService) {}

  @Delete("/bill/another")
  async deleteBill(@Query("id") id: number) {
    console.log(id);
    return await this.appService.deleteBill(Number(id));
  }
}
