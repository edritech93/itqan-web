import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ACTION_ITEM } from '../../constants';
import { Loader } from '../../components';
import { API } from '../../helpers/api';
import ItemTransaction from './item_transaction';
import TransactionAdd from './transaction_add';

export default function Transaction(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [dataTransaction, setDataTransaction] = useState([]);
    const [isShowAdd, setIsShowAdd] = useState(false);

    useEffect(() => {
        _loadTransaction();
    }, [])

    function _loadTransaction() {
        setLoading(true)
        API.singleRequest(API.transactionGet())
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