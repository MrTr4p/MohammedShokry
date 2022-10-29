import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'

async function createSecion(req , name){
  let revs = []
  const body = req.body
  const projectBill = await prisma.projectBill.findFirst({
    where:{
      name:name
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
  revs.push(rev)
  //this.meili.index('section').addDocuments(revs)
  console.log(rev)
  return { message: "لقد تم اضافة بند بنجاح", error: false}
}
  catch(e){
    console.log(e)
  }
}

  export default async function handler(req, res) {
    const result = await createSecion(req, req.query.name)
    res.status(200).json(result)
  }

