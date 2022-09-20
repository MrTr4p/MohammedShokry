import { Controller, Get, Post, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from '@nestjs/common';




@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async CreateBill(@Req() request: Request) {
    console.log("phase1")
    return await this.appService.createNewBill(request)
  }
}
