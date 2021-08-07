import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Loader, FormPicker } from '../../components';
import { ALL_DATA, TYPE_TRANSACTION } from '../../constants';
import { API } from '../../helpers/api';
import TableTransaction from './table_transaction';
import TransactionAdd from './transaction_add';

const FILTER_TYPE = [ALL_DATA, ...TYPE_TRANSACTION]

export default function Transaction(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [dataTransaction, setDataTransaction] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [userId, setUserId] = useState(null);
    const [selectType, setSelectType] = useState(FILTER_TYPE[0].id);
    const [totalSaldo, setTotalSaldo] = useState(0);
    const [isShowAdd, setIsShowAdd] = useState(false);

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
    }, [userId, selectType])

    function _loadTransaction() {
        setLoading(true)
        const body = { userId: userId, transactionType: selectType }
        const bodyTotal = {userId: userId}
        const apiCalls = [
            API.transactionGet(body),
            API.transactionTotalGetByUserId(bodyTotal)
        ]
        API.requestMultiple(apiCalls)
            .then(response => {
                setDataTransaction(response[0].data)
                setTotalSaldo(response[1].data.totalAmount)
            })
            .catch(error => props.showAlert(error))
            .finally(() => setLoading(false))
    }

    function _onCloseUserAdd() {
        _loadTransaction();
        setIsShowAdd(false)
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapList}>
                <div className={classes.wrapPicker}>
                    <FormPicker
                        title={'User'}
                        value={userId}
                        data={dataUser}
                        className={classes.formUser}
                        onChange={(value) => setUserId(value)}
                    />
                    <FormPicker
                        title={'Jenis Transaksi'}
                        value={selectType}
                        data={FILTER_TYPE}
                        className={classes.formUser}
                        onChange={(value) => setSelectType(value)}
                    />
                    <h1 className={classes.formUser}>{`Total Saldo: ${totalSaldo}`}</h1>
                </div>
                <TableTransaction data={dataTransaction} />
                <Loader visible={loading} />
            </div>
            <div className={classes.wrapForm}>
                {isShowAdd ? (
                    <TransactionAdd userId={userId} onClose={() => _onCloseUserAdd()} showAlert={props.showAlert} />
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
    wrapPicker: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        marginBottom: 16,
    },
    formUser: {
        width: '100%',
        marginRight: 16,
    },
    wrapForm: {
        height: '100%',
    }
});