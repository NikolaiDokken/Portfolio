import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import {
  Typography,
  makeStyles,
  ThemeProvider,
  responsiveFontSizes,
  createMuiTheme
} from "@material-ui/core";
import "./Frontpage.css";

const useStyles = makeStyles({
  body: {
    padding: "50px"
  }
});

export default function Frontpage() {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.body}>
        <Grid container item md={3} lg={3} justify="center">
          <Avatar
            alt="Nikolai Dokken"
            src="./resources/headshot.jpg"
            style={{ height: "20vw", width: "20vw" }}
          />
        </Grid>
        <Grid container item md={9} lg={9} justify="center" direction="column">
          <ThemeProvider theme={responsiveFontSizes(createMuiTheme())}>
            <Typography variant="h3">Nikolai Roede Dokken</Typography>
            <Typography variant="h5">
              - Computer Engineering at NTNU Trondheim
            </Typography>
          </ThemeProvider>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item justify="center">
          <div id="flipBox">
            <Typography variant="h6">MADE WITH</Typography>
            <div id="flip">
              <div>
                <div>react.js</div>
              </div>
              <div>
                <div>MATERIAL UI</div>
              </div>
              <div>
                <div>JavaScript</div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
