import React, { useState } from "react";
import { makeStyles, Grid, Typography, Chip } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import "typeface-roboto";
import { AutoRotatingCarousel } from "material-auto-rotating-carousel";
import { Slide } from "material-auto-rotating-carousel";

const { red, blue, green } = require("@material-ui/core/colors");

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

const chips = [
  { label: "React.js", color: "#61dbfb" },
  { label: "Bootstrap", color: "#e91e63" },
  { label: "Node.js", color: "#ffeb3b" },
  { label: "Flow", color: "#c6ff00" }
];
const slides = [
  {
    image: "./resources/CommunityNews1.png",
    mainBgColor: red[400],
    barBgColor: red[600],
    title: "Frontpage",
    subtitle: "Newscards with dynamic description length based on screen size."
  },
  {
    image: "./resources/CommunityNews2.png",
    mainBgColor: blue[400],
    barBgColor: blue[600],
    title: "Register Article",
    subtitle:
      "Bootstrap form that allows user to write HTML description, and add title and catgory. Importancy is also an option (whether or not to show on frontpage)."
  },
  {
    image: "./resources/CommunityNews3.png",
    mainBgColor: green[400],
    barBgColor: green[600],
    title: "Edit/delete Article",
    subtitle:
      "Bootstrap collapse accordion allows users to edit an article of choice(edit form will collapse down), and delete it if wanted."
  }
];

export default function CommunityNews(props) {
  const classes = useStyles();
  const [carouselOpen, setCarouselOpen] = useState(false);
  return (
    <div
      className={classes.body}
      style={
        props.mobile ? { margin: "0 20px 0 20px" } : { margin: "0 20px 0 50px" }
      }
    >
      <Grid container>
        <Grid item sm={12} md={7} style={{ paddingRight: "10px" }}>
          <Typography variant="h3">Small News Site</Typography>
          <Typography variant="h6">Miniproject</Typography>
          <Typography variant="body1" fontWeight={100}>
            Individual project where the goal was to create a small community
            news site. Users can register, edit, or delete articles, and comment
            on others'. There are different categories and articles can be
            searched for. Each article can have a description consistin of HTML
            content.{" "}
            <font color="purple">
              Click{" "}
              <font
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setCarouselOpen(true)}
              >
                here
              </font>{" "}
              or on the image to view more.
            </font>
            <br />
            <a
              href="https://community-paper-frontend.herokuapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "line", color: "white" }}
            >
              Community News
            </a>
          </Typography>
        </Grid>
        <Grid item sm={12} md={5}>
          <div>
            <img
              className={classes.image}
              src="./resources/CommunityNews1.png"
              alt="Harmoni"
              style={{ margin: "0", cursor: "pointer" }}
              onClick={() => setCarouselOpen(true)}
            />
            <Grid container item justify="center" direction="row">
              <a
                href="https://github.com/NikolaiDokken/CommunityNews"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
              >
                <GitHubIcon style={{ fontSize: "50px", marginRight: "5px" }} />
              </a>
              {chips.map((chip, index) => (
                <Chip
                  label={chip.label}
                  style={{
                    backgroundColor: chip.color,
                    margin: "auto 5px auto 5px"
                  }}
                  key={index}
                ></Chip>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
      <AutoRotatingCarousel
        label="Close"
        open={carouselOpen}
        onClose={() => setCarouselOpen(false)}
        onStart={() => setCarouselOpen(false)}
        style={{ position: "absolute" }}
        interval={5000}
        mobile={props.mobile}
      >
        {slides.map(slide => (
          <Slide
            media={
              <img
                src={slide.image}
                style={props.mobile ? { width: "100%" } : { height: "100%" }}
                alt="webpage"
              />
            }
            mediaBackgroundStyle={{ backgroundColor: slide.mainBgColor }}
            style={{ backgroundColor: slide.barBgColor }}
            title={slide.title}
            subtitle={slide.subtitle}
          />
        ))}
      </AutoRotatingCarousel>
    </div>
  );
}
