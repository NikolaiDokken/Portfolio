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
                <h2>Portfolio</h2>
                <h3>
                    Prosjekter jeg har vært med på & nettsider jeg har laget
                </h3>
            </div>
            <div className={styles.cards}>
                {projects.map((project) => (
                    <Link
                        to={"/projects/" + project.slug}
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
