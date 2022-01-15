import React, { useEffect, useState } from "react";
import styles from "../styles/projects.module.css";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../utils/firebase";

export default function ProjectCard({ project }) {
    const { title, stack, preview } = project;
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        if (preview) {
            const imageRef = ref(storage, preview);
            getDownloadURL(imageRef)
                .then((url) => setPreviewUrl(url))
                .catch((err) => console.log(err.message));
        }
    }, [preview]);

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src={previewUrl}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    alt={title + " image"}
                />
            </div>
            <div className={styles.contentContainer}>
                <h3>{title}</h3>
                <p>{stack}</p>
            </div>
        </div>
    );
}
