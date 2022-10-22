import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import db from "../utils/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Box, Typography } from "@mui/material";

export default function Projects() {
    const [projects, setProjects] = useState([{ title: "Loading", id: "Initial" }]);

    useEffect(() => {
        getDocs(collection(db, "projects"))
            .then((snapshot) => {
                setProjects(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            <Box textAlign="center">
                <Typography variant="h2" fontWeight={"bold"} sx={{ mb: 1, mt: 5 }}>
                    My Projects
                </Typography>
                <Typography variant="h4" fontWeight={"light"}>
                    Projects I've been part of & websites I've made
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "nowrap", overflowX: "auto", mt: 5 }}>
                {projects
                    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
                    .map((project) => (
                        <Link to={"/projects/" + project.id} key={project.id} style={{ margin: "0 5px 0 5px" }}>
                            <ProjectCard project={project} />
                        </Link>
                    ))}
            </Box>
        </div>
    );
}
