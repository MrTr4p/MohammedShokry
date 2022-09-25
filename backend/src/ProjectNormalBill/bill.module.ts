import { MiddlewareConsumer, Module , NestModule , RequestMethod } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BilService } from './bill.service';
import { Request } from '@nestjs/common';


@Module({
  imports: [],
  controllers: [BillController],
  providers: [BilService],
})
export class BillModule {}
