import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

async function getWorker(query){
  try{
    const workers = await prisma.workerSalary.findMany({
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
      throw new createError(
        "لا يوجد هذا عامل",
        status.NOT_FOUND,
      );
    }
  }
  catch(e){
    throw new createError(
      "لا يوجد هذا عامل",
      status.NOT_FOUND,
    );
  }
  
 }

export default async function handler(req, res) {
    const result = await getWorker(req.query)
    res.status(200).json(result)
  }

