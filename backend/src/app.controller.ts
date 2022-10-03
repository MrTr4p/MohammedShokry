import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/getAll")
  getAll(@Query() type) {
    return this.appService.getAll(type);
  }

  @Get("/search")
  getSearch(@Query("query") query: string) {
    return this.appService.getSearch(query);
  }

  @Get("/login")
  login(@Req() req) {
    return this.appService.login(req);
  }
}
