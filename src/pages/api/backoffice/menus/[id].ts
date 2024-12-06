import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const menuId = query.id as string;
  if (method === "GET" && menuId) {
    const menu = await prisma.menus.findFirst({
      where: { id: Number(menuId) },
      include: {
        menuCategoriesMenus: true,
      },
    });
    if (!menu) res.status(404).send("Not Found!");
    res.json({ menu });
  } else if (method === "DELETE") {
    await prisma.menus.delete({ where: { id: Number(menuId) } });
  }
  res.status(405).send("Invalid method.");
}
