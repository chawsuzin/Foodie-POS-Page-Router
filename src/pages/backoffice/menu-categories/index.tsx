import { BackofficeLayout } from "@/components/BackofficeLayout";
import { config } from "@/config";
import { Key } from "@mui/icons-material";
import { Button, Card } from "@mui/material";
import Box from "@mui/material/Box";
import { MenuCategories } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MenuCategoriesPage() {
  const [menuCategories, setMenuCategories] = useState<MenuCategories[]>([]);
  const router = useRouter();

  useEffect(() => {
    getMenuCategories();
  }, []);

  const getMenuCategories = async () => {
    const response = await fetch(`${config.backofficeApiUrl}/menu-categories`);
    const dataFromServer = await response.json();
    const { menuCategories } = dataFromServer;
    setMenuCategories(menuCategories);
  };

  //if (!menuCategories.length) return null;
  return (
    <BackofficeLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Menu Categories Page</h2>
        <Button
          variant="contained"
          onClick={() => router.push("/backoffice/menu-categories/new")}
        >
          New Menu Category
        </Button>
      </Box>
      <Box sx={{ mt: 5, display: "flex" }}>
        {menuCategories.map((menuCategory) => (
          <Card
            key={menuCategory.id}
            variant="outlined"
            sx={{
              width: 100,
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mr: 3,
              cursor: "pointer",
            }}
          >
            {menuCategory.name}
          </Card>
        ))}
      </Box>
    </BackofficeLayout>
  );
}
