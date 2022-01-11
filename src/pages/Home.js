import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";

function Home() {
    return (
        <section className={styles.header}>
            <div>
                <h4>Welcome</h4>
                <h2>I'm Nikolai</h2>
                <h3>Computer Scientist and Developer</h3>
                <Link className={styles.btn} to="/projects">
                    Projects
                </Link>
                <Link className={styles.btn} to="/about">
                    Experience
                </Link>
            </div>
            <div style={{ textAlign: "center" }}>
                <img
                    src={"/static/webdev.svg"}
                    alt="Jeg liker å lage nettsider"
                    style={{ maxWidth: "100%" }}
                />
            </div>
        </section>
    );
}

export default Home;
