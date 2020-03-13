import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import "typeface-roboto";
import SkillChips from "../../components/Chips/SkillChips";

const useStyles = makeStyles({
  body: {
    color: "white"
  },
  image: {
    minWith: "100%",
    maxHeight: "350px",
    maxWidth: "100%"
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

export default function Scrum(props) {
  const classes = useStyles();
  return (
    <div
      className={classes.body}
      style={
        props.mobile ? { margin: "0 20px 0 20px" } : { margin: "0 20px 0 50px" }
      }
    >
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid item sm={12} md={7}>
          <Typography variant="h3">Monte Lego Robot</Typography>
          <Typography variant="h6">Team project</Typography>
          <Typography variant="body">
            Given a Created a LEGO robot of sorts. We decided to make a street
            hustler. The player starts by selecting one out of three
            difficulties. The robot mixes the "cups" and the player finally
            guesses one. Both choices are done pressing one of three buttons.
          </Typography>
        </Grid>
        <Grid item sm={12} md={5}>
          <div>
            <img
              className={classes.image}
              src="./resources/Monte.GIF"
              alt="Monte video"
              style={{ margin: 0 }}
            />

            <SkillChips
              projectName="TDAT1001-LejosProjects/tree/master/KoppOgBall"
              chips={["Java"]}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
