import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../utils/firebase";
import moment from "moment";
import useFirebaseAuthentication from "../utils/useFirebaseAuth";
import { useNavigate } from "react-router-dom";
import Row from "./Row";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    timelineItemClasses,
} from "@mui/lab";

export default function ExpRow({ experience }) {
    const authUser = useFirebaseAuthentication();
    const navigate = useNavigate();
    const [src, setSrc] = useState("");

    const getFromToDateString = (experience) => {
        return (
            moment(experience.start_date).format("MMM YYYY") +
            " - " +
            (experience.end_date ? moment(experience.end_date).format("MMM YYYY") : "Nå")
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
            ? (Math.floor(months / 12) > 1 ? Math.floor(months / 12) + " years" : Math.floor(months / 12) + " year") +
                  (months % 12 > 0 ? ", " + (months % 12) + " mnd" : "")
            : months > 0
            ? months + " mnd"
            : "";
    };

    useEffect(() => {
        if (experience.logo) {
            const imageRef = ref(storage, experience.logo);
            getDownloadURL(imageRef)
                .then((url) => setSrc(url))
                .catch((err) => console.log(err.message));
        }
    }, [experience.logo]);

    return (
        <div>
            <Row additionalSx={{ mb: 1 }}>
                <img
                    src={src}
                    alt="Organization logo"
                    style={{
                        maxWidth: 50,
                        maxHeight: 50,
                        borderRadius: 5,
                        marginRight: 16,
                    }}
                />
                {experience.experiences.length === 1 ? (
                    <Box sx={{ "& p": { margin: 0 }, "& h4": { margin: 0 }, flex: 1 }}>
                        <h4>{experience.experiences[0].title}</h4>
                        <p>{experience.organization}</p>
                        <p style={{ fontSize: 14 }}>{experience.experiences[0].subtitle}</p>
                        <p style={{ fontSize: 14 }}>
                            {getFromToDateString(experience.experiences[0])} &#x2E31; {getDuration()}
                        </p>
                    </Box>
                ) : (
                    <Box sx={{ "& p": { margin: 0 }, "& h4": { margin: 0 }, flex: 1 }}>
                        <h4 style={{ fontSize: 18 }}>{experience.organization}</h4>
                        <p>{getDuration()}</p>
                    </Box>
                )}
                {authUser && (
                    <IconButton
                        aria-label="edit"
                        size="large"
                        onClick={() => navigate("/admin/edit-experience/" + experience.id)}
                    >
                        <EditIcon />
                    </IconButton>
                )}
            </Row>
            {experience.experiences.length > 1 && (
                <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0,
                        },
                        m: 0,
                    }}
                >
                    {experience.experiences
                        .sort((a, b) => {
                            return new Date(b.start_date) - new Date(a.start_date);
                        })
                        .map((position, index) => (
                            <TimelineItem key={index}>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    {index < experience.experiences.length - 1 && <TimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Box sx={{ "& p": { margin: 0 }, "& h4": { margin: 0 }, flex: 1 }}>
                                        <h4>{position.title}</h4>
                                        <p>{position.subtitle}</p>
                                        <p>{getFromToDateString(position)}</p>
                                    </Box>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                </Timeline>
            )}
        </div>
    );
}
