import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/bill')
export class BillController {
  constructor(private readonly appService: AppService) {}

  @Get("/search")
  getSearch(@Query("query") query: string) {
    return this.appService.getSearch(query);
  }

}
