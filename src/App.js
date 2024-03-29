import React, { createContext, useEffect, useState } from "react";
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
import { useFirebaseAuthentication } from "./utils";
import themes from "./utils/themes.json";
import { writeToSessionStorage, readFromSessionStorage } from "./utils/utils";

export const UserContext = createContext();

export default function App() {
    const { authUser, isAdmin } = useFirebaseAuthentication();
    const [themeName, setThemeName] = useState("");

    useEffect(() => {
        const readTheme = readFromSessionStorage("theme");
        if (readTheme) {
            setThemeName(readTheme);
        } else {
            setThemeName("Nikolai");
        }
    }, []);

    useEffect(() => {
        if (themeName === "Nikolai") {
            document.body.style.background = "radial-gradient(at top left, rgb(97, 40, 255) 0%, rgb(20, 0, 60) 100%)";
            document.body.style.backgroundRepeat = "no-repeat";
        } else {
            document.body.style.background = null;
            document.body.style.backgroundRepeat = "repeat";
        }
        writeToSessionStorage("theme", themeName);
    }, [themeName]);

    if (!themeName) {
        return <div></div>;
    }

    return (
        <UserContext.Provider value={{ authUser: authUser, isAdmin: isAdmin }}>
            <ThemeProvider theme={createTheme(themes[themeName])}>
                <CssBaseline />
                <BrowserRouter>
                    <Layout themeName={themeName} setThemeName={setThemeName}>
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
        </UserContext.Provider>
    );
}
