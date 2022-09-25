import { Module } from '@nestjs/common';
import { BillModule } from './ProjectNormalBill/bill.module'
import { BillModule as TypeBillModule } from './Detailedbill/bill.module';
import { BillModule as WorkerBill } from './WorkerBill/bill.module';
import { BillModule as AggregateBill } from './aggregateBill/bill.module';
import { BillModule as SpecialBill } from './SpecialBill/bill.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BillModule ,TypeBillModule, WorkerBill, AggregateBill , SpecialBill],
  controllers:[AppController],
  providers:[AppService]
})
export class AppModule {}
