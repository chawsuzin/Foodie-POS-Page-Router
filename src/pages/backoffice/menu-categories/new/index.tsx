import { BackofficeLayout } from "@/components/BackofficeLayout";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { config } from "@/config";
import { useRouter } from "next/router";
import { MenuCategories } from "@prisma/client";

export default function NewMenuPage() {
  const defaultMenuCategory = { name: "" };
  const [newMenuCategory, setNewMenuCategory] =
    useState<Partial<MenuCategories>>(defaultMenuCategory);
  const router = useRouter();

  const handleCreateMenu = async () => {
    const isValid = newMenuCategory.name;
    if (!isValid) return alert("Required Menu Category Name");
    await fetch(`${config.backofficeApiUrl}/menu-categories`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newMenuCategory),
    });
    router.push("/backoffice/menu-categories");
  };

  return (
    <BackofficeLayout>
      <h1>New Menu Category Page</h1>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          placeholder="Name"
          onChange={(evt) =>
            setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
          }
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={handleCreateMenu}
        >
          create
        </Button>
      </Box>
    </BackofficeLayout>
  );
}
