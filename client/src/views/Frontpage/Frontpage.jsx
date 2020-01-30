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
    padding: "60px"
  }
});

export default function Frontpage() {
  const classes = useStyles();

  return (
    <div>
      <Grid container direction="row" className={classes.body}>
        <Grid container item xs={12} sm={6} justify="center">
          <Avatar
            alt="Nikolai Dokken"
            src="./resources/test.png"
            style={{ height: "40vw", width: "40vw" }}
          />
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
                <div>react</div>
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
