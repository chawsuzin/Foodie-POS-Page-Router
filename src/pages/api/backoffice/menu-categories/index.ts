import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    const menuCategories = await prisma.menuCategories.findMany();
    res.status(200).json({ menuCategories });
  } else if (method === "POST") {
    const menuCategories = req.body;
    const isValid = menuCategories.name;
    if (!isValid) return res.status(400).send("Bad request.");
    await prisma.menuCategories.create({
      data: {
        name: menuCategories.name,
      },
    });
    res.end();
  }
  res.status(405).send("Invalid method.");
}
