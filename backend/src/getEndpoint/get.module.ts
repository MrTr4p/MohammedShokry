import { Module } from '@nestjs/common';
import { DetailedBillController } from './detailedbill/bill.controller';
import { AggregateBillController } from './aggregatebilll/bill.controller';
import { NormalBillController } from './Normalbill/bill.controller';
import { AggregateBilService } from './aggregatebilll/bill.service';
import { DetailedBilService } from './detailedbill/bill.service';
import { NormalBilService } from './Normalbill/bill.service';
import { GetService } from './Worker-section/bill.service';
import { GetController } from './Worker-section/bill.controller';
import { PrismaService } from 'src/prisma.service';
import { AnotherBilService } from './SpecialBill/bill.service';
import { AnotherBillController } from './SpecialBill/bill.controller';

@Module({ 
  imports: [],
  controllers: [DetailedBillController, AggregateBillController , NormalBillController, GetController , AnotherBillController],
  providers: [AggregateBilService, DetailedBilService, NormalBilService , GetService , PrismaService , AnotherBilService]
})
export class GetModule {}
