import { PrismaClient, ProjectBill } from "@prisma/client";
const prisma = new PrismaClient()
import * as status from 'http-status' 
import * as createError from 'http-errors'
import MeiliSearch from "meilisearch";
const meili =  new MeiliSearch({host:'http://localhost:7700'})

async function deleteSection(id: string) {
  console.log(id)
  const section = await prisma.section.findFirst({
    where: {
      id: id
    },
  });
  console.log(section)
  if (section) {
    await prisma.section.delete({
      where: {
        id: id,
      },
      include: {
        expenses: true,
      },
    });

    await meili.index("section").deleteDocument(section.id);
  }
}

  export default async function handler(req, res) {
    const id = String(req.query.id)
    const result = await deleteSection(id)
    res.status(200).json(result)
  }

