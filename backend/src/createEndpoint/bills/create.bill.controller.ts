import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateBillService } from './create.projectbill.service';
import { GetService } from './get.service';


@Controller('/create/bill')
export class AppController {
  constructor(private readonly appService: CreateBillService, private readonly getservice: GetService) {}

  @Post('/project')
  createProject(@Req() req ) {
    return this.appService.createPublicBill(req);
  } 

  @Get('/workers')
  getWorkers(@Req() workers){
    return this.getservice.getWorkers()
  }
}