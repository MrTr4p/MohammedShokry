import { MeiliSearch } from 'meilisearch'

export class MeiliSearchService extends MeiliSearch  {
  constructor(){
    super({host:'http://localhost:7700'})
  } 
}
