import React from "react";
import { useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Frontpage from "./views/Frontpage/Frontpage";
import Overview from "./views/Overview/Overview";
import Scrum from "./views/Scrum/Scrum";
import AlgoVis from "./views/AlgoVis/AlgoVis";
import "./overrides.css";
import CommunityNews from "./views/CommunityNews/CommunityNews";
import Monte from "./views/Monte/Monte";

export default function App() {
  const pages = [
    { component: Frontpage, name: "Frontpage", color: "white" },
    { component: Overview, name: "Projects", color: "#000" },
    { component: Scrum, name: "Harmoni", color: "#313131" },
    {
      component: AlgoVis,
      name: "Algorithm Visualizer",
      color: "#329ea8"
    },
    {
      component: CommunityNews,
      name: "Community News",
      color: "#ff9a4d"
    },
    {
      component: Monte,
      name: "Monte Robot",
      color: "#183052"
    }
  ];
  const [navigationBool] = useState(window.innerWidth <= 600 ? false : true);

  return (
    <div className="App">
      <ReactFullpage
        navigation={navigationBool}
        navigationPosition="left"
        navigationTooltips={pages.map(page => page.name)}
        scrollOverflow={false}
        sectionsColor={pages.map(page => page.color)}
        render={({ state, fullpageApi }) => {
          function changePage(pageNr) {
            fullpageApi.moveTo(pageNr, 0);
          }
          return (
            <div id="fullpage-wrapper">
              {pages.map((Page, index) => (
                <div className="section" key={index}>
                  <Page.component
                    changePage={changePage}
                    pages={index === 1 ? pages : null}
                    mobile={!navigationBool}
                  />
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}
