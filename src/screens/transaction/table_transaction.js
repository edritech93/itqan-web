import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import { Convert } from '../../helpers/convert';

export default function TableTransaction(props) {
  const classes = useStyles();
  const {data} = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Kode Transaksi</TableCell>
            <TableCell align="center">Jenis Transaksi</TableCell>
            <TableCell align="center">Total&nbsp;(Rp)</TableCell>
            <TableCell align="center">Tanggal</TableCell>
            <TableCell align="right">Keterangan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">{item.transactionCode}</TableCell>
              <TableCell align="center">{Convert.getTransactionType(item.transactionType)}</TableCell>
              <TableCell align="center">{Convert.getFormatMoney(item.amount)}</TableCell>
              <TableCell align="center">{Convert.dateTimeFormat(item.createdDate)}</TableCell>
              <TableCell align="right">{item.remark}</TableCell>
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
});