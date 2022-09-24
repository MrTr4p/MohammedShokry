import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Controller, Get, Post, Redirect, Req , HttpException, HttpStatus} from '@nestjs/common';
import { Request } from '@nestjs/common';
const prisma = new PrismaClient();



@Injectable()
export class BilService {
  

  async createBill(request){
   
  }

  
}
