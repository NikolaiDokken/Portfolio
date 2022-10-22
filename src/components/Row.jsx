import { Box } from "@mui/material";

export default function Row({ children, additionalSx }) {
    return <Box sx={{ display: "flex", alignItems: "center", ...additionalSx }}>{children}</Box>;
}
