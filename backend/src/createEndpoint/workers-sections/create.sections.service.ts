import { Injectable } from '@nestjs/common';
import { PrismaClient, ProjectBill } from '@prisma/client';
import { HttpException, HttpStatus } from "@nestjs/common";
import Fuse from 'fuse.js';
const prisma = new PrismaClient();

@Injectable()
export class CreateSectionService {
  async createSecion(req , param){
    const body = req.body
    const projectBill = await prisma.projectBill.findFirst({
      where:{
        name:param.name
      }
    })
    try{
    const rev = await prisma.section.create({
      data:{
        name:body.name,
        ProjectBill:{
          connect:{
            id: projectBill.id
          }
        }
      }
    })
    console.log(rev)
    return "لقد تم اضافة بند بنجاح"
  }
    catch(e){
      console.log(e)
    }
  }
}
