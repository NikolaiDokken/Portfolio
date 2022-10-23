import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../utils/firebase";
import { Box, Typography, useTheme } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import GradientCard from "./GradientCard";

export default function ProjectCard({ project, isNewProject = false }) {
    const [previewUrl, setPreviewUrl] = useState("");
    const { title, stack, preview } = project || ("", "", "");

    const theme = useTheme();

    useEffect(() => {
        if (preview) {
            const imageRef = ref(storage, preview);
            getDownloadURL(imageRef)
                .then((url) => setPreviewUrl(url))
                .catch((err) => console.log(err.message));
        }
    }, [preview]);

    if (isNewProject) {
        return (
            <GradientCard>
                <Box sx={{ height: "100px", width: "100%", textAlign: "center" }}>
                    <AddRoundedIcon
                        htmlColor={theme.palette.primary.main}
                        sx={{ maxWidth: "100%", maxHeight: "100%", fontSize: "6rem" }}
                    />
                </Box>
                <Box sx={{ textAlign: "center", marginTop: "20px", height: "120px" }}>
                    <Typography
                        variant="h3"
                        fontWeight={"bold"}
                        color={theme.palette.text.primary}
                        fontSize={"large"}
                        sx={{ mb: 1 }}
                    >
                        Add project
                    </Typography>
                </Box>
            </GradientCard>
        );
    }
    return (
        <GradientCard>
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
        </GradientCard>
    );
}
