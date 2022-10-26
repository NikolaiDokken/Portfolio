import React, { useState } from "react";
import useFirebaseAuthentication from "../utils/useFirebaseAuth";
import { signInWithGoogle, signOutFromApp } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Box,
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
    Select,
    MenuItem,
    ListItemAvatar,
    useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { SubDivider } from "../components/Dividers";
import themes from "../utils/themes.json";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About Me", path: "/about" },
];

const drawerWidth = 250;

export default function Navbar({ themeName, setThemeName }) {
    const navigate = useNavigate();
    const authUser = useFirebaseAuthentication();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();

    const themeSelect = (
        <Select
            name="theme"
            size="small"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            sx={{ width: 1 }}
        >
            {Object.keys(themes).map((themeKey) => (
                <MenuItem key={themeKey} value={themeKey}>
                    {themeKey}
                </MenuItem>
            ))}
        </Select>
    );

    const drawer = (
        <Box sx={{ width: drawerWidth }}>
            <List>
                <ListItem disablePadding={!authUser} sx={{ pr: 0 }}>
                    {authUser ? (
                        <>
                            <ListItemAvatar>
                                <Avatar src={authUser.photoURL} alt={authUser.displayName} />
                            </ListItemAvatar>
                            <ListItemText primary={authUser.displayName} />
                            <IconButton onClick={signOutFromApp} size="large">
                                <LogoutIcon />
                            </IconButton>
                        </>
                    ) : (
                        <ListItemButton onClick={authUser ? signOutFromApp : signInWithGoogle}>
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText>Login</ListItemText>
                        </ListItemButton>
                    )}
                </ListItem>
                <ListItem>{themeSelect}</ListItem>
                <SubDivider />
                <Box onClick={() => setMobileOpen(!mobileOpen)}>
                    {navItems.map((item) => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton onClick={() => navigate(item.path)}>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </Box>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar component="nav" elevation={0} color="transparent" position="sticky">
                <Toolbar sx={{ px: 0, py: 1 }}>
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
                        {themeSelect}
                        {navItems.map((item) => (
                            <Button key={item.name} color="inherit" onClick={() => navigate(item.path)}>
                                {item.name}
                            </Button>
                        ))}
                        {authUser ? (
                            <Tooltip title="Sign out">
                                <Avatar
                                    src={authUser.photoURL}
                                    alt={authUser.displayName}
                                    onClick={signOutFromApp}
                                    sx={{ mx: 1, cursor: "pointer" }}
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
            <Box component={"nav"}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(!mobileOpen)}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{ "& .MuiDrawer-paper": { borderRight: "1px solid", borderColor: theme.palette.primary.main } }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
