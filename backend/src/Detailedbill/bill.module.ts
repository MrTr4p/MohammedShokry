import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BilService } from './bill.service';

@Module({
  imports: [],
  controllers: [BillController],
  providers: [BilService],
})
export class BillModule {}
