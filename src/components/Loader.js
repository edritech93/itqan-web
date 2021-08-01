import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Loader(props) {
    const { visible } = props;
    const classes = useStyles();
    if (visible) {
        return (
            <div className={classes.container}>
                <CircularProgress />
            </div>
        )
    } else {
        return null;
    }
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        position: 'absolute',
        justifyItems: 'center',
        alignItems: 'center'
    },
});