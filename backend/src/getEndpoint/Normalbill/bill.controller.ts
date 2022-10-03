import { Controller, Get, Req } from "@nestjs/common";
import { NormalBilService } from "./bill.service";
import { Param } from "@nestjs/common";

@Controller("/bill/all")
export class NormalBillController {
  constructor(private readonly appService: NormalBilService) {}

  @Get("/get/:name")
  async getBill(@Param() param) {
    console.log(param);
    return await this.appService.getBill(param);
  }
}
