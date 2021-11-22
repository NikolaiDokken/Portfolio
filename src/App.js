import React from "react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewProject from "./pages/NewProject";
import Admin from "./pages/Admin";
import Layout from "./components/Layout";
import ProjectDetails from "./pages/ProjectDetails";
import AdminLogin from "./pages/AdminLogin";
import { auth } from "./utils/firebase";

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    {auth.currentUser && (
                        <Route path="/admin" element={<Admin />} />
                    )}
                    <Route path="/login" element={<AdminLogin />} />
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
