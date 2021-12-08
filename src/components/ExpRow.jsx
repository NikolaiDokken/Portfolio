import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../utils/firebase";
import moment from "moment";
import styles from "../styles/about.module.css";

export default function ExpRow({ experience }) {
    const [src, setSrc] = useState("");

    const getFromToDateString = (experience) => {
        return (
            moment(experience.start_date).format("MMM YYYY") +
            " - " +
            (experience.end_date
                ? moment(experience.end_date).format("MMM YYYY")
                : "Nå")
        );
    };
    const getDuration = () => {
        var minDate = moment(experience.experiences[0].start_date);
        var maxDate = moment(experience.experiences[0].end_date);
        experience.experiences.forEach((exp) => {
            if (moment(exp.start_date).diff(minDate) < 0) {
                minDate = moment(exp.start_date);
            }
            if (!exp.end_date) {
                maxDate = moment();
            }
            if (moment(exp.end_date).diff(maxDate) > 0) {
                maxDate = moment(exp.end_date);
            }
        });
        const months = maxDate.diff(minDate, "months");
        return Math.floor(months / 12) > 0
            ? (Math.floor(months / 12) > 1
                  ? Math.floor(months / 12) + " years"
                  : Math.floor(months / 12) + " year") +
                  (months % 12 > 0 ? ", " + (months % 12) + " mnd" : "")
            : months > 0
            ? months + " mnd"
            : "";
    };

    useEffect(() => {
        const imageRef = ref(storage, experience.logo);
        getDownloadURL(imageRef)
            .then((url) => setSrc(url))
            .catch((err) => console.log(err.message));
    }, [experience.logo]);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                }}
            >
                <img
                    src={src}
                    alt="Infiniwell logo"
                    style={{
                        maxWidth: 50,
                        maxHeight: 50,
                        borderRadius: 5,
                        marginRight: 16,
                    }}
                />
                <div>
                    {experience.experiences.length === 1 ? (
                        <div>
                            <h4>{experience.experiences[0].title}</h4>
                            <p>{experience.organization}</p>
                            <p style={{ fontSize: 14 }}>
                                {experience.experiences[0].subtitle}
                            </p>
                            <p style={{ fontSize: 14 }}>
                                {getFromToDateString(experience.experiences[0])}{" "}
                                &#x2E31; {getDuration()}
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h4 style={{ fontSize: 18 }}>
                                {experience.organization}
                            </h4>
                            <p>{getDuration()}</p>
                        </div>
                    )}
                </div>
            </div>
            {experience.experiences.length > 1
                ? experience.experiences
                      .sort((a, b) => {
                          return (
                              new Date(b.start_date) - new Date(a.start_date)
                          );
                      })
                      .map((position, index) => (
                          <div className={styles.experience} key={index}>
                              {index < experience.experiences.length - 1 ? (
                                  <div className={styles.trail} />
                              ) : (
                                  ""
                              )}
                              <h4>{position.title}</h4>
                              <p>{position.subtitle}</p>
                              <p>{getFromToDateString(position)}</p>
                          </div>
                      ))
                : ""}
        </div>
    );
}
