import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import "./Overview.css";

const useStyles = makeStyles({
  button: {
    borderColor: "#fff",
    color: "#fff",
    margin: "10px"
  }
});

export default function(props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => props.changePage(3)}
      >
        SCRUM
      </Button>
      <Button variant="outlined" className={classes.button}>
        Lego Project
      </Button>
      <Button variant="outlined" className={classes.button}>
        Squiggle
      </Button>
      <Button variant="outlined" className={classes.button}>
        Libertyboat.no
      </Button>
      <Button variant="outlined" className={classes.button}>
        Miniproject
      </Button>
    </div>
  );
}
