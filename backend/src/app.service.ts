import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, ProjectBill } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
const prisma = new PrismaClient();

interface result {
  next: object;
  previous: object;
  results: ProjectBill[];
}

async function getPageinatedBill(query) {
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const filter = query.filter;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results: Partial<result> = {};
  let model;
  let count;
  if (filter == 'office') {
    model = await prisma.anotherPaymentsBill.findMany({
      skip: startIndex,
      take: limit,
    });

    count = await prisma.anotherPaymentsBill.count();
  } else if (filter == 'public') {
    model = await prisma.projectBill.findMany({
      skip: startIndex,
      take: limit,
      include: {
        expenses: true,
        revenues: true,
        workers: true,
        _count: true,
      },
    });
    count = prisma.projectBill.count();
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
  async login(request) {
    const req = await request.body;
    if (req.password == process.env.EDIT_PASSWORD) {
      return 'Edit account';
    } else if (req.password == process.env.CREATE_PASSWORD) {
      return 'Create Account';
    }
  }

  async getAll(query) {
    const bills = await getPageinatedBill(query);
    return bills;
  }
}
