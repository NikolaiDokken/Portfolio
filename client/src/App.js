import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Frontpage from "./views/Frontpage/Frontpage";
import Overview from "./views/Overview/Overview";
import Scrum from "./views/Scrum/Scrum";
import "./overrides.css";

export default function App() {
  const pages = [
    { component: Frontpage, name: "Frontpage", color: "white" },
    { component: Overview, name: "Projects", color: "#313131" },
    { component: Scrum, name: "Harmoni", color: "black" }
  ];

  return (
    <div className="App">
      <ReactFullpage
        navigation={true}
        navigationPosition="left"
        navigationTooltips={pages.map(page => page.name)}
        scrollOverflow={true}
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
