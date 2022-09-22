import { Module } from '@nestjs/common';
import { BillModule } from './ProjectNormalBill/bill.module'
import { BillModule as TypeBillModule } from './Detailedbill/bill.module';
@Module({
  imports: [BillModule ,TypeBillModule ],

})
export class AppModule {}
