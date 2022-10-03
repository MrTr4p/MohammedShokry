import { Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();


@Injectable()
export class AppService {

  async getSearch(query: string) {
    const [projectBills, anotherBills] = await Promise.all([ await prisma.projectBill.findMany({}), await prisma.anotherPaymentsBill.findMany({})]);

    const projectBillsFuse = new Fuse(projectBills, { keys: ["name"] });
    const anotherBillsFuse = new Fuse(anotherBills, { keys: ["name"] });

    const projectBillsResult = projectBillsFuse
      .search(query)
      .map((x) => x.item);
    const anotherBillsResult = anotherBillsFuse
      .search(query)
      .map((x) => x.item);

    return {
      projectBills: projectBillsResult,
      anotherBills: anotherBillsResult,
    };
  }
}
