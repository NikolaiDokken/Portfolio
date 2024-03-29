import React from "react";
import Navbar from "./Navbar";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function Layout({ children, themeName, setThemeName }) {
    return (
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 4 }}>
            <Navbar themeName={themeName} setThemeName={setThemeName} />
            <Box>{children}</Box>
            <Box component="footer" sx={{ display: "flex", justifyContent: "center", p: 8 }}>
                <Typography variant="p" textAlign={"center"}>
                    Copyright {new Date().getFullYear()} Nikolai Dokken
                </Typography>
            </Box>
        </Box>
    );
}
