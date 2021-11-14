import React from "react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewProject from "./pages/NewProject";
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
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/new-project" element={<NewProject />} />
                    <Route
                        path="/admin/edit-project/:id"
                        element={<NewProject />}
                    />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's nothing here!</p>
                            </main>
                        }
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
