import { Module } from '@nestjs/common';
import { BillModule } from './Bill/bill.module'
@Module({
  imports: [BillModule],

})
export class AppModule {}
