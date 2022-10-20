import { ConsoleLogger, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { MeiliSearchService } from "src/meilisearch.service";

@Injectable()
export class GetService {
  constructor(
    private prisma: PrismaService,
    private meili: MeiliSearchService,
  ) {}

  async deleteWorker(id: string) {
    console.log("Delete worker");
    const worker = await this.prisma.worker.findFirst({
      where: {
        id: id,
      },
    });
    console.log(worker);
    if (worker) {
      await this.prisma.worker.delete({
        where: {
          id: worker.id,
        },
        include: {
          project: true,
        },
      });
      await this.meili.index("workers").deleteDocument(worker.id);
    }
  }

  async deleteSection(id: string) {
    console.log(id)
    const section = await this.prisma.section.findFirst({
      where: {
        id: id
      },
    });
    console.log(section)
    if (section) {
      await this.prisma.section.delete({
        where: {
          id: id,
        },
        include: {
          expenses: true,
        },
      });

      await this.meili.index("section").deleteDocument(section.id);
    }
  }
}
