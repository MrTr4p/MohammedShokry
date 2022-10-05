import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UpdateAnotherBillService } from './create.projectbill.service';


@Controller('/update')
export class UpdateAnotherBillController {
  constructor(private readonly appService: UpdateAnotherBillService ) {}

  @Post('/anotherBill')
  createProject(@Req() req ) {
    return this.appService.createPublicBill(req);
  } 

}