import { Controller, Get, Post, Req, Delete, Put } from "@nestjs/common";
import { BilService } from "./bill.service";
import { Request, Param } from "@nestjs/common";

@Controller("/bill")
export class BillController {
  constructor(private readonly appService: BilService) {}

  @Post("/create")
  async createBill(@Req() request: Request) {
    return await this.appService.createNewBill(request);
  }

  @Get("/get/:name")
  async getBill(@Param() param) {
    return await this.appService.getBill(param);
  }

  @Delete("/delete/:name")
  async deleteBill(@Param() param) {
    return await this.appService.deleteBill(param);
  }

  @Put("/modify/:name")
  async modifyBill(@Param() param, @Req() request) {
    return await this.appService.modifyBill(param, request);
  }
}
