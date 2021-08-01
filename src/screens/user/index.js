import React, { useState, useEffect } from 'react';
import ItemUser from './item-user';
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { API } from '../../helpers/api';

const useStyles = makeStyles({
    form: {
        marginBottom: 16,
    }
});

export default function User(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        _loadUser();
    }, [])

    function _loadUser() {
        setLoading(true)
        API.singleRequest(API.userGet())
            .then(response => setDataUser(response.data))
            .catch(error => props.showAlert(error))
            .finally(() => setLoading(false))
    }

    const handleAdd  = () => {

    }

    return (
        <div className="container">
            <Button
                variant={"contained"}
                color={"primary"}
                className={classes.form}
                onClick={handleAdd}>
                Tambah
            </Button>
            {dataUser.map((item) => {
                return <ItemUser item={item} />
            })}
        </div>
    );
}
