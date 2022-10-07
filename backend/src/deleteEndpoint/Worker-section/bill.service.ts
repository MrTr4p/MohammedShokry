import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";




@Injectable()
export class GetService {
  constructor (private prisma : PrismaService) {}
  async deleteWorker(id:string){
   await this.prisma.worker.delete({
    where:{
      id: id
    },
    include:{
      project:true
    }
   })
  }

  async deleteSection(id: string){


      await this.prisma.section.delete({
        where:{
          id: id
        },
        include:{
          expenses:true
        }
      })
    }
      
    

    
  }


