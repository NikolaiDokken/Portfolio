import React from "react";
import { makeStyles, Grid, Typography, Chip } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import "typeface-roboto";

const useStyles = makeStyles({
  body: {
    color: "white",
    margin: "20px"
  },
  image: {
    width: "100%",
    height: "auto",
    maxHeight: "350px",
    maxWidth: "100%",
    objectFit: "contain"
  },
  description: {
    fontWeight: "inherit"
  },
  button: {
    color: "#fff",
    position: "absolute",
    bottom: "0px"
  }
});

const chips = [
  { label: "React.js", color: "#61dbfb" },
  { label: "Material UI", color: "#e91e63" },
  { label: "Sequelize", color: "#009688" },
  { label: "Node.js", color: "#ffeb3b" },
  { label: "TypeScript", color: "#c6ff00" }
];

export default function Scrum(props) {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <Grid container>
        <Grid item sm={12} md={7}>
          <Typography variant="h3">Scrum Project</Typography>
          <Typography variant="h6">HARMONI</Typography>
          <Typography variant="body1" fontWeight={100}>
            Team project where main goal was to create a website for
            concert-organizers. Worked with 9 other developers, Scrum master and
            product owner. Active use of git, CI and Scrum board.
          </Typography>
        </Grid>
        <Grid item sm={12} md={5}>
          <div>
            <a href="./resources/Harmoni.png" target="_blank">
              <img
                className={classes.image}
                src="./resources/Harmoni.png"
                alt="Harmoni"
                target="_blank"
              />
            </a>
            <Grid container item justify="center" direction="row">
              <a
                href="https://github.com/NikolaiDokken/Harmoni"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
              >
                <GitHubIcon style={{ fontSize: "50px", marginRight: "5px" }} />
              </a>
              {chips.map((chip, index) => (
                <Chip
                  label={chip.label}
                  style={{
                    backgroundColor: chip.color,
                    margin: "auto 5px auto 5px"
                  }}
                  key={index}
                ></Chip>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
