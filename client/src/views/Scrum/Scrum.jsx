import React from "react";
import { makeStyles, Grid, Typography, Chip, Button } from "@material-ui/core";
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
    maxHeight: "400px",
    maxWidth: "100%",
    objectFit: "contain"
  },
  description: {
    fontWeight: "inherit"
  },
  button: {
    borderColor: "#fff",
    color: "#fff",
    marginRight: "0"
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            mollitia dignissimos, corrupti nesciunt nulla labore expedita eaque
            quasi alias ex nisi magni odit id beatae saepe asperiores ea
            pariatur! Amet iste repellat quidem accusantium ducimus quaerat
            error excepturi nemo necessitatibus adipisci! Eos inventore iure
            tempora quia! Laborum numquam officia eos.
          </Typography>
        </Grid>
        <Grid item sm={12} md={5}>
          <div>
            <img
              className={classes.image}
              src="./resources/harmoni.png"
              alt="Harmoni"
              target="_blank"
            />
            <Grid container item justify="center" direction="row">
              <a
                href="https://github.com/NikolaiDokken"
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
                ></Chip>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => props.changePage(2)}
      >
        Go to projects
      </Button>
    </div>
  );
}
