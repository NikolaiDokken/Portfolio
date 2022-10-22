import React from "react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { Routes, Route, HashRouter } from "react-router-dom";
import NewProject from "./pages/NewProject";
import NewExperience from "./pages/NewExperience";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Layout from "./components/Layout";
import ProjectDetails from "./pages/ProjectDetails";
import useFirebaseAuthentication from "./utils/useFirebaseAuth";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

export default function App() {
    const authUser = useFirebaseAuthentication();

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
                        {authUser && (
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
