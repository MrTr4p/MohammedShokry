import { Module } from '@nestjs/common';
import { DetailedBillController } from './detailedbill/bill.controller';
import { AggregateBillController } from './aggregatebilll/bill.controller';
import { NormalBillController } from './Normalbill/bill.controller';
import { AggregateBilService } from './aggregatebilll/bill.service';
import { DetailedBilService } from './detailedbill/bill.service';
import { NormalBilService } from './Normalbill/bill.service';
import { GetService } from './Worker-section/bill.service';
import { GetController } from './Worker-section/bill.controller';


@Module({ 
  imports: [],
  controllers: [DetailedBillController, AggregateBillController , NormalBillController, GetController],
  providers: [AggregateBilService, DetailedBilService, NormalBilService , GetService]
})
export class GetModule {}
