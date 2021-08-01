import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ACTION_ITEM } from '../../constants';
import { Loader } from '../../components';
import { API } from '../../helpers/api';
import ItemUser from './item-user';
import UserAdd from './user-add';

export default function User(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [dataUser, setDataUser] = useState([]);
    const [isShowAdd, setIsShowAdd] = useState(false);
    const [userDetail, setUserDetail] = useState(null);

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

    function _onCloseUserAdd() {
        _loadUser();
        setIsShowAdd(false)
        setUserDetail(null)
    }

    function _handleAction(item, action) {
        if (action === ACTION_ITEM.EDIT) {
            setIsShowAdd(true)
            setUserDetail(item)
        } else if (action === ACTION_ITEM.DELETE) {
            setLoading(true)
            const body = { userId: item._id }
            API.singleRequest(API.userDelete(body))
                .then(response => {
                    props.showAlert(response.data)
                    _loadUser()
                })
                .catch(error => props.showAlert(error))
                .finally(() => setLoading(false))
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapList}>
                {dataUser.map((item, index) => {
                    return (
                        <ItemUser
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
                    <UserAdd detail={userDetail} onClose={() => _onCloseUserAdd()} />
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