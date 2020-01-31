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
      <Grid container direction="row" className={classes.body}>
        <Grid container item xs={12} lg={6} justify="center" direction="column">
          <Grid item container xs justify="center">
            <Avatar
              alt="Nikolai Dokken"
              src="./resources/test.png"
              style={{ height: "20vw", width: "20vw" }}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} lg={6} justify="center" direction="column">
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
