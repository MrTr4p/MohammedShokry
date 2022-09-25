import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Controller, Get, Post, Redirect, Req , HttpException, HttpStatus} from '@nestjs/common';
import { Request } from '@nestjs/common';
const prisma = new PrismaClient();

async function getBill(reqParam){
  const bill = await prisma.projectBill.findFirst({
    where:{
      name:reqParam.name
    }
    
  })
  return bill
}



@Injectable()
export class BilService {
  

  async getBill(param, request){
    const reqParam: {name: string} = param as any
    const bill = await getBill(reqParam)
    const materialName = request.body.materialName
    console.log(materialName)
    const material = await prisma.expenses.findMany({
      where:{
        materialName: materialName,
        projectBillId: bill.id
      }
    })
    console.log(material)
    if(material && material.length != 0)
    {
    const dates = []
    let totalCost = 0
    const finalBill = []
    

    if(bill){
      const expenses = await prisma.expenses.findMany({
        where:{
          materialName: materialName,
          projectBillId: bill.id
        }
      })
      for (let i =0 ; i < expenses.length; i++){
        if(dates.includes(expenses[i].date) == false)
        { 
          dates.sort()
          dates.push(expenses[i].date)
          console.log(typeof(dates[i]), typeof(expenses[i].date))
          
        }
       
      }
      for(let i= 0; i < dates.length; i++){
        let result = 0
        for(let l = 0; l < expenses.length; l++){
          if(expenses[l].date == dates[i] ){
            result = result + expenses[l].totalcost
          }
          
        }
       
        finalBill.push({
          date: dates[i],
          materialCost: result
        })
        totalCost = result + totalCost
      }
      return {finalBill: finalBill , totalCost : totalCost}
    }
    else{
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error:"لا توجد فاتورة ب هذا الاسم"
      }, HttpStatus.NOT_FOUND);
    }
  }
  else{
    return "الفاتورة لا يوجد فيها هذا البند"
  }
}

  
}
