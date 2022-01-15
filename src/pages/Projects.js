import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import styles from "../styles/projects.module.css";

import db from "../utils/firebase";
import { getDocs, collection } from "firebase/firestore";

export default function Projects() {
    const [projects, setProjects] = useState([
        { title: "Loading", id: "Initial" },
    ]);

    useEffect(() => {
        getDocs(collection(db, "projects"))
            .then((snapshot) => {
                setProjects(
                    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            <div className={styles.header}>
                <h2>My Projects</h2>
                <h3>Projects I've been part of & websites I've made</h3>
            </div>
            <div className={styles.cards}>
                {projects
                    .sort(
                        (a, b) =>
                            new Date(b.start_date) - new Date(a.start_date)
                    )
                    .map((project) => (
                        <Link
                            to={"/projects/" + project.id}
                            key={project.id}
                            style={{ margin: "0 5px 0 5px" }}
                        >
                            <ProjectCard project={project} />
                        </Link>
                    ))}
            </div>
        </div>
    );
}
