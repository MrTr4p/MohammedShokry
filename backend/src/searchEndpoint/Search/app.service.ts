import { Injectable } from "@nestjs/common";
import { PrismaClient, ProjectBill } from "@prisma/client";
import Fuse from "fuse.js";
const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getSearch(query: string, maxResults = 100) {
    const [projectBills, anotherBills] = await Promise.all([
      await prisma.projectBill.findMany({
        select: { clientName: true, name: true },
      }),
      await prisma.anotherPaymentsBill.findMany({
        select: { projectName: true },
      }),
    ]);

    const projectBillsFuse = new Fuse(projectBills, {
      keys: ["name", "clientName"],
    });

    const anotherBillsFuse = new Fuse(anotherBills, {
      keys: ["name"],
    });

    const projectBillsResult = projectBillsFuse
      .search(query)
      .map((x) => x.item);
    const anotherBillsResult = anotherBillsFuse
      .search(query)
      .map((x) => x.item);

    return {
      projectBills: projectBillsResult.slice(0, maxResults),
      anotherBills: anotherBillsResult.slice(0, maxResults),
    };
  }
}
