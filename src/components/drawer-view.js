import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { PeopleAlt, MonetizationOn, Info, ExitToApp, Dashboard } from '@material-ui/icons';
import { STORAGE } from '../actions/types';

const drawerWidth = 240;

const DATA_MENU_UP = [
  {
    text: 'Beranda',
    icon: <Dashboard />,
    push: '/dashboard'
  },
  {
    text: 'Nasabah',
    icon: <PeopleAlt />,
    push: '/user'
  },
  {
    text: 'Transaksi',
    icon: <MonetizationOn />,
    push: '/transaction'
  },
]

const DATA_MENU_DOWN = [
  {
    text: 'Tentang',
    icon: <Info />,
    push: null
  },
  {
    text: 'Logout',
    icon: <ExitToApp />,
    push: '/'
  },
]

export default function DrawerView(props) {
  const classes = useStyles();
  const { children } = props;
  const [title, setTitle] = useState(DATA_MENU_UP[0].text);

  function _handleMenuUp(item) {
    setTitle(item.text)
    props.history.push(item.push);
  }

  function _handleMenuDown(item) {
    if (item.push) {
      if (item.push === '/') {
        localStorage.removeItem(STORAGE.TOKEN)
      }
      props.history.push(item.push);
    }
  }

  function _getTitle() {

  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>{title}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left">
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {DATA_MENU_UP.map((item, index) => (
            <ListItem button key={index} onClick={() => _handleMenuUp(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {DATA_MENU_DOWN.map((item, index) => (
            <ListItem button key={index} onClick={() => _handleMenuDown(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));