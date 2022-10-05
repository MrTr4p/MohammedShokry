import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateAnotherBillService } from './create.projectbill.service';


@Controller('/create/bill')
export class CreateAnotherBillController {
  constructor(private readonly appService: CreateAnotherBillService ) {}

  @Post('/anotherBill')
  createProject(@Req() req ) {
    return this.appService.createPublicBill(req);
  } 

}