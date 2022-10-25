import { Controller, Get, Param, Post, Query, Req } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/getAll")
  getAll(@Query() type) {
    return this.appService.getAll(type);
  }

  @Post("/login")
  login(@Req() req) {
    return this.appService.login(req);
  }

  @Post("/browser")
  browser(@Req() body){
    return this.appService.openBrowser(body)
  }

  @Get('/pageCount')
  pageCount(@Query() query){
    return this.appService.getPageCount(query)
  }
}
