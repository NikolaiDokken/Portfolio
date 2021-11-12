import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/" element={<Projects />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);
