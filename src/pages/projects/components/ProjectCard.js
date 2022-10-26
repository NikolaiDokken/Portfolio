import React, { useState } from "react";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import GradientCard from "../../../components/GradientCard";

export default function ProjectCard({ project, isNewProject = false }) {
    const { title, stack, previewURL } = project || ("", "", "");
    const [imgLoading, setImgLoading] = useState(true);

    const theme = useTheme();

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
            <Box sx={{ height: "100px", width: "100%", textAlign: "center", padding: 0 }}>
                <img
                    src={previewURL}
                    style={imgLoading ? { display: "none" } : { maxWidth: "100%", maxHeight: "100%" }}
                    alt={""}
                    onLoad={() => setImgLoading(false)}
                />
                {imgLoading && (
                    <Skeleton
                        height={100}
                        width={150}
                        variant="rectangular"
                        sx={{ borderRadius: 2, margin: "0 auto" }}
                    />
                )}
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
