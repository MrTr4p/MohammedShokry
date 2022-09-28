import { Controller, Get, Req } from '@nestjs/common';
import { BilService } from './bill.service';
import { Param } from '@nestjs/common';

@Controller('/bill/detailed')
export class BillController {
  constructor(private readonly appService: BilService) {}

  @Get('/get/:name')
  async getBill(@Param() param, @Req() request) {
    console.log(param);
    return await this.appService.getBill(param, request);
  }
}
