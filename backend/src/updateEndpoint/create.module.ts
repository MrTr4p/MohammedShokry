import { Module } from "@nestjs/common";
import { CreateBillController } from "./bills/update.bill.controller";
import { CreateBillService } from "./bills/update.projectbill.service";
@Module({
  imports: [],
  controllers: [CreateBillController],
  providers: [CreateBillService ],
})
export class UpdateModule {}