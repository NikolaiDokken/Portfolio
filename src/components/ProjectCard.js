import React from "react";
import styles from "../styles/projects.module.css";

export default function ProjectCard({ project }) {
  const { title, stack, thumb, color } = project;
  return (
    <div
      className={`${styles.card} ${
        color === "red"
          ? styles.red
          : color === "blue"
          ? styles.blue
          : color === "green"
          ? styles.green
          : color === "orange"
          ? styles.orange
          : styles.blue
      }`}
    >
      <div className={styles.imageContainer}>
        <img
          src={thumb}
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
