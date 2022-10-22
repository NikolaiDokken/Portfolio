import React, { useState } from "react";
// import "../styles/global.css";
import useFirebaseAuthentication from "../utils/useFirebaseAuth";
import { signInWithGoogle, signOutFromApp } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Drawer,
    Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About Me", path: "/about" },
];

export default function Navbar() {
    const navigate = useNavigate();
    const authUser = useFirebaseAuthentication();
    const [mobileOpen, setMobileOpen] = useState(false);

    const drawer = (
        <Box onClick={() => setMobileOpen(!mobileOpen)}>
            <IconButton size="large">
                <CloseIcon sx={{ m: 1 }} />
            </IconButton>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton sx={{ textAlign: "center" }} onClick={() => navigate(item.path)}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar component="nav" elevation={0} color="transparent" position="sticky">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        sx={{ display: { md: "none" } }}
                    >
                        <MenuIcon sx={{ m: 1 }} />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        {navItems.map((item) => (
                            <Button key={item} color="inherit" onClick={() => navigate(item.path)}>
                                {item.name}
                            </Button>
                        ))}
                        {authUser ? (
                            <Tooltip title="Sign out">
                                <Avatar
                                    src={authUser.photoURL}
                                    onClick={signOutFromApp}
                                    sx={{ ml: 2, cursor: "pointer" }}
                                />
                            </Tooltip>
                        ) : (
                            <Button color="inherit" onClick={signInWithGoogle}>
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(!mobileOpen)}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 1 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
