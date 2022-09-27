const EDIT_PASSWORD = 'محمد شاكر5151';
const CREATE_PASSWORD = 'sh2022';
const ACCESS_TOKEN =
  '7cfc00192b50e59a49613574edf0a30cde63c5d061da7356faa6fb81be9530f8aa8403a35a771718979cd4994132cc78ff504332a2a22b5ece94bcb68d9aca52';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, ProjectBill } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
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
  console.log(page);
  const results: Partial<result> = {};
  let model;
  if (page != null && limit != null && filter != null) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

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
  } else {
    model = await prisma.projectBill.findMany({
      skip: 0,
      take: 10,
      include: {
        _count: true,
        expenses: true,
        revenues: true,
        workers: true,
      },
    });
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
    let user = {
      accountType: '',
    };
    console.log(req.password == CREATE_PASSWORD);
    console.log(CREATE_PASSWORD, EDIT_PASSWORD);
    if (req.password == EDIT_PASSWORD) {
      user.accountType = 'EDIT';
      const ea = jwt.sign(
        {
          data: user,
        },
        ACCESS_TOKEN,
        { expiresIn: '4h' },
      );
      return ea;
    }
    if (req.password == CREATE_PASSWORD) {
      user.accountType = 'CREATE';
      const ca = jwt.sign(
        {
          data: user,
        },
        ACCESS_TOKEN,
        { expiresIn: '4h' },
      );
      return ca;
    } else {
      return 'الرمز غير صحيح';
    }
  }

  async getAll(query) {
    const bills = await getPageinatedBill(query);
    return bills;
  }
}
