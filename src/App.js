import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Projects from "./pages/projects";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NewProject from "./pages/NewProject";
import NewExperience from "./pages/NewExperience";
import Admin from "./pages/Admin";
import About from "./pages/about";
import Layout from "./components/Layout";
import ProjectDetails from "./pages/project-details";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useIsAdmin } from "./utils";
import themes from "./utils/themes.json";
import { writeToSessionStorage, readFromSessionStorage } from "./utils/utils";

export default function App() {
    const isAdmin = useIsAdmin();
    const [theme, setTheme] = useState("");

    useEffect(() => {
        const readTheme = readFromSessionStorage("theme");
        if (readTheme) {
            setTheme(readTheme);
        } else {
            setTheme("Nikolai");
        }
    }, []);

    useEffect(() => {
        if (theme === "Nikolai") {
            document.body.style.background = "radial-gradient(at top left, rgb(97, 40, 255) 0%, rgb(20, 0, 60) 100%)";
            document.body.style.backgroundRepeat = "no-repeat";
        } else {
            document.body.style.background = null;
            document.body.style.backgroundRepeat = "repeat";
        }
        writeToSessionStorage("theme", theme);
    }, [theme]);

    if (!theme) {
        return <div></div>;
    }

    return (
        <ThemeProvider theme={createTheme(themes[theme])}>
            <CssBaseline />
            <BrowserRouter>
                <Layout theme={theme} setTheme={setTheme}>
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
            </BrowserRouter>
        </ThemeProvider>
    );
}
