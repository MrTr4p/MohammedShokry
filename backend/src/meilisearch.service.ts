import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { MeiliSearch } from 'meilisearch'

@Injectable()
export class MeiliSearchService extends MeiliSearch  {
  // constructor(){
  //   this({host:'http://localhost:7700'})
  // } 
}
