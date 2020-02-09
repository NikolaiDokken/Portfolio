import React from "react";
import { makeStyles, Grid, Typography, Chip } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import "typeface-roboto";

const useStyles = makeStyles({
  body: {
    color: "white"
  },
  image: {
    width: "100%",
    maxHeight: "800px"
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
  { label: "JavaScript", color: "#c6ff00" }
];

export default function AlgoVis(props) {
  const classes = useStyles();
  return (
    <div
      className={classes.body}
      style={
        props.mobile ? { margin: "0 20px 0 20px" } : { margin: "0 20px 0 50px" }
      }
    >
      <Grid container>
        <Grid container item sm={12} md={7} justify="center" direction="column">
          <Typography variant="h3">Algorithm Visualizer</Typography>
          <Typography variant="h6">Shortest path</Typography>
          <Typography variant="body1" fontWeight={100}>
            Small hobby project: Visualizing shortest path algorithms like
            Dijkstra and A*. Allows user to draw walls, and move start/end
            nodes. Visualizes search pattern and then shortest path. Made in
            javascript and CSS. Feel free to try it out in the demo{" "}
            {window.innerWidth >= 960 ? "on the right:" : "below:"}
            <br />
            <a
              href="https://nikolaidokken.github.io/algorithmVisualizer/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "line", color: "white" }}
            >
              Algorithm Visualizer
            </a>
          </Typography>
        </Grid>
        <Grid item sm={12} xs={12} md={5}>
          <div>
            <iframe
              title="Algorithm Visualizer"
              className={classes.image}
              src="https://nikolaidokken.github.io/algorithmVisualizer"
              style={
                window.innerWidth >= 960
                  ? { height: "580px" }
                  : { height: "400px" }
              }
            />
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
