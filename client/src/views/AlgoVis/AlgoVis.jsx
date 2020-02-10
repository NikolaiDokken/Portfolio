import React from "react";
import { makeStyles, Grid, Typography, Chip } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import "typeface-roboto";
import { useEffect } from "react";

const useStyles = makeStyles({
  body: {
    color: "white",
    height: "100%"
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

const resizeElements = () => {
  const iFrame = document.querySelector("#algovis");
  const grid4 = document.querySelector("#grid4");
  const grid6 = document.querySelector("#grid6");
  console.log(parseInt(window.innerWidth) >= 960);

  iFrame.setAttribute("height", grid4.clientHeight - grid6.clientHeight - 10);
};

export default function AlgoVis(props) {
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("resize", resizeElements);
    resizeElements();
  });

  return (
    <Grid
      container
      direction="column"
      justify="center"
      id="1"
      className={classes.body}
    >
      <Grid container id="2" style={{ height: "inherit" }}>
        <Grid
          container
          item
          md={7}
          justify="center"
          direction="column"
          id="3"
          style={
            parseInt(window.innerWidth) >= 960
              ? { padding: "0 20px 0 50px" }
              : { padding: "0 20px 0 20px" }
          }
        >
          <Typography variant="h3">Algorithm Visualizer</Typography>
          <Typography variant="h6">Shortest path</Typography>
          <Typography variant="body1" fontWeight={100}>
            Small hobby project: Visualizing shortest path algorithms like
            Dijkstra and A*. Allows user to draw walls, and move start/end
            nodes. Visualizes search pattern and then shortest path. Made in
            javascript and CSS. Feel free to try it out in the demo
            {window.innerWidth >= 960 ? " on the right" : "below"} or on the
            page itself(for better performance):
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
        <Grid
          container
          item
          md={5}
          direction="column"
          id="grid4"
          style={
            parseInt(window.innerWidth) >= 960
              ? { padding: "0 20px 0 50px", width: "100%" }
              : { padding: "0 20px 0 20px", width: "100%" }
          }
        >
          <Grid item id="grid5">
            <iframe
              id="algovis"
              title="Algorithm Visualizer"
              src="https://nikolaidokken.github.io/algorithmVisualizer"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="space-evenly"
            id="grid6"
          >
            <a
              href="https://github.com/NikolaiDokken/algorithmVisualizer"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <GitHubIcon style={{ fontSize: "50px" }} />
            </a>
            {chips.map((chip, index) => (
              <Chip
                label={chip.label}
                style={{
                  backgroundColor: chip.color,
                  margin: "auto 0px auto 0px"
                }}
                key={index}
              ></Chip>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
