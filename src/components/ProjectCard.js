import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../utils/firebase";
import { Box, Typography, useTheme } from "@mui/material";

export default function ProjectCard({ project }) {
    const { title, stack, preview } = project;
    const [previewUrl, setPreviewUrl] = useState("");
    const theme = useTheme();

    useEffect(() => {
        if (preview) {
            const imageRef = ref(storage, preview);
            getDownloadURL(imageRef)
                .then((url) => setPreviewUrl(url))
                .catch((err) => console.log(err.message));
        }
    }, [preview]);

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
            <Box sx={{ height: "100px", width: "100%", textAlign: "center" }}>
                <img src={previewUrl} style={{ maxWidth: "100%", maxHeight: "100%" }} alt={title + " image"} />
            </Box>
            <Box sx={{ textAlign: "center", marginTop: "20px", height: "120px" }}>
                <Typography
                    variant="h3"
                    fontWeight={"bold"}
                    color={theme.palette.text.primary}
                    fontSize={"large"}
                    sx={{ mb: 1 }}
                >
                    {title}
                </Typography>
                <Typography variant="p" color={theme.palette.text.primary}>
                    {stack}
                </Typography>
            </Box>
        </Box>
    );
}
