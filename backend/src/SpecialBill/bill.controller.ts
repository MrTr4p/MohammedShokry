import {
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Delete,
  Put,
} from '@nestjs/common';
import { BilService } from './bill.service';
import { Request, Param } from '@nestjs/common';

@Controller('/bill/special')
export class BillController {
  constructor(private readonly appService: BilService) {}

  @Post('/create')
  async createBill(@Req() request) {
    return await this.appService.createBill(request);
  }

  @Get('/get/:name')
  async getBill(@Param() param) {
    return await this.appService.getBill(param);
  }
}
