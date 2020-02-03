import React from "react";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    borderColor: "#fff",
    color: "#fff",
    margin: "10px"
  },
  bouncy: {
    animation: "bouncy 5s infinite linear",
    position: " relative"
  },
  "@keyframes bouncy": {
    "0%": { top: "0em" },
    "40%": { top: "0em" },
    "43%": { top: "-0.9em" },
    "46%": { top: "0em" },
    "48%": { top: "-0.4em" },
    "50%": { top: "0em" },
    "100%": { top: "0em" }
  }
});

export default function(props) {
  const classes = useStyles();

  return (
    <div className={classes.bouncy}>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => props.changePage(3)}
      >
        SCRUM
      </Button>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => props.changePage(4)}
      >
        Libertyboat.no
      </Button>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => props.changePage(5)}
      >
        Community Newspage
      </Button>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => props.changePage(6)}
      >
        Squiggle
      </Button>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => props.changePage(7)}
      >
        Lego Monté
      </Button>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => props.changePage(8)}
      >
        IDI Rally
      </Button>
    </div>
  );
}
