import React from "react";
import {
  Typography,
  Toolbar,
  IconButton,
  AppBar,
  Badge,
  InputBase,
} from "@material-ui/core";
import {
  // AccountCircle,
  // Notifications as NotificationsIcon,
  // Mail as MailIcon,
  Menu as MenuIcon,
  // Search as SearchIcon,
  CloudUpload,
  Description,
  GitHub,
  DeviceHub,
} from "@material-ui/icons";

import { useStyles } from "./style";

interface Props {
  menuId: string;
  handleDrawerToggle: () => void;
  onProfileMenuOpen: (e: React.MouseEvent<HTMLElement>) => void;
}

export function TopBar(props: Props) {
  const classes = useStyles();
  const { menuId, onProfileMenuOpen, handleDrawerToggle } = props;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          A Survey on Visualization-based Storytelling in Digital Humanities and
          Cultural Heritage
        </Typography>

        <div className={classes.sectionDesktop}>
          <IconButton
            edge="end"
            aria-label="link to the design space"
            aria-haspopup="true"
            onClick={() => open("/assets/Storytelling-Design-Space.png")}
            color="inherit"
          >
            <DeviceHub />{" "}
            <span style={{ fontSize: "12px" }} className={classes.iconName}>
              {" "}
              Design Space{" "}
            </span>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="link to github homepage"
            aria-haspopup="true"
            onClick={() =>
              window.open("https://github.com/InTaVia/InTaVia.github.io")
            }
            color="inherit"
          >
            <GitHub />{" "}
            <span style={{ fontSize: "12px" }} className={classes.iconName}>
              {" "}
              Github{" "}
            </span>
          </IconButton>
          {/* <IconButton
            edge="end"
            aria-label="suggest new VBS examples and tools for this survey"
            aria-haspopup="true"
            onClick={() =>
              window.open(
                "https://github.com/ML4VIS/ML4VIS.github.io/issues/new?assignees=&labels=enhancement&template=suggest-new-ml4vis-papers.md&title=Suggest+Paper%3A+%5Bpaper+title%5D"
              )
            }
            color="inherit"
          >
            <CloudUpload />{" "}
            <span style={{ fontSize: "12px" }} className={classes.iconName}>
              {" "}
              Contribute{" "}
            </span>
          </IconButton> */}
        </div>
      </Toolbar>
    </AppBar>
  );
}
