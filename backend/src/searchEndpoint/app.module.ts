import { Module } from '@nestjs/common';
import { BillController } from './Search/app.controller';
import { AppService as BillService } from './Search/app.service';
import { WorkerService } from './Search/workers.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [ BillController],
  providers: [BillService, WorkerService , PrismaService],
})
export class SearchModule {}
