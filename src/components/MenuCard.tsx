import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

import Link from "next/link";
import { config } from "@/config";
import { Menus } from "@prisma/client";

interface Props {
  menu: Menus;
}

export default function MenuCard({ menu }: Props) {
  const { name, price } = menu;

  return (
    <Link
      href={`/backoffice/menus/${menu.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 260,
          borderRadius: 2,
          boxShadow: 3,
          mr: 2,
          mb: 2,
        }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWAFaC6Na2__ahcZ-K-FQNZlS5kUeguW3H0jzsgEOa5uZ7WO60tfLesMDU-lS9ydmyw40&usqp=CAU"
          alt="Menu Item"
          width="260"
          height="120"
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            objectFit: "cover",
          }}
        />
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {name}
            </Typography>
            <Typography variant="body1" color="primary">
              ${price}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Chip
              label={menu.isAvailable ? "Available" : "Sold out"}
              color={menu.isAvailable ? "success" : "error"}
              sx={{
                fontSize: "0.75rem",
                padding: "2px 8px",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
