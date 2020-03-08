import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import SkillChips from "../../components/Chips/SkillChips";

const useStyles = makeStyles({
  body: { color: "white" }
});

export default function Monte(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.body}
      style={
        props.mobile
          ? { margin: "0 20px 0 20px", width: "100%", height: "100%" }
          : { margin: "0 20px 0 50px", width: "100%", height: "100%" }
      }
    >
      <Grid container direction="column" item xs={12} md={6}>
        <Typography variant="h3">Monte Lego Robot</Typography>
        <Typography variant="h6">Team project</Typography>
        <Typography variant="body">
          Given a Created a LEGO robot of sorts. We decided to make a street
          hustler. The player starts by selecting one out of three difficulties.
          The robot mixes the "cups" and the player finally guesses one. Both
          choices are done pressing one of three buttons.
        </Typography>
      </Grid>
      <Grid container item xs={12} md={6}>
        <img
          src="./resources/Monte.GIF"
          alt="Monte video"
          style={{ objectFit: "contain" }}
        />
        <SkillChips
          projectName="TDAT1001-LejosProjects/tree/master/KoppOgBall"
          chips={["Java"]}
        />
      </Grid>
    </Grid>
  );
}
