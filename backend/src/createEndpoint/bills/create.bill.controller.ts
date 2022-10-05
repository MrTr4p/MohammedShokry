import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateBillService } from './create.projectbill.service';


@Controller('/create/bill')
export class CreateBillController {
  constructor(private readonly appService: CreateBillService ) {}

  @Post('/project')
  createProject(@Req() req ) {
    return this.appService.createPublicBill(req);
  } 

}