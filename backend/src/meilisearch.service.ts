import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { MeiliSearch } from 'meilisearch'
import { PrismaService } from "./prisma.service";

@Injectable()
export class MeiliSearchService extends MeiliSearch  {
  constructor(private prisma : PrismaService){
    super({host:'http://localhost:7700'})
  } 
}
