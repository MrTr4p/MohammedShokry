import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateModule } from './createEndpoint/create.module';
import { GetModule } from './getEndpoint/get.module';
import { SearchModule } from './searchEndpoint/app.module';
import { UpdateModule } from './updateEndpoint/create.module';
import { PrismaService } from './prisma.service';
import { DeleteModule } from './deleteEndpoint/get.module';
import { MeiliSearchService } from './meilisearch.service';


@Module({
  imports: [CreateModule , GetModule, SearchModule , UpdateModule, DeleteModule],
  controllers: [AppController],
  providers: [AppService , PrismaService , MeiliSearchService],
})
export class AppModule {}
