import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
}

export function BackofficeLayout({ children }: Props) {
  return (
    <Box>
      <Topbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ p: 2, width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
}
