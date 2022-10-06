import { Module } from "@nestjs/common";
import { CreateBillController } from "./bills/create.bill.controller";
import { CreateBillService } from "./bills/create.projectbill.service";
import { CreateWorkerService } from "./workers-sections/create.workers.service";
import { CreateSectionService } from "./workers-sections/create.sections.service";
import { CreateW_SController } from "./workers-sections/create.controller";
import { CreateAnotherBillController } from "./another bill/create.bill.controller";
import { CreateAnotherBillService } from "./another bill/create.projectbill.service";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [],
  controllers: [CreateBillController, CreateW_SController , CreateAnotherBillController],
  providers: [CreateBillService, CreateWorkerService, CreateSectionService , CreateAnotherBillService , PrismaService],
})
export class CreateModule {}
