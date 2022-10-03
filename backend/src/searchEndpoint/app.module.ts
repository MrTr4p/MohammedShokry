import { Module } from '@nestjs/common';
import { WorkersController } from './workers/app.controller';
import { BillController } from './bill/app.controller';
import { AppService as BillService } from './bill/app.service';
import { AppService as WorkersService } from './workers/app.service';

@Module({
  imports: [],
  controllers: [WorkersController , BillController],
  providers: [WorkersService , BillService],
})
export class SearchModule {}
