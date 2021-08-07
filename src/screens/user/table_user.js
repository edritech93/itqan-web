import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { ACTION_ITEM } from '../../constants';

export default function TableUser(props) {
    const classes = useStyles();
    const { data, onPress } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">No.</TableCell>
                        <TableCell align="center">Nama Lengkap</TableCell>
                        <TableCell align="center">Nomor Telepon</TableCell>
                        <TableCell align="center">Alamat</TableCell>
                        <TableCell align="center">Aksi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{item.fullName}</TableCell>
                            <TableCell align="center">{item.phoneNumber}</TableCell>
                            <TableCell align="center">{item.address}</TableCell>
                            <TableCell align="center">
                                <div>
                                    <Button
                                        variant={"contained"}
                                        color={"primary"}
                                        className={classes.btnEdit}
                                        onClick={() => onPress(item, ACTION_ITEM.EDIT)}>
                                        Ubah
                                    </Button>
                                    <Button
                                        variant={"contained"}
                                        color={"secondary"}
                                        onClick={() => onPress(item, ACTION_ITEM.DELETE)}>
                                        Hapus
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    btnEdit: {
        marginRight: 16,
    }
});
