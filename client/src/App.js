import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Frontpage from "./views/Frontpage/Frontpage";
import Overview from "./views/Overview/Overview";

export default function App() {
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
              <div className="section">
                <Frontpage />
              </div>
              <div className="section">
                <Overview changePage={changePage} />
              </div>
              <div className="section">
                <div className="slide">
                  <h3>Slide 2.1</h3>
                </div>
                <div className="slide">
                  <h3>Slide 2.2</h3>
                </div>
                <div className="slide">
                  <h3>Slide 2.3</h3>
                </div>
              </div>
              <div className="section section2">
                <h3>Section 3</h3>
                <button onClick={() => changePage(1)}>Move to top</button>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
