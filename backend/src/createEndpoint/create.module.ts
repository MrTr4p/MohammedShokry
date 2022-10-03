import { Module } from '@nestjs/common';
import { CreateBillController } from './bills/create.bill.controller';
import { CreateBillService } from './bills/create.projectbill.service';
import { CreateWorkerService } from './workers-sections/create.workers.service';
import { CreateSectionService } from './workers-sections/create.sections.service';
import { GetService } from './bills/get.service';

@Module({ 
  imports: [],
  controllers: [CreateBillController],
  providers: [CreateBillService , CreateWorkerService, GetService , CreateSectionService],
})
export class CreateModule {}
