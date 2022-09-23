import { Module } from '@nestjs/common';
import { BillModule } from './ProjectNormalBill/bill.module'
import { BillModule as TypeBillModule } from './Detailedbill/bill.module';
import { BillModule as WorkerBill } from './WorkerBill/bill.module';
@Module({
  imports: [BillModule ,TypeBillModule, WorkerBill ],

})
export class AppModule {}
