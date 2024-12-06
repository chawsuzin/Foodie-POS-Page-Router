import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "GET") {
    const menus = await prisma.menus.findMany();
    res.status(200).json(menus);
  } else if (method === "POST") {
    const menu = req.body;
    const { name, price, isAvailable, menuCategoryIds } = menu;
    const isValid = name && menuCategoryIds.length > 0;
    if (!isValid) return res.status(400).send("Bad request.");
    const createdMenu = await prisma.menus.create({
      data: {
        name: name,
        price: price,
        isAvailable: isAvailable,
      },
    });
    const data = menuCategoryIds.map((menuCategoryId: number) => ({
      menuId: createdMenu.id,
      menuCategoryId,
    }));
    await prisma.menuCategoriesMenus.createMany({
      data,
    });
    res.end();
  } else if (method === "PUT") {
    const menu = req.body;
    console.log(menu);
    const { menuCategoryIds, id, name, price, isAvailable } = menu;
    console.log("menuCategoryIds:", menuCategoryIds);
    const isValid = name;
    if (!isValid) return res.status(400).send("Bad request.");
    await prisma.menus.update({
      data: { name, price, isAvailable },
      where: { id },
    });
    const menuCategoriesMenus = await prisma.menuCategoriesMenus.findMany({
      where: { menuId: id },
    });
    const menuMenuCategoryIds = menuCategoriesMenus.map(
      (item) => item.menuCategoryId
    );
    const isSame =
      menuCategoryIds.length === menuMenuCategoryIds.length &&
      menuCategoryIds.every((itemId: number) =>
        menuMenuCategoryIds.includes(itemId)
      );
    if (!isSame) {
      await prisma.menuCategoriesMenus.deleteMany({ where: { menuId: id } });
      const data = menuCategoryIds.map((menuCategoryId: number) => ({
        menuId: id,
        menuCategoryId,
      }));
      await prisma.menuCategoriesMenus.createMany({ data });
    }
    res.end();
    // } else if (method === "DELETE") {
    //   if (menuId) {
    //     const filteredMenu = menus.filter((menu) => menu.id === Number(menuId));
    //     res.json(filteredMenu);
    //   }
    //   res.end();
  } else {
    res.end();
  }
}
