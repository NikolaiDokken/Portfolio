import React, { useEffect, useState } from "react";
import styles from "../styles/project-details.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { handleDelete, handleGet } from "../utils/utils";

export default function ProjectDetails() {
    let params = useParams();
    let navigate = useNavigate();
    const [project, setProject] = useState({
        id: "",
        title: "",
        stack: "",
        description_md: "",
        github_link: "",
        start_date: new Date(),
    });

    useEffect(() => {
        handleGet("projects", params.id).then((project) => setProject(project));
    }, [params.id]);

    const handleEditProject = () => {
        navigate("/admin/edit-project/" + params.id);
    };

    const handleDeleteProject = () => {
        handleDelete("projects", params.id);
        navigate("/projects");
    };

    return (
        <div className={styles.details}>
            <div style={{ flexDirection: "row", marginTop: -50 }}>
                <div>
                    <div className={styles.backChevron} />
                    <Link className={styles.backBtn} to="/projects">
                        Tilbake
                    </Link>
                </div>
                <div>
                    <button onClick={handleEditProject}>Edit</button>
                    <button onClick={handleDeleteProject}>Delete</button>
                </div>
            </div>
            <h2>{project.title}</h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <h3
                    style={{
                        padding: 0,
                        margin: "0 8px 0 0",
                    }}
                >
                    {project.stack}
                </h3>
                <a href={project.github_link} target="_blank" rel="noreferrer">
                    <img
                        src="/github.png"
                        style={{ width: 40, height: 40, color: "white" }}
                        alt="github logo"
                    ></img>
                </a>
            </div>
            <div
                className={styles.projectMd}
                dangerouslySetInnerHTML={{ __html: project.description_md }}
            />
        </div>
    );
}
