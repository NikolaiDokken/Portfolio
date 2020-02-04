import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Frontpage from "./views/Frontpage/Frontpage";
import Overview from "./views/Overview/Overview";
import Scrum from "./views/Scrum/Scrum";

export default function App() {
  const pages = [
    { component: Frontpage, name: "Frontpage" },
    { component: Overview, name: "Projects" },
    { component: Scrum, name: "Harmoni" }
  ];

  return (
    <div className="App">
      <ReactFullpage
        navigation={true}
        navigationPosition="left"
        navigationTooltips={pages.map(page => page.name)}
        showActiveTooltip={true}
        scrollOverflow={true}
        sectionsColor={["white", "#313131", "black", "beige"]}
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
