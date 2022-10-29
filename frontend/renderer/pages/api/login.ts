import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'
const AdminPass = "محمد شاكر5151";
const SecertaryPass = "sh2022";


async function login(req) {
  const body = req.body || { password: "" };
  if (body.password == AdminPass || body.password == SecertaryPass) {
    return {
      status: 200,
      error: false,
      accountType: body.password == AdminPass ? "edit" : "create",
    };
  } else {
    return {
      status: status.UNAUTHORIZED, 
      error: true,
      msg: 'الرمز السري غير صحيح'
    }
  }
}

  export default async function handler(req, res) {
    const result = await login(req)
    if(result.error == true) return res.status(status.NOT_ACCEPTABLE).json({error : true , msg : result.msg})
    res.status(200).json(result)
  }