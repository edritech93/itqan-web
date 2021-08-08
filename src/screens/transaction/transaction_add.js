import React, { useState, useEffect } from 'react';
import { Button, TextField, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ALERT_TYPE, TYPE_TRANSACTION } from '../../constants';
import { FormPicker } from '../../components';
import { API } from '../../helpers/api';

export default function TransactionAdd(props) {
    const classes = useStyles();
    const {userId} = props;

    const [loading, setLoading] = useState(false);
    const [transactionType, setTransactionType] = useState(null);
    const [amount, setAmount] = useState(null);
    const [remark, setRemark] = useState(null);

    const handleAdd = () => {
        if (userId && amount) {
            setLoading(true)
            const body = {
                userId: userId,
                transactionType: transactionType,
                amount: amount,
                remark: remark,
            }
            API.singleRequest(API.transactionAdd(body))
                .then(response => {
                    props.showAlert(response.data)
                    props.onClose()
                })
                .catch(error => props.showAlert(error))
                .finally(() => setLoading(false))
        } else {
            props.showAlert({
                message: 'Isi data dengan benar',
                type: ALERT_TYPE.ERROR
            })
        }
    }

    return (
        <Card className={classes.card}>
            <FormPicker
                title={'Type'}
                value={transactionType}
                data={TYPE_TRANSACTION}
                className={classes.form}
                onChange={(value) => setTransactionType(value)}
            />
            <TextField
                id="amount"
                label="Jumlah"
                variant="outlined"
                value={amount}
                className={classes.form}
                onChange={(event) => setAmount(event.target.value)}
            />
            <TextField
                id="remark"
                label="Keterangan"
                variant="outlined"
                value={remark}
                className={classes.form}
                onChange={(event) => setRemark(event.target.value)}
            />
            <Button
                variant={"contained"}
                color={"primary"}
                className={classes.form}
                onClick={handleAdd}>
                Simpan
            </Button>
            <Button
                variant={"contained"}
                color={"secondary"}
                onClick={() => props.onClose()}>
                Batal
            </Button>
        </Card>
    )
}

const useStyles = makeStyles({
    form: {
        marginBottom: 16,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        padding: 16
    }
});