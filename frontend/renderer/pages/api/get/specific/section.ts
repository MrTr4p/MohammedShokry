import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

async function getSection(query){

  try{
    const sections = await prisma.expenses.findMany({
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
      throw new createError(
        "لا يوجد هذا البند",
        status.NOT_FOUND,
      );
    }
  }catch(e){
    throw new createError(
      "لا يوجد هذا البند",
      status.NOT_FOUND,
    );
  }
 
 
}

  export default async function handler(req, res) {
    const result = await getSection(req.query)
    res.status(200).json(result)
  }

