import React, { useEffect, useState } from "react";
import db from "../utils/firebase";
import { getDocs, collection } from "firebase/firestore";
import ExpRow from "../components/ExpRow";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { MainDivider, SubDivider } from "../components/Dividers";

export default function About() {
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        getDocs(collection(db, "experience")).then((values) => {
            setExperience(values.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, []);

    return (
        <div>
            <Grid2 container justifyContent={"space-around"} sx={{ my: 4 }} spacing={1}>
                <Grid2 xs={12} md={4} display="flex" justifyContent="center">
                    <img
                        src={"/static/me.png"}
                        style={{
                            width: 250,
                            maxWidth: "100%",
                            borderRadius: "50%",
                        }}
                        alt="Headshot"
                    />
                </Grid2>
                <Grid2 xs={12} md={8} textAlign={"center"}>
                    <Typography variant="h2" fontWeight={"bold"}>
                        This is me 👨🏼‍💼
                    </Typography>
                    <Typography variant="h4" fontWeight={"light"} sx={{ mt: 0 }}>
                        I like programming as much as I like working with people. Other than that I really enjoy skiing,
                        boating, and a cold beer with friends.
                    </Typography>
                </Grid2>
            </Grid2>
            <section>
                <Typography variant="h4" fontWeight={"light"}>
                    Work Experience 💼
                </Typography>
                <MainDivider />
                {experience
                    .filter((exp) => exp.type === "Work Experience")
                    .sort((a, b) => {
                        return new Date(b.start_date) - new Date(a.start_date);
                    })
                    .map((job, index) => (
                        <div key={index}>
                            <ExpRow experience={job} />
                            {index !== experience.filter((exp) => exp.type === "Work Experience").length - 1 && (
                                <SubDivider />
                            )}
                        </div>
                    ))}
            </section>
            <section>
                <Typography variant="h4" fontWeight={"light"}>
                    Education 🎓
                </Typography>
                <MainDivider />
                {experience
                    .filter((exp) => exp.type === "Education")
                    .sort((a, b) => {
                        return new Date(b.start_date) - new Date(a.start_date);
                    })
                    .map((edu, index) => (
                        <div key={index}>
                            <ExpRow experience={edu} />
                            {index !== experience.filter((exp) => exp.type === "Education").length - 1 ? (
                                <SubDivider />
                            ) : (
                                ""
                            )}
                        </div>
                    ))}
            </section>
        </div>
    );
}
