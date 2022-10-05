import { Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateBillService } from './update.projectbill.service';


@Controller('/update')
export class CreateBillController {
  constructor(private readonly appService: CreateBillService ) {}

  @Put('/bill/:name')
  updatePublicBill(@Req() req , @Param() param) {
    return this.appService.updatePublicBill(req , param);
  } 

}