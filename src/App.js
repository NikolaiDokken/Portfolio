import React from "react";
import Home from "./pages/Home";
import Projects from "./pages/projects";
import { Routes, Route, HashRouter } from "react-router-dom";
import NewProject from "./pages/NewProject";
import NewExperience from "./pages/NewExperience";
import Admin from "./pages/Admin";
import About from "./pages/about";
import Layout from "./components/Layout";
import ProjectDetails from "./pages/ProjectDetails";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useIsAdmin } from "./utils";

export default function App() {
    const isAdmin = useIsAdmin();

    const theme = createTheme({
        palette: {
            mode: "dark",
            primary: { main: "#00FFFF" },
        },
        typography: {
            fontFamily: ['"Ubuntu"', "sans-serif"].join(","),
            h2: { fontSize: "3rem" },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<ProjectDetails />} />
                        <Route path="/about" element={<About />} />
                        {isAdmin && (
                            <>
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/admin/new-project" element={<NewProject />} />
                                <Route path="/admin/edit-project/:id" element={<NewProject />} />
                                <Route path="/admin/new-experience" element={<NewExperience />} />
                                <Route path="/admin/edit-experience/:id" element={<NewExperience />} />
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
            </HashRouter>
        </ThemeProvider>
    );
}
