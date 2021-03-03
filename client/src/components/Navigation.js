import { Fragment } from "react";
import {
  makeStyles,
  Avatar,
  Button,
  Drawer,
  Hidden,
  List,
  ListItem,
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
      flexShrink: 0,
      width: drawerWidth,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: "transparent",
    borderRight: "none",
    padding: theme.spacing(2.8),
  },
  avatar: {
    height: "auto",
    width: theme.spacing(5.3),
    marginBottom: theme.spacing(1.4),
  },
  username: {
    fontWeight: 700,
  },
  githubHandle: {
    fontWeight: 600,
    fontSize: "1.3rem",
    lineHeight: "1.1rem",
  },
  menu: {
    margin: "3rem 0 1rem",
  },
  menuItem: {
    padding: theme.spacing(0.9),
    margin: theme.spacing(0.8, 0),
    borderRadius: "0.4rem",
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

  const renderHeader = (
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
    </Fragment>
  );

  const renderMenuItems = [].map(() => (
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
  ));

  const drawer = (
    <Fragment>
      <List disablePadding className={classes.menu}>
        <ListItem
          button
          selected
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
    </Fragment>
  );

  const renderFooter = (
    <div>
      <Avatar>R</Avatar>
      <Typography>rumbbble</Typography>
    </div>
  )

  return (
    <nav aria-label="global navigation" className={classes.drawer}>
      <Hidden xsDown>
        <Drawer
          open
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          {renderHeader}
          {drawer}
          {renderFooter}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Navigation;
