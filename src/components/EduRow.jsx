import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../utils/firebase";
import moment from "moment";
import styles from "../styles/about.module.css";

export default function EduRow({ school }) {
    const [src, setSrc] = useState("");

    const getFromToDateString = (position) => {
        return (
            moment(position.start_date).format("MMM YYYY") +
            " - " +
            (position.end ? moment(position.end).format("MMM YYYY") : "Nå")
        );
    };
    const getDuration = () => {
        var minDate = moment(school.degrees[0].start_date);
        var maxDate = moment(school.degrees[0].end);
        school.degrees.forEach((position) => {
            if (moment(position.start_date).diff(minDate) < 0) {
                minDate = moment(position.start_date);
            }
            if (!position.end) {
                maxDate = moment();
            }
            if (moment(position.end).diff(maxDate) > 0) {
                maxDate = moment(position.end);
            }
        });
        const months = maxDate.diff(minDate, "months");
        return Math.floor(months / 12) > 0
            ? Math.floor(months / 12) +
                  " år" +
                  (months % 12 > 0 ? ", " + (months % 12) + " mnd" : "")
            : months > 0
            ? months + " mnd"
            : "";
    };

    useEffect(() => {
        const imageRef = ref(storage, school.logo);
        getDownloadURL(imageRef)
            .then((url) => setSrc(url))
            .catch((err) => console.log(err.message));
    }, [school.logo]);

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
                    alt={school.school}
                    style={{
                        maxWidth: 50,
                        maxHeight: 50,
                        borderRadius: 5,
                        marginRight: 16,
                    }}
                />
                <div>
                    {school.degrees.length === 1 ? (
                        <div>
                            <h4>{school.degrees[0].field_of_study}</h4>
                            <p>{school.company}</p>
                            <p style={{ fontSize: 14 }}>
                                {school.degrees[0].degree}
                            </p>
                            <p style={{ fontSize: 14 }}>
                                {getFromToDateString(school.degrees[0])}{" "}
                                &#x2E31; {getDuration()}
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h4 style={{ fontSize: 18 }}>{school.company}</h4>
                            <p>{getDuration()}</p>
                        </div>
                    )}
                </div>
            </div>
            {school.degrees.length > 1
                ? school.degrees
                      .sort((a, b) => {
                          return (
                              new Date(b.start_date) - new Date(a.start_date)
                          );
                      })
                      .map((position, index) => (
                          <div className={styles.experience} key={index}>
                              {index < school.degrees.length - 1 ? (
                                  <div className={styles.trail} />
                              ) : (
                                  ""
                              )}
                              <h4>{position.field_of_study}</h4>
                              <p>{position.degree}</p>
                              <p>{getFromToDateString(position)}</p>
                          </div>
                      ))
                : ""}
        </div>
    );
}
