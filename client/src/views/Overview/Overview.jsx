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
    <div>
      {props.pages.map((Page, index) => {
        if (index !== 0 && index !== 1) {
          return (
            <Button
              className={classes.button}
              variant="outlined"
              onClick={() => props.changePage(index + 1)}
              key={index}
            >
              {Page.name}
            </Button>
          );
        } else return null;
      })}
    </div>
  );
}
