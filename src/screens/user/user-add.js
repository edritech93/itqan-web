import React, {useState} from 'react';
import { Button, TextField, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { API } from '../../helpers/api';

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

export default function UserAdd(props) {
    const classes = useStyles();
    const [fullName, setFullName] = useState(null);
    const [address, setAddress] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    const handleAdd = () => {
        const body ={fullName, address, phoneNumber}
        API.singleRequest(API.userAdd(body))
        .then(response => {
            alert(response.data.message)
            props.onClose()
        })
        .catch(error => {})
    }

    return (
        <Card className={classes.card}>
            <TextField
                id="fullName"
                label="Nama Lengkap"
                variant="outlined"
                className={classes.form}
                onChange={(event) => setFullName(event.target.value)}
            />
            <TextField
                id="address"
                label="Alamat"
                variant="outlined"
                className={classes.form}
                onChange={(event) => setAddress(event.target.value)}
            />
            <TextField
                id="phoneNumber"
                label="Nomor. Hp"
                variant="outlined"
                className={classes.form}
                onChange={(event) => setPhoneNumber(event.target.value)}
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