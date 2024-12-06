import { BackofficeLayout } from "@/components/BackofficeLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { config } from "@/config";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { MenuCategories, MenuCategoriesMenus, Menus } from "@prisma/client";
import MultiSelect from "@/components/MultiSelect";

export default function UpdateMenuPage() {
  const [menu, setMenu] = useState<Menus>();
  const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getMenu();
    getMenuCategories();
  }, []);

  const getMenu = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menus/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const dataFromServer = await response.json();
    const { menu } = dataFromServer;
    const selected = menu.menuCategoriesMenus.map(
      (item: MenuCategoriesMenus) => item.menuCategoryId
    );
    setSelected(selected);
    setMenu(menu);
  };

  const getMenuCategories = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menu-categories`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const dataFromServer = await response.json();
    const { menuCategories } = dataFromServer;
    setMenuCategories(menuCategories);
  };

  const handleUpdateMenu = async () => {
    await fetch(`${config.backofficeApiUrl}/menus`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...menu, menuCategoryIds: selected }),
    });
    router.push("/backoffice/menus");
  };

  const handleDeleteButton = async () => {
    await fetch(`${config.backofficeApiUrl}/menus/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    router.push("/backoffice/menus");
  };

  if (!menu) return null;

  return (
    <BackofficeLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Update Menu Page</h2>
        <Button
          variant="contained"
          color="error"
          sx={{ width: "fit-content" }}
          onClick={handleDeleteButton}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
        <TextField
          value={menu.name}
          onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
        />
        <TextField
          value={menu.price}
          sx={{ my: 2 }}
          onChange={(evt) =>
            setMenu({ ...menu, price: Number(evt.target.value) })
          }
        />
        <MultiSelect
          title="Menu Category"
          selected={selected}
          setSelected={setSelected}
          items={menuCategories}
        />
        <FormControlLabel
          control={<Checkbox checked={menu.isAvailable ? true : false} />}
          label="Available"
          onChange={(evt, value) => setMenu({ ...menu, isAvailable: value })}
        />
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={handleUpdateMenu}
        >
          Update
        </Button>
      </Box>
    </BackofficeLayout>
  );
}
