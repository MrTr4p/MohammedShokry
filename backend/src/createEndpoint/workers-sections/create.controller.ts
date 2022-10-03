import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateWorkerService } from './create.workers.service';
import { CreateSectionService } from './create.sections.service';


@Controller('/create')
export class CreateW_SController {
  constructor(private readonly appService: CreateWorkerService , private readonly sectionService : CreateSectionService) {}

  @Post('/worker')
  createProject(@Req() req ) {
    return this.appService.createWorker(req);
  } 

  @Post('/section/:name')
  createSection(@Req() req , @Param() param){
    return this.sectionService.createSecion(req , param)
  }
}