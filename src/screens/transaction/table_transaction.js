import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import { Convert } from '../../helpers/convert';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.transactionCode}
              </TableCell>
              <TableCell align="center">{Convert.getTransactionType(row.transactionType)}</TableCell>
              <TableCell align="center">{Convert.getFormatMoney(row.amount)}</TableCell>
              <TableCell align="center">{Convert.dateTimeFormat(row.createdDate)}</TableCell>
              <TableCell align="right">{row.remark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
