import { Controller, Get, Post, Redirect, Req, Delete, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Param } from '@nestjs/common';

@Controller("/home")
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/allprojectbill')
  async getAllBills(@Query() query){
    return await this.appService.getAll(query)
  }

  @Get('/login')
  async login(@Req() request) {
    return await this.appService.login(request)
  }
}
