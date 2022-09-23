import { Controller, Get, Post, Redirect, Req, Delete, Put } from '@nestjs/common';
import { BilService } from './bill.service';
import { Request, Param } from '@nestjs/common';

@Controller('/bill/aggregate')
export class BillController {
  constructor(private readonly appService: BilService) {}


  @Get('/get/:name')
  async getBill(@Param() param ,@Req() request) {
    return await this.appService.getBill(param);
  }
}
