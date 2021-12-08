import React, { useEffect, useState } from "react";
import styles from "../styles/about.module.css";
import db from "../utils/firebase";
import { getDocs, collection } from "firebase/firestore";
import ExpRow from "../components/ExpRow";

export default function About() {
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        getDocs(collection(db, "experience")).then((values) => {
            setExperience(
                values.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
    }, []);

    return (
        <div className={styles.about}>
            <h2>
                This is me
                <span role="img" aria-label="me">
                    👨🏼‍💼
                </span>
            </h2>
            <section>
                <h3>
                    Work Experience -{" "}
                    <span role="img" aria-label="work-experience">
                        💼
                    </span>
                </h3>
                <div className={styles.divider} />
                {experience
                    .filter((exp) => exp.type === "Work Experience")
                    .sort((a, b) => {
                        return new Date(b.start_date) - new Date(a.start_date);
                    })
                    .map((job, index) => (
                        <div key={index}>
                            <ExpRow experience={job} />
                            {index !==
                                experience.filter(
                                    (exp) => exp.type === "Work Experience"
                                ).length -
                                    1 && <div className={styles.subdivider} />}
                        </div>
                    ))}
            </section>
            <section>
                <h3>
                    Education -{" "}
                    <span role="img" aria-label="education">
                        🎓
                    </span>
                </h3>
                <div className={styles.divider} />
                {experience
                    .filter((exp) => exp.type === "Education")
                    .sort((a, b) => {
                        return new Date(b.start_date) - new Date(a.start_date);
                    })
                    .map((edu, index) => (
                        <div key={index}>
                            <ExpRow experience={edu} />
                            {index !==
                            experience.filter((exp) => exp.type === "Education")
                                .length -
                                1 ? (
                                <div className={styles.subdivider} />
                            ) : (
                                ""
                            )}
                        </div>
                    ))}
            </section>
            <section className={styles.hobbies}>
                <h3>
                    Hobbies and Interests -{" "}
                    <span role="img" aria-label="hobbies and interests">
                        🎿
                    </span>
                </h3>
                <div className={styles.divider} />
                <ul>
                    <li>
                        Skiing: During winter I love to hit the slopes (and
                        off-piste)
                    </li>
                    <li>
                        Boating: As a proud "snekke"-owner, i enjoy the sea, but
                        also fixing the boat during springtime:P
                    </li>
                    <li>
                        IT: Always been a huge interest. Without it, this site
                        wouldn't exist.
                    </li>
                    <li>
                        F1: Like to watch races and participate in online sim
                        races
                    </li>
                </ul>
            </section>
            <section>
                <h3>
                    Favorite OS -{" "}
                    <span role="img" aria-label="favourite os">
                        💻
                    </span>
                </h3>
                <div className={styles.divider} />
                <p>
                    I'm not very picky. Daily user of both macOS and windows,
                    but I feel like a hacker with Linux
                </p>
                <p>Fun fact: This website uses the ubuntu-font</p>
            </section>
        </div>
    );
}
