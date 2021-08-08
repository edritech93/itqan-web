import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ALERT_TYPE } from '../constants';
import { Alert } from '@material-ui/lab';

export default function AlertView(props) {
  const classes = useStyles();
  const { message = null, type = ALERT_TYPE.SUCCESS } = props;
  if (message) {
    return (
      <div className={classes.root}>
        <Alert severity={type}>{message}</Alert>
      </div>
    );
  } else {
    return null
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '70vw',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    bottom: 16
  },
}));