import React from 'react';
import logo from '../../assets/tjc_logo_english.png';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function ElevationScroll(props: any) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // grow: {
    //     flexGrow: 1,
    // },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'inline',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      color: 'white',
    },
    logo: { height: '2em' },
    routerButtonGroup: {
      marginLeft: 'auto',
    },
    routerButtons: {
      color: 'white',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbarMargin: {
      ...theme.mixins.toolbar,
    },
    titleContainer: {},
  }),
);

export const Header = (props: any) => {
  const classes = useStyles();
  return (
    <>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar className={classes.toolbarMargin}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Button
              component={Link}
              to="/home"
              className={classes.titleContainer}
              disableRipple
            >
              <Typography className={classes.title} variant="h6" noWrap>
                TJC Scheduling Platform
              </Typography>
            </Button>

            <div className={classes.routerButtonGroup}>
              <Button component={Link} to="/members" className={classes.routerButtons}>
                Manage Workers
              </Button>
              <Button component={Link} to="/teams" className={classes.routerButtons}>
                Manage Teams
              </Button>
            </div>
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                // aria-controls={mobileMenuId}
                aria-haspopup="true"
                // onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};
