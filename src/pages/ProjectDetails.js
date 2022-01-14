import React, { useEffect, useState } from "react";
import styles from "../styles/project-details.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getFileFromStorage, handleDelete, handleGet } from "../utils/utils";
import useFirebaseAuthentication from "../utils/useFirebaseAuth";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../utils/firebase";

export default function ProjectDetails() {
    const authUser = useFirebaseAuthentication();
    const params = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState({
        id: "",
        title: "",
        stack: "",
        description_md: "",
        github_link: "",
        start_date: new Date(),
    });
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        handleGet("projects", params.id).then((project) => {
            setProject(project);
            if (project.description_path) {
                getFileFromStorage(project.description_path)
                    .then((url) =>
                        fetch(url).then((response) =>
                            response.text().then((md) => setDescription(md))
                        )
                    )
                    .catch((err) => console.log(err.message));
            }
            if (project.image) {
                const imageRef = ref(storage, project.image);
                getDownloadURL(imageRef)
                    .then((url) => setImage(url))
                    .catch((err) => console.log(err.message));
            }
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

    return (
        <div className={styles.details}>
            <div style={{ flexDirection: "row", marginTop: -50 }}>
                <div>
                    <div className={styles.backChevron} />
                    <Link className={styles.backBtn} to="/projects">
                        Tilbake
                    </Link>
                </div>
                {authUser && (
                    <div>
                        <button onClick={handleEditProject}>Edit</button>
                        <button onClick={handleDeleteProject}>Delete</button>
                    </div>
                )}
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
                {project.github_link && (
                    <a
                        href={project.github_link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="/static/github_logo.png"
                            style={{ width: 40, height: 40, color: "white" }}
                            alt="github logo"
                        ></img>
                    </a>
                )}
            </div>
            <img
                style={{ width: "100%", maxHeight: 600, objectFit: "cover" }}
                src={image}
                alt="Thumbnail"
            ></img>
            <ReactMarkdown>{description}</ReactMarkdown>
        </div>
    );
}
