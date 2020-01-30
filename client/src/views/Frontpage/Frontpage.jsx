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
import "./Buttons.css";

const useStyles = makeStyles({
  body: {
    padding: "50px"
  }
});

export default function Frontpage() {
  const classes = useStyles();

  return (
    <div>
      <Grid container direction="row" className={classes.body}>
        <Grid container item xs={12} sm={6} justify="center" direction="column">
          <Grid container item xs justify="center">
            <Avatar
              alt="Nikolai Dokken"
              src="./resources/test.png"
              style={{ height: "20vw", width: "20vw" }}
            />
          </Grid>
          <Grid container item xs justify="center">
            <div class="page">
              <div class="content">
                <div class="circle">
                  <div class="circle_title">
                    <h2>Great Outdoors</h2>
                    <h3>Get some fresh air</h3>
                  </div>
                  <div class="circle_inner">
                    Halla
                  </div>
                  <div class="content_shadow"></div>
                </div>
              </div>
              <div class="content">
                <div class="circle">
                  <div class="circle_title">
                    <h2>City Breaks</h2>
                    <h3>Go somewhere new</h3>
                  </div>
                  <div class="circle_inner">
                    Yo
                  </div>
                  <div class="content_shadow"></div>
                </div>
              </div>
              <div class="content">
                <div class="circle">
                  <div class="circle_title">
                    <h2>Cheap Flights</h2>
                    <h3>Come fly with me</h3>
                  </div>
                  <div class="circle_inner">
                    McFlo
                  </div>
                  <div class="content_shadow"></div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={6} justify="center" direction="column">
          <ThemeProvider theme={responsiveFontSizes(createMuiTheme())}>
            <Typography variant="h1">Nikolai Roede Dokken</Typography>
            <Typography variant="h5">
              - Computer Engineering at NTNU Trondheim
            </Typography>
          </ThemeProvider>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid container item xs={12} justify="center">
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
                <div>CSS</div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
