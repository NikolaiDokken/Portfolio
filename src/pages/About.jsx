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
            <div
                style={
                    window.innerWidth > 600
                        ? { display: "flex", alignItems: "center" }
                        : {
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                          }
                }
            >
                <img
                    src={"/static/me.png"}
                    style={{
                        width: 250,
                        maxWidth: "100%",
                        borderRadius: "50%",
                        marginRight: window.innerWidth > 600 ? 32 : 0,
                    }}
                />
                <div style={{ textAlign: "center" }}>
                    <h2>
                        This is me
                        <span role="img" aria-label="me">
                            👨🏼‍💼
                        </span>
                    </h2>
                    <h3 style={{ margin: 0, padding: 0 }}>
                        I like programming as much as I like working with
                        people. Other than that I really enjoy skiing, boating,
                        and a cold beer with friends.
                    </h3>
                </div>
            </div>
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
        </div>
    );
}
