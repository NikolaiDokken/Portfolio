import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../../utils/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Box, Typography } from "@mui/material";
import ProjectCard from "./components/ProjectCard";
import PlaceholderCard from "./components/PlaceholderCard";
import { UserContext } from "../../App";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const { isAdmin } = useContext(UserContext);

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
                {isAdmin && (
                    <Link to={"/admin/new-project"}>
                        <ProjectCard isNewProject={true} />
                    </Link>
                )}
                {projects.length === 0 &&
                    Array(10)
                        .fill()
                        .map((placeholder, index) => (
                            <Box sx={{ mx: "5px" }} key={index}>
                                <PlaceholderCard />
                            </Box>
                        ))}
                {projects
                    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
                    .map((project, index) => (
                        <Link to={"/projects/" + project.id} key={project.id} style={{ margin: "0 5px 0 5px" }}>
                            <ProjectCard project={project} />
                        </Link>
                    ))}
            </Box>
        </div>
    );
}
