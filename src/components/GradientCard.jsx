import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

export default function GradientCard({ children }) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: "300px",
                py: 5,
                px: 2,
                borderRadius: 2,
                display: "inline-block",
                flex: "0 0 auto",
                textAlign: "center",
                background: `url('data:image/svg+xml;utf8,<svg   xmlns="http://www.w3.org/2000/svg" ><defs><linearGradient id="Gradient" x1="100%" x2="100%" y1="0" y2="85%" gradientUnits="userSpaceOnUse"><stop stop-color="${theme.palette.primary.main.replace(
                    "#",
                    "%23"
                )}" offset="0"/><stop stop-color="rgba(0,255,255,0)" offset="1"/></linearGradient></defs><rect x="5" y="5" width="100%" height="100%" style="height:calc(100% - 10px);width:calc(100% - 10px)" rx="8" ry="8" stroke-width="1" fill="transparent" stroke="url(%23Gradient)"/></svg>')`,
            }}
        >
            {children}
        </Box>
    );
}
