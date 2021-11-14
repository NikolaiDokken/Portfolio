import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";

function Home() {
    return (
        <section className={styles.header}>
            <div>
                <h2>Hei!</h2>
                <h3>Velkommen til min side</h3>
                <p>Her kan du lese mer om mine prosjekter, og hvem jeg er.</p>
                <p>
                    Denne siden er forresten laget med <strong>Gatsby</strong>.
                    Den er skrevet i <strong>React</strong>, men Gatsby sin
                    prekonfigurasjon gjør denne siden veldig rask*! Dessuten lar
                    den meg hente inn data fra et <strong>GraphQL</strong>{" "}
                    data-lag.
                </p>
                <p className={styles.footnote}>*(forhåpentligvis)</p>
                <Link className={styles.btn} to="/projects">
                    Gå til mine prosjekter
                </Link>
            </div>
            <div style={{ textAlign: "center" }}>
                <img
                    src={"/webdev.svg"}
                    alt="Jeg liker å lage nettsider"
                    style={{ maxWidth: "100%" }}
                />
            </div>
        </section>
    );
}

export default Home;
