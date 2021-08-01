import './css/index.css'
import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    form: {
        marginBottom: 16,
    }
});

export default function Home(props) {
    const classes = useStyles();

    const handleUser = () => {
        props.history.push('/user');
    }

    const handleTransaction = () => {
        props.history.push('/transaction');
    }

    const handleReport = () => {
        props.history.push('/report');
    }

    return (
        <div className="container">
            <Button
                variant={"contained"}
                color={"primary"}
                className={classes.form}
                onClick={handleUser}>
                User
            </Button>
            <Button
                variant={"contained"}
                color={"primary"}
                className={classes.form}
                onClick={handleTransaction}>
                Transaksi
            </Button>
            <Button
                variant={"contained"}
                color={"primary"}
                onClick={handleReport}>
                Laporan
            </Button>
        </div>
    )
}