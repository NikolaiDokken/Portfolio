import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../utils/firebase";
import moment from "moment";
import styles from "../styles/about.module.css";

export default function JobRow({ job }) {
    const [src, setSrc] = useState("");
    const imageRef = ref(storage, job.logo);

    const getFromToDateString = (position) => {
        return (
            moment(position.start_date).format("MMM YYYY") +
            " - " +
            (position.end ? moment(position.end).format("MMM YYYY") : "Nå")
        );
    };
    const getDuration = () => {
        var minDate = moment(job.positions[0].start_date);
        var maxDate = moment(job.positions[0].end);
        job.positions.forEach((position) => {
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
        getDownloadURL(imageRef)
            .then((url) => setSrc(url))
            .catch((err) => console.log(err.message));
    }, []);

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
                    {job.positions.length === 1 ? (
                        <div>
                            <h4>{job.positions[0].title}</h4>
                            <p>{job.company}</p>
                            <p style={{ fontSize: 14 }}>
                                {job.positions[0].type}
                            </p>
                            <p style={{ fontSize: 14 }}>
                                {getFromToDateString(job.positions[0])} &#x2E31;{" "}
                                {getDuration()}
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h4 style={{ fontSize: 18 }}>{job.company}</h4>
                            <p>{getDuration()}</p>
                        </div>
                    )}
                </div>
            </div>
            {job.positions.length > 1
                ? job.positions
                      .sort((a, b) => {
                          return (
                              new Date(b.start_date) - new Date(a.start_date)
                          );
                      })
                      .map((position, index) => (
                          <div className={styles.experience} key={index}>
                              {index < job.positions.length - 1 ? (
                                  <div className={styles.trail} />
                              ) : (
                                  ""
                              )}
                              <h4>{position.title}</h4>
                              <p>{position.type}</p>
                              <p>{getFromToDateString(position)}</p>
                          </div>
                      ))
                : ""}
        </div>
    );
}
