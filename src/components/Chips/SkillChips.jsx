import React from "react";
import { Chip, Grid } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

const chips = [
  { label: "React.js", color: "#61dbfb" },
  { label: "Bootstrap", color: "#e91e63" },
  { label: "Material UI", color: "#e91e63" },
  { label: "Sequilize", color: "#e91e63" },
  { label: "TypeScript", color: "#e91e63" },
  { label: "JavaScript", color: "#e91e63" },
  { label: "Node.js", color: "#ffeb3b" },
  { label: "Flow", color: "#c6ff00" },
  { label: "Java", color: "#c6ff00" }
];

export default function SkillChips(props) {
  return (
    <Grid container item justify="center" direction="row">
      <a
        href={"https://github.com/NikolaiDokken/" + props.projectName}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "white" }}
      >
        <GitHubIcon style={{ fontSize: "50px", marginRight: "5px" }} />
      </a>
      {props.chips.map((chip, index) => (
        <Chip
          label={chip}
          style={{
            backgroundColor: chips.find(tempChip => tempChip.label === chip)
              .color,
            margin: "auto 5px"
          }}
          key={index}
        ></Chip>
      ))}
    </Grid>
  );
}
