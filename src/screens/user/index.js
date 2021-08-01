import React, { useState, useEffect } from 'react';
import ItemUser from './item-user';
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { API } from '../../helpers/api';
import UserAdd from './user-add';

const useStyles = makeStyles({
    form: {
        marginBottom: 16,
    }
});

export default function User(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [isShowAdd, setIsShowAdd] = useState(false);

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

    return (
        <div className="container">
            {isShowAdd ? (
                <UserAdd onClose={() => setIsShowAdd(!isShowAdd)}/>
            ) : (
                <Button
                    variant={"contained"}
                    color={"primary"}
                    className={classes.form}
                    onClick={() => setIsShowAdd(!isShowAdd)}>
                    Tambah
                </Button>
            )}
            {dataUser.map((item) => {
                return <ItemUser item={item} />
            })}
        </div>
    );
}
