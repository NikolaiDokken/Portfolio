import React, { useContext, useEffect, useState } from "react";
import db from "../../utils/firebase";
import { getDocs, collection } from "firebase/firestore";
import ExpRow from "./components/ExpRow";
import { Button, Skeleton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { MainDivider, SubDivider } from "../../components/Dividers";
import { useNavigate } from "react-router-dom";
import PlaceholderRow from "./components/PlaceholderRow";
import { UserContext } from "../../App";

export default function About() {
    const [experience, setExperience] = useState([]);
    const [imgLoading, setImgLoading] = useState(true);
    const { isAdmin } = useContext(UserContext);
    const navigate = useNavigate();

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
                        style={
                            imgLoading
                                ? { display: "none" }
                                : {
                                      width: 250,
                                      maxWidth: "100%",
                                      borderRadius: "50%",
                                  }
                        }
                        loading="lazy"
                        alt=""
                        onLoad={() => setImgLoading(false)}
                    />
                    {imgLoading && <Skeleton variant="circular" width={250} height={250} />}
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
            {isAdmin && (
                <Button onClick={() => navigate("/admin/new-experience")} fullWidth>
                    Add experience
                </Button>
            )}
            <section>
                <Typography variant="h4" fontWeight={"light"}>
                    Employment 💼
                </Typography>
                <MainDivider />
                {experience.length === 0 && <PlaceholderRow />}
                {experience
                    .filter((exp) => exp.type === "Work Experience")
                    .sort((a, b) => {
                        return new Date(b.start_date) - new Date(a.start_date);
                    })
                    .map((job, index) => (
                        <div key={index}>
                            <ExpRow experience={job} isAdmin={isAdmin} />
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
                {experience.length === 0 && <PlaceholderRow />}
                {experience
                    .filter((exp) => exp.type === "Education")
                    .sort((a, b) => {
                        return new Date(b.start_date) - new Date(a.start_date);
                    })
                    .map((edu, index) => (
                        <div key={index}>
                            <ExpRow experience={edu} isAdmin={isAdmin} />
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
