import React from "react";
import { makeStyles, Grid, Typography, Chip } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import "typeface-roboto";

const useStyles = makeStyles({
  body: {
    color: "white"
  },
  image: {
    minWith: "100%",
    width: "500px",
    height: "400px"
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
        <Grid item sm={12} md={7} style={{ paddingRight: "10px" }}>
          <Typography variant="h3">Algorithm Visualizer</Typography>
          <Typography variant="h6">Shortest path</Typography>
          <Typography variant="body1" fontWeight={100}>
            Small hobby project: Visualizing shortest path algorithms like
            Dijkstra and A*. Allows user to draw walls, and move start/end
            nodes. Visualizes search pattern and then shortest path. Made in
            javascript and CSS.
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
        <Grid item sm={12} md={5}>
          <div>
            
              <iframe
                title="Algorithm Visualizer"
                className={classes.image}
                src="https://nikolaidokken.github.io/algorithmVisualizer"
                style={{ margin: "0" }}
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
