import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  body: {
    padding: "60px"
  }
});

export default function Frontpage() {
  const classes = useStyles();

  return (
    <Grid container direction="row" className={classes.body}>
      <Grid container item xs justify="center">
        <Avatar
          alt="Nikolai Dokken"
          src="./resources/test.png"
          style={{ height: "500px", width: "500px" }}
        />
      </Grid>
      <Grid container item xs justify="center" direction="column">
        <Typography variant="h1">Nikolai Roede Dokken</Typography>
        <Typography variant="h5">
          - Computer Engineering at NTNU Trondheim
        </Typography>
      </Grid>
    </Grid>
  );
}
