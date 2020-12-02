import { Fragment } from "react";
import {
  makeStyles,
  Avatar,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  TypoItemText,graphy,
} from "@material-ui/core";

const drawerWidth = "24.4rem";
const avatarPlaceholder = "https://identicons.github.com/diazabdulm.png";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: "transparent",
    borderRight: "none",
    padding: theme.spacing(2.8),
  },
  avatar: {
    width: theme.spacing(5.3),
    height: theme.spacing(5.3),
    marginBottom: theme.spacing(1.4),
  },
  username: {
    fontWeight: 600,
    fontSize: "2rem",
    lineHeight: "1.5rem",
    letterSpacing: "-0.005em",
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1.2),
  },
  githubHandle: {
    fontWeight: 500,
    fontSize: "1.4rem",
    lineHeight: "1.1rem",
    letterSpacing: "-0.015em",
    marginBottom: theme.spacing(3.4),
  },
}));

function Navigation() {
  const classes = useStyles();

  const drawer = (
    <Fragment>
      <Avatar alt="" src={avatarPlaceholder} className={classes.avatar} />
      <Typography variant="h6" className={classes.username}>
        Your Username
      </Typography>
      <Typography variant="subtitle1" className={classes.githubHandle}>
        @yourgithubhandle
      </Typography>
      <List>
      </List>
    </Fragment>
  );

  return (
    <nav aria-label="global navigation" className={classes.drawer}>
      <Hidden xsDown>
        <Drawer
          open
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Navigation;
export default Navigation;
