import { Injectable } from '@nestjs/common';
import { PrismaClient, ProjectBill } from '@prisma/client';
import { HttpException, HttpStatus } from "@nestjs/common";
import Fuse from 'fuse.js';
import { PrismaService } from "src/prisma.service";
import { MeiliSearchService } from 'src/meilisearch.service';

@Injectable()
export class CreateSectionService {
  constructor(private prisma : PrismaService , private meili: MeiliSearchService) {}
  async createSecion(req , param){
    let revs
    const body = req.body
    const projectBill = await this.prisma.projectBill.findFirst({
      where:{
        name:param.name
      }
    })
    try{
    const rev = await this.prisma.section.create({
      data:{
        name:body.name,
        ProjectBill:{
          connect:{
            id: projectBill.id
          }
        }
      }
    })
    revs.push(rev)
    this.meili.index('section').addDocuments(revs)
    console.log(rev)
    return { message: "لقد تم اضافة بند بنجاح", error: false}
  }
    catch(e){
      console.log(e)
    }
  }
}
