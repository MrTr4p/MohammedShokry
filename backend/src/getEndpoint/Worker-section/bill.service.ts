import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";




@Injectable()
export class GetService {
  constructor (private prisma : PrismaService) {}
  async getWorkers(){
    const result = await this.prisma.worker.findMany({ take: 50})
    return result
  }

  async getSections(param){
    const projectBill = await this.prisma.projectBill.findFirst({
      where:{
        name:param.name
      }
    })

    const sections = await this.prisma.section.findMany({
      where:{
        projectBillId:projectBill.id
      }
    })

    return sections
  }

  async getSection(query){

    try{
      const sections = await this.prisma.expenses.findMany({
        where:{
          projectBillId:Number(query.id),
          section:{
            name: query.name
          }
        },include:{
          ProjectBill: true
        }
      })
      if(sections){
        const expenses = sections.map(x => {
          return {
            name: x.materialName, 
            date : x.date , 
            totalCost : x.totalcost
          }
        })
        const result = {
          projectName : sections[0].ProjectBill.name,
          section : query.name,
          data : expenses
        }
        return result
      }else{
        throw new HttpException(
          "لا يوجد هذا البند",
          HttpStatus.NOT_FOUND,
        );
      }
    }catch(e){
      throw new HttpException(
        "لا يوجد هذا البند",
        HttpStatus.NOT_FOUND,
      );
    }
   
   
  }

  async getWorker(query){
    try{
      const workers = await this.prisma.workerSalary.findMany({
        where:{
          projectBillId: Number(query.id),
          Worker:{
            name: query.name
          }
        },include:{
          Worker :true,
          ProjectBill:true
        }
        
      })
     
      if(workers){
        const workerSalary = workers.map(x => {
          return { 
            date : x.date, 
            totalCost : x.amount
          }
        })
        const result = {
          projectName : workers[0].ProjectBill.name,
          worker : query.name,
          data : workerSalary
        }
        return result
      }
      else{
        throw new HttpException(
          "لا يوجد هذا عامل",
          HttpStatus.NOT_FOUND,
        );
      }
    }
    catch(e){
      throw new HttpException(
        "لا يوجد هذا عامل",
        HttpStatus.NOT_FOUND,
      );
    }
    
   }
}
