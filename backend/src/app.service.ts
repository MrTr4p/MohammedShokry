import { Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import * as jwt from "jsonwebtoken";
const AdminPass = "محمد شاكر5151";
import { HttpException, HttpStatus } from "@nestjs/common";
const SecertaryPass = "sh2022";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

async function filter(type?: "office" | "public") {
  const filter = type || "public";
  let result;
  if (filter == "office") {
    result = await prisma.anotherPaymentsBill.findMany({ take: 50 });
  } else {
    result = await prisma.projectBill.findMany({
      include: {
        expenses: true,
        revenues: true,
        sections: true,
        workers: true,
        _count: true,
      },
      take: 50,
    });
  }
  return result;
}

@Injectable()
export class AppService {
  async login(req) {
    const thetoken = "110ec58a-a0f2-4ac4-8393-c866d813b8d1";
    const body = req.body || "";
    const bearer = req.headers["authorization"] || "";
    console.log(bearer);
    const token = bearer.split(" ")[1];
    let pass;
    try {
      pass = jwt.verify(bearer, thetoken);
    } catch (e) {
      pass = "";
    }
    if (pass) {
      if (pass == AdminPass) {
        return { accountType: "create" };
      } else if (pass == SecertaryPass) {
        return { accountType: "edit" };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: "old token",
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    if (body.password == AdminPass || body.password == SecertaryPass) {
      return await jwt.sign(body.password, thetoken);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "لا يوجد حساب ب هذا الحساب",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  async getAll(query) {
    const result = await filter(query.type);
    return result;
  }

}
