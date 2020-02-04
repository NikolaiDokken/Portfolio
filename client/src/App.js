import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ReactFullpage from "@fullpage/react-fullpage";
import Frontpage from "./views/Frontpage/Frontpage";
import Overview from "./views/Overview/Overview";
import Scrum from "./views/Scrum/Scrum";
import MailIcon from "@material-ui/icons/Mail";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function App() {
  const pages = [
    { component: Frontpage, name: "" },
    { component: Overview, name: "" },
    { component: Scrum, name: "Harmoni" }
  ];
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="App" style={{ marginLeft: "65px" }}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerOpen}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {pages.map((page, index) => {
            if (index !== 1 && index !== 0) {
              return (
                <ListItem button key={index}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItem>
              );
            } else return null;
          })}
        </List>
      </Drawer>
      <ReactFullpage
        scrollOverflow={true}
        sectionsColor={["white", "#313131", "black", "beige"]}
        render={({ state, fullpageApi }) => {
          function changePage(pageNr) {
            fullpageApi.moveTo(pageNr, 0);
          }
          return (
            <div id="fullpage-wrapper">
              {pages.map((Page, index) => (
                <div className="section" key={index}>
                  <Page.component
                    changePage={changePage}
                    pages={index === 1 ? pages : null}
                  />
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}
