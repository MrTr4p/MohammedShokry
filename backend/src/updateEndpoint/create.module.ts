import { Module } from "@nestjs/common";
import { CreateBillController } from "./bills/update.bill.controller";
import { CreateBillService } from "./bills/update.projectbill.service";
import { UpdateAnotherBillController } from "./another bill/create.bill.controller";
import { UpdateAnotherBillService } from "./another bill/create.projectbill.service";
import { PrismaService } from "src/prisma.service";
import { MeiliSearchService } from "src/meilisearch.service";
@Module({
  imports: [],
  controllers: [CreateBillController , UpdateAnotherBillController],
  providers: [CreateBillService , UpdateAnotherBillService , PrismaService , MeiliSearchService],
})
export class UpdateModule {}