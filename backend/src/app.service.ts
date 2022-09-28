const EDIT_PASSWORD = "محمد شاكر5151";
const CREATE_PASSWORD = "sh2022";
const ACCESS_TOKEN =
  "7cfc00192b50e59a49613574edf0a30cde63c5d061da7356faa6fb81be9530f8aa8403a35a771718979cd4994132cc78ff504332a2a22b5ece94bcb68d9aca52";
import { Injectable } from "@nestjs/common";
//@ts-ignore
import { PrismaClient, ProjectBill } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import Fuse from "fuse.js";
import { HttpException, HttpStatus } from "@nestjs/common";
const prisma = new PrismaClient();

interface result {
  next: object;
  previous: object;
  results: ProjectBill[];
}

async function getPageinatedBill(query) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const filter = query.filter || "public";
  const results: Partial<result> = {};
  let model;
  if (page != null && limit != null && filter != null) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let count;
    if (filter == "office") {
      model = await prisma.anotherPaymentsBill.findMany({
        skip: startIndex,
        take: limit,
      });
     

      count = await prisma.anotherPaymentsBill.count();
    } else if (filter == "public") {
      const projectArray = [];

      const projectBill = await prisma.projectBill.findMany({
        skip: startIndex,
        take: limit,
        include: {
          expenses: true,
          revenues: true,
          workers: true,
          _count: true,
        },
      });
      console.log(projectBill)
      const expenses = await prisma.expenses.findMany({
        where:{
          //@ts-ignore
          projectBillId:projectBill.id
        }
      })
      console.log(expenses)

      const summedBills = projectBill.map((bill) => {
        let newBill = {
          ...bill,
          totalExpenses: 0,
          totalWorkersSalary: 0,
          totalRevenues: 0,
          totalCost: 0,
        };
        newBill.totalExpenses = bill.expenses.reduce(
          (total, current) => (total += current.totalcost),
          0,
        );
        newBill.totalWorkersSalary = bill.workers.reduce(
          (total, current) => (total += current.salary),
          0,
        );
        newBill.totalRevenues = bill.revenues.reduce(
          (total, current) => (total += current.amount),
          0,
        );
        newBill.totalCost = newBill.totalExpenses + newBill.totalWorkersSalary;
        return newBill;
      });

      model = summedBills;
    }

    if (endIndex < count) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
  }

  try {
    results.results = model;

    return results.results;
  } catch (e) {
    console.log(e);
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}

@Injectable()
export class AppService {
  async getSearch(param) {
    const projectBills = await prisma.projectBill.findMany({
      include: {
        expenses: true,
        revenues: true,
        workers: true,
        _count: true,
      },
    });

    const fuse = new Fuse(projectBills, { keys: ["name"] });
    const searchResultBills = fuse.search(param.name).map((x) => x.item);

    const results = await Promise.all(
      searchResultBills.map(async (projectBill: any) => {
        const workers = await prisma.worker.aggregate({
          where: {
            projectId: projectBill.id,
          },
          _sum: {
            salary: true,
          },
        });
        const expenses = await prisma.expenses.aggregate({
          where: {
            projectBillId: projectBill.id,
          },
          _sum: {
            totalcost: true,
          },
        });
        return {
          ...projectBill,
          workersSalary: workers._sum.salary,
          totalExpenses: expenses._sum.totalcost,
          totalCost: workers._sum.salary + expenses._sum.totalcost,
        };
      }),
    );

    return results;
  }

  async login(request) {
    const req = await request.body;
    let user = {
      accountType: "",
    };
    console.log(req.password == CREATE_PASSWORD);
    console.log(CREATE_PASSWORD, EDIT_PASSWORD);
    if (req.password == EDIT_PASSWORD) {
      user.accountType = "EDIT";
      const ea = jwt.sign(
        {
          data: user,
        },
        ACCESS_TOKEN,
        { expiresIn: "4h" },
      );
      return ea;
    }
    if (req.password == CREATE_PASSWORD) {
      user.accountType = "CREATE";
      const ca = jwt.sign(
        {
          data: user,
        },
        ACCESS_TOKEN,
        { expiresIn: "4h" },
      );
      return ca;
    } else {
      return "الرمز غير صحيح";
    }
  }

  async getAll(query) {
    const bills = await getPageinatedBill(query);
    return bills;
  }
}
