import { Module } from '@nestjs/common';
import { BillModule } from './ProjectNormalBill/bill.module'
import { BillModule as TypeBillModule } from './Detailedbill/bill.module';
import { BillModule as WorkerBill } from './WorkerBill/bill.module';
import { BillModule as AggregateBill } from './aggregateBill/bill.module';
@Module({
  imports: [BillModule ,TypeBillModule, WorkerBill, AggregateBill ],

})
export class AppModule {}
