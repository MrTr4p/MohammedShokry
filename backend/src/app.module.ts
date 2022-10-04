import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateModule } from './createEndpoint/create.module';
import { GetModule } from './getEndpoint/get.module';
import { SearchModule } from './searchEndpoint/app.module';

@Module({
  imports: [CreateModule , GetModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
