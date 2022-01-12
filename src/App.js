import React from "react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NewProject from "./pages/NewProject";
import NewExperience from "./pages/NewExperience";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Layout from "./components/Layout";
import ProjectDetails from "./pages/ProjectDetails";
import AdminLogin from "./pages/AdminLogin";
import useFirebaseAuthentication from "./utils/useFirebaseAuth";

export default function App() {
    const authUser = useFirebaseAuthentication();
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<AdminLogin />} />
                    {authUser && (
                        <>
                            <Route path="/admin" element={<Admin />} />
                            <Route
                                path="/admin/new-project"
                                element={<NewProject />}
                            />
                            <Route
                                path="/admin/edit-project/:id"
                                element={<NewProject />}
                            />
                            <Route
                                path="/admin/new-experience"
                                element={<NewExperience />}
                            />
                            <Route
                                path="/admin/edit-experience/:id"
                                element={<NewExperience />}
                            />
                        </>
                    )}
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
