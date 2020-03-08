import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  body: { color: "white" }
});

export default function Monte(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      className={classes.body}
      style={
        props.mobile
          ? { margin: "0 20px 0 20px", width: "100%", height: "100%" }
          : { margin: "0 20px 0 50px", width: "100%", height: "100%" }
      }
    >
      <Grid item>
        <Typography variant="h2">Monte Lego Robot</Typography>
      </Grid>
      <Grid container item alignItems="center" direction="row">
        <Grid item xs>
          <Typography variant="body">
            Team-project where the end goal was to create a LEGO robot of sorts.
            We decided to make a street hustler.
          </Typography>
        </Grid>
        <Grid item xs>
          <img src="./resources/Monte.GIF" alt="Monte video" />
        </Grid>
      </Grid>
    </Grid>
  );
}
