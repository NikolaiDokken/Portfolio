import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Frontpage from "./views/Frontpage/Frontpage";
import Overview from "./views/Overview/Overview";
import Scrum from "./views/Scrum/Scrum";

export default function App() {
  const pages = [
    { component: Frontpage, name: "" },
    { component: Overview, name: "" },
    { component: Scrum, name: "Harmoni" }
  ];
  return (
    <div className="App">
      <ReactFullpage
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
