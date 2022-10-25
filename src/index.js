import React from "react";
import App from "./App";
import ReactDOM from "react-dom";

const html = document.getElementsByTagName("html");
html[0].style.minHeight = "100%";

ReactDOM.render(<App />, document.getElementById("root"));
