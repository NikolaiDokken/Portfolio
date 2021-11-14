import React from "react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Layout from "./components/Layout";
import ProjectDetails from "./pages/ProjectDetails";

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route
                        path="/projects/:slug"
                        element={<ProjectDetails />}
                    />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
