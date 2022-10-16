import { Module } from '@nestjs/common';
import { NormalBillController } from './Normalbill/bill.controller';
import { NormalBilService } from './Normalbill/bill.service';
import { GetService } from './Worker-section/bill.service';
import { GetController } from './Worker-section/bill.controller';
import { PrismaService } from 'src/prisma.service';
import { AnotherBilService } from './SpecialBill/bill.service';
import { AnotherBillController } from './SpecialBill/bill.controller';
import { MeiliSearchService } from "src/meilisearch.service";

@Module({ 
  imports: [],
  controllers: [ NormalBillController, GetController , AnotherBillController],
  providers: [ NormalBilService , GetService , PrismaService , AnotherBilService , MeiliSearchService]
})
export class DeleteModule {}
