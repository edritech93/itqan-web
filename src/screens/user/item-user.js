import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginBottom: 16,
    },
});

export default function ItemUser(props) {
    const { item, onPress } = props;
    const classes = useStyles();

    return (
        <Card className={classes.container}>
            <Typography variant="h5">
                {item.fullName}
            </Typography>
            <Typography variant="h8">
                {item.address}
            </Typography>
            <Typography variant="h8">
                {item.phoneNumber}
            </Typography>
        </Card>
    );
}
