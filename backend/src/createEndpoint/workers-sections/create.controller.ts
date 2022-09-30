import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateWorkerService } from './create.workers.service';


@Controller('/create')
export class AppController {
  constructor(private readonly appService: CreateWorkerService) {}

  @Post('/worker')
  createProject(@Req() req ) {
    return this.appService.createWorker(req);
  } 

}