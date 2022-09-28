import { Controller, Get, Post, Req, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { Param } from "@nestjs/common";

@Controller("/home")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/search/:name")
  async getSearch(@Param() param) {
    return await this.appService.getSearch(param);
  }

  @Get("/allprojectbill")
  async getAllBills(@Query() query) {
    return await this.appService.getAll(query);
  }

  @Post("/login")
  async login(@Req() request) {
    return await this.appService.login(request);
  }
}
