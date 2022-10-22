import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

function Home() {
    return (
        <Grid2 container alignItems={"center"} spacing={4} sx={{ mt: 4 }}>
            <Grid2 xs={12} md={6}>
                <Typography variant="h5">Welcome</Typography>
                <Typography variant="h2" fontWeight={"bold"}>
                    I'm Nikolai
                </Typography>
                <Typography variant="h3">Computer Scientist and Developer</Typography>
            </Grid2>
            <Grid2 xs={12} md={6} style={{ textAlign: "center" }}>
                <img src={"/static/webdev.svg"} alt="Jeg liker å lage nettsider" style={{ maxWidth: "100%" }} />
            </Grid2>
        </Grid2>
    );
}

export default Home;
