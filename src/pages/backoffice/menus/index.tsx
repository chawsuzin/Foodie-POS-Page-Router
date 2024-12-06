import { BackofficeLayout } from "@/components/BackofficeLayout";
import MenuCard from "@/components/MenuCard";
import { config } from "@/config";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Menus } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MenusPage() {
  const [menus, setMenus] = useState<Menus[]>([]);
  const router = useRouter();

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menus`);
    const menus = await response.json();
    setMenus(menus);
  };
  return (
    <BackofficeLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Menus page</h2>
        <Button
          variant="contained"
          onClick={() => router.push("/backoffice/menus/new")}
        >
          New Menu
        </Button>
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </Box>
    </BackofficeLayout>
  );
}
