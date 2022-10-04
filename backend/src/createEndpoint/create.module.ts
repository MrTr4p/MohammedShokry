import { Module } from "@nestjs/common";
import { CreateBillController } from "./bills/create.bill.controller";
import { CreateBillService } from "./bills/create.projectbill.service";
import { CreateWorkerService } from "./workers-sections/create.workers.service";
import { CreateSectionService } from "./workers-sections/create.sections.service";
import { CreateW_SController } from "./workers-sections/create.controller";

@Module({
  imports: [],
  controllers: [CreateBillController, CreateW_SController],
  providers: [CreateBillService, CreateWorkerService, CreateSectionService],
})
export class CreateModule {}
