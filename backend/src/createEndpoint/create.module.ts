import { Module } from '@nestjs/common';
import { AppController } from './bills/create.bill.controller';
import { CreateBillService } from './bills/create.projectbill.service';
import { CreateWorkerService } from './workers-sections/create.workers.service';
import { GetService } from './bills/get.service';

@Module({ 
  imports: [],
  controllers: [AppController],
  providers: [CreateBillService , CreateWorkerService, GetService],
})
export class CreateModule {}
