import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/getAll")
  getAll(@Query() type ) {
    return this.appService.getAll(type);
  }


  @Get('/search')
  getSearch(@Query() type , @Param() param){
    return this.appService.getSearch(type, param);
  }
}