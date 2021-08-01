import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, Button } from '@material-ui/core';
import { ACTION_ITEM, TYPE_TRANSACTION } from '../../constants';

export default function ItemTransaction(props) {
    const { item, onPress } = props;
    const classes = useStyles();

    return (
        <Card className={classes.container}>
            <div className={classes.wrapColumn}>
                <Typography variant="h5">
                    {item.amount}
                </Typography>
                <Typography variant="h8">
                    {item.createdDate}
                </Typography>
                <Typography variant="h8">
                    {TYPE_TRANSACTION[item.transactionType].text}
                </Typography>
            </div>
            <div>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    className={classes.btnEdit}
                    onClick={() => onPress(item, ACTION_ITEM.EDIT)}>
                    Ubah
                </Button>
                <Button
                    variant={"contained"}
                    color={"secondary"}
                    onClick={() => onPress(item, ACTION_ITEM.DELETE)}>
                    Hapus
                </Button>
            </div>
        </Card>
    );
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flex: 1,
        marginBottom: 16,
        padding: 16
    },
    wrapColumn: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    btnEdit: {
        marginRight: 16,
    }
});
