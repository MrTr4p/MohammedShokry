import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { MeiliSearch } from 'meilisearch'

@Injectable()
export class MeiliSearchService extends MeiliSearch  {
  constructor(){
    super({host:'http://localhost:7700'})
  } 
}
