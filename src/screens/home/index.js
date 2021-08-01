import './css/index.css'
import React from 'react';
import { Button, TextField, Card } from '@material-ui/core';

export default function Home(props) {
    const handleUser = () => {

    }

    const handleTransaction = () => {
        props.history.push('/transaction');
    }

    const handleReport = () => {

    }

    return (
        <div className="container">
            <Button variant={"contained"} color={"primary"}
                className={"margin-bottom"}
                onClick={handleUser}>
                User
            </Button>
            <Button variant={"contained"} color={"primary"}
                className={"margin-bottom"}
                onClick={handleTransaction}>
                Transaksi
            </Button>
            <Button variant={"contained"} color={"primary"}
                onClick={handleReport}>
                Laporan
            </Button>
        </div>
    )
}