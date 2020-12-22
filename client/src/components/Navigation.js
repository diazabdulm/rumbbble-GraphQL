import { Fragment } from "react";
import {
  makeStyles,
  Avatar,
  Button,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  HomeRounded,
  ChatOutlined,
  ChromeReaderModeOutlined,
  SearchOutlined,
} from "@material-ui/icons";

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
    height: "auto",
    marginBottom: theme.spacing(1.4),
  },
  username: {
    fontWeight: 700,
    fontSize: "2rem",
    lineHeight: "1.5rem",
    letterSpacing: "-0.005em",
    marginBottom: theme.spacing(1.2),
  },
  githubHandle: {
    fontWeight: 600,
    fontSize: "1.3rem",
    lineHeight: "1.1rem",
    letterSpacing: "0.01em",
    marginBottom: theme.spacing(3.4),
  },
  menu: {
    marginBottom: theme.spacing(2.6),
  },
  menuItem: {
    padding: theme.spacing(0.9),
    margin: theme.spacing(0.8, 0),
    "&:first-child": {
      marginTop: 0,
    },
    "&:last-child": {
      marginBottom: 0,
    },
    "&:hover": {
      borderRadius: "0.4rem",
    },
  },
  menuItemIconContainer: {
    minWidth: "3.4rem",
    minHeight: "2.4rem",
    display: "flex",
    alignItems: "center",
  },
  menuItemIcon: {
    fontSize: "2rem",
  },
  menuItemSelected: {
    borderRadius: "0.4rem",
  },
  menuItemTextContainer: {
    margin: 0,
  },
  menuItemTextPrimary: {
    fontWeight: 600,
    fontSize: "1.6rem",
    lineHeight: "1.2rem",
    letterSpacing: "0.0035em",
  },
  button: {
    fontWeight: 700,
    fontSize: "1.2rem",
    letterSpacing: "0.02em",
    padding: "1.6rem 4.5rem",
    lineHeight: "1.1rem",
  },
  logoContainer: {
    marginTop: "auto",
  },
}));

function Navigation() {
  const classes = useStyles();

  const drawer = (
    <Fragment>
      <Avatar alt="" src={avatarPlaceholder} className={classes.avatar} />
      <Typography variant="h6" color="textPrimary" className={classes.username}>
        Your Username
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        className={classes.githubHandle}
      >
        @yourgithubhandle
      </Typography>
      <List disablePadding className={classes.menu}>
        <ListItem
          button
          selected={true}
          className={classes.menuItem}
          classes={{ selected: classes.menuItemSelected }}
        >
          <ListItemIcon className={classes.menuItemIconContainer}>
            <HomeRounded className={classes.menuItemIcon} />
          </ListItemIcon>
          <ListItemText
            primary="Home Feed"
            className={classes.menuItemTextContainer}
            primaryTypographyProps={{ className: classes.menuItemTextPrimary }}
          />
        </ListItem>
        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIconContainer}>
            <ChatOutlined className={classes.menuItemIcon} />
          </ListItemIcon>
          <ListItemText
            primary="Messages"
            className={classes.menuItemTextContainer}
            primaryTypographyProps={{ className: classes.menuItemTextPrimary }}
          />
        </ListItem>
        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIconContainer}>
            <ChromeReaderModeOutlined className={classes.menuItemIcon} />
          </ListItemIcon>
          <ListItemText
            primary="Articles"
            className={classes.menuItemTextContainer}
            primaryTypographyProps={{ className: classes.menuItemTextPrimary }}
          />
        </ListItem>
        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIconContainer}>
            <SearchOutlined className={classes.menuItemIcon} />
          </ListItemIcon>
          <ListItemText
            primary="Search"
            className={classes.menuItemTextContainer}
            primaryTypographyProps={{ className: classes.menuItemTextPrimary }}
          />
        </ListItem>
      </List>
      <Button
        fullWidth
        disableElevation
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Create Post
      </Button>
      <List disablePadding className={classes.logoContainer}>
        <ListItem disableGutters>
          <ListItemAvatar>
            <Avatar>R</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="rumbbble"
            className={classes.menuItemTextContainer}
            primaryTypographyProps={{ className: classes.menuItemTextPrimary }}
          />
        </ListItem>
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
