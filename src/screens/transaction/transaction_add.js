import React, { useState, useEffect } from 'react';
import { Button, TextField, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { FormPicker } from '../../components';
import { API } from '../../helpers/api';

const TYPE_TRANSACTION = [
    {
        id: 0,
        text: 'Setoran'
    },
    {
        id: 1,
        text: 'Penarikan'
    },
]

export default function TransactionAdd(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [userId, setUserId] = useState(null);
    const [transactionType, setTransactionType] = useState(null);
    const [amount, setAmount] = useState(null);
    const [remark, setRemark] = useState(null);

    useEffect(() => {
        _loadUser();
    }, [])

    function _loadUser() {
        setLoading(true)
        API.singleRequest(API.userGet())
            .then(response => {
                const arrayUser = response.data.map((item) => {
                    return ({
                        id: item._id,
                        text: item.fullName
                    })
                })
                setDataUser(arrayUser)
            })
            .catch(error => props.showAlert(error))
            .finally(() => setLoading(false))
    }

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
                    alert(response.data.message)
                    props.onClose()
                })
                .catch(error => props.showAlert(error))
                .finally(() => setLoading(false))
        } else {
            alert('Isi data dengan benar')
        }
    }

    return (
        <Card className={classes.card}>
            <FormPicker
                title={'User'}
                value={userId}
                data={dataUser}
                className={classes.form}
                onChange={(value) => setUserId(value)}
            />
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