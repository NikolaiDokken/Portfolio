import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleDelete, handleGet } from "../../utils/utils";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Button, Box, Typography, IconButton, Skeleton, Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Row from "../../components/Row";
import PlaceholderProject from "./components/PlaceholderProject";
import { UserContext } from "../../App";

export default function ProjectDetails() {
    const { isAdmin } = useContext(UserContext);
    const params = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState();
    const [description, setDescription] = useState(null);
    const [imgLoading, setImgLoading] = useState(true);

    useEffect(() => {
        handleGet("projects", params.id).then((project) => {
            setProject(project);
            fetch(project.descriptionURL).then((response) => response.text().then((md) => setDescription(md)));
        });
    }, [params.id]);

    const handleEditProject = () => {
        navigate("/admin/edit-project/" + params.id);
    };

    const handleDeleteProject = () => {
        handleDelete("projects", params.id)
            .then(() => navigate("/projects"))
            .catch((err) => console.log(err.message));
    };

    if (!project) {
        return <PlaceholderProject />;
    }

    return (
        <Box>
            <Button onClick={() => navigate("/projects")} startIcon={<ArrowBackIosIcon />}>
                Go Back
            </Button>
            <Row>
                <Typography variant="h2" fontWeight={"bold"} sx={{ mr: 1 }}>
                    {project.title}
                </Typography>
                {isAdmin && (
                    <>
                        <IconButton aria-label="edit" size="large" onClick={handleEditProject}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" size="large" onClick={handleDeleteProject}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </Row>
            <Row>
                <Typography variant="h3" sx={{ mr: 1 }}>
                    {project.stack}
                </Typography>
                {project.github_link && (
                    <a href={project.github_link} target="_blank" rel="noreferrer">
                        <img
                            src="/static/github_logo.png"
                            style={{ width: 40, height: 40, color: "white" }}
                            alt="github logo"
                        ></img>
                    </a>
                )}
            </Row>
            <img
                style={imgLoading ? { display: "none" } : { width: "100%", maxHeight: 600, objectFit: "cover" }}
                src={project.imageURL}
                alt="Thumbnail"
                onLoad={() => setImgLoading(false)}
            />
            {imgLoading && <Skeleton variant="rectangular" height={300} />}
            {!description && (
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <Skeleton variant="rounded" height={100} />
                    <Skeleton variant="rounded" height={100} />
                    <Skeleton variant="rounded" height={100} />
                </Stack>
            )}
            <ReactMarkdown style={{ "& a": { color: "white" } }}>{description}</ReactMarkdown>
        </Box>
    );
}
