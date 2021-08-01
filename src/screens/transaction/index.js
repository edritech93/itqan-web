import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ACTION_ITEM } from '../../constants';
import { Loader, FormPicker } from '../../components';
import { API } from '../../helpers/api';
import ItemTransaction from './item_transaction';
import TransactionAdd from './transaction_add';

export default function Transaction(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [dataTransaction, setDataTransaction] = useState([]);
    const [isShowAdd, setIsShowAdd] = useState(false);

    const [dataUser, setDataUser] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        _loadTransaction();
    }, [])

    useEffect(() => {
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
        _loadUser();
    }, [])

    useEffect(() => {
        if (userId) {
            _loadTransaction()
        }
    }, [userId])

    function _loadTransaction() {
        setLoading(true)
        const body = {userId: userId}
        API.singleRequest(API.transactionGet(body))
            .then(response => setDataTransaction(response.data))
            .catch(error => props.showAlert(error))
            .finally(() => setLoading(false))
    }

    function _onCloseUserAdd() {
        _loadTransaction();
        setIsShowAdd(false)
    }

    function _handleAction(item, action) {
        if (action === ACTION_ITEM.DELETE) {
            setLoading(true)
            const body = { userId: item._id }
            API.singleRequest(API.userDelete(body))
                .then(response => {
                    props.showAlert(response.data)
                    _loadTransaction()
                })
                .catch(error => props.showAlert(error))
                .finally(() => setLoading(false))
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapList}>
                <FormPicker
                    title={'User'}
                    value={userId}
                    data={dataUser}
                    className={classes.form}
                    onChange={(value) => setUserId(value)}
                />
                {dataTransaction.map((item, index) => {
                    return (
                        <ItemTransaction
                            item={item}
                            key={index}
                            onPress={(item, action) => _handleAction(item, action)}
                        />
                    )
                })}
                <Loader visible={loading} />
            </div>
            <div className={classes.wrapForm}>
                {isShowAdd ? (
                    <TransactionAdd onClose={() => _onCloseUserAdd()} showAlert={props.showAlert} />
                ) : (
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => setIsShowAdd(true)}>
                        Tambah
                    </Button>
                )}
            </div>
        </div>
    );
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flex: 1,
        padding: 16
    },
    wrapList: {
        display: 'flex',
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        marginRight: 16,
    },
    form: {
        marginBottom: 16,
    },
    wrapForm: {
        height: '100%',
    }
});