import React, { useState, useEffect } from 'react';
import { Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TextField, MenuItem, Typography } from '@mui/material';
import { Navbar } from './Navbar'
import {useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../features/userSlice';
export const HomePage = () => {
  const dispatch= useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('SUCCESS');
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const { isLightMode, searchQuery } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('http://localhost:8000/api/transactions');
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data);
    };
    fetchTransactions();
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);

  const handleFilter = () => {
    let filtered = transactions;

    if (statusFilter != 'ALL') {
      filtered = filtered.filter(txn => txn.status === statusFilter);
    } else if (statusFilter == 'ALL') {
      filtered = transactions;
    }

    if (dateFilter.start && dateFilter.end) {
      filtered = filtered.filter(txn => {
        const txnDate = new Date(txn.date);
        return txnDate >= new Date(dateFilter.start) && txnDate <= new Date(dateFilter.end);
      });
    }

    setFilteredTransactions(filtered);
  };
  const SearchedTransactions = filteredTransactions.filter((trxn) =>
    trxn.collect_id._id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(handleFilter, [statusFilter, dateFilter]);

  return (
    <Box sx={{display:'flex', flexDirection:'column'}} >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '25px 10px 10px', alignItems: 'center' }}>
        <Typography variant='h5' sx={{ color: isLightMode ? 'black' : 'white' }}>Transactions Overview : </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TextField
            select
            label="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: {
                color: isLightMode ? 'black' : 'white', // Label color
                fontSize: '14px' // Decrease label font size
              },
            }}
            InputProps={{
              style: {
                color: isLightMode ? 'black' : 'white', // Input text color
                fontSize: '14px', // Decrease input text font size
              },
            }}
            style={{ marginRight: '16px', color: isLightMode ? 'black' : 'white' }}
            size='small'
          >
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="SUCCESS">success</MenuItem>
            <MenuItem value="PENDING">pending</MenuItem>
            <MenuItem value="FAILURE">failed</MenuItem>
          </TextField>
          <TextField
            type="date"
            label="Start Date"
            onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
            InputLabelProps={{
              shrink: true,
              style: {
                color: isLightMode ? 'black' : 'white', // Label color
                fontSize: '14px' // Decrease label font size
              },
            }}
            InputProps={{
              style: {
                color: isLightMode ? 'black' : 'white', // Input text color
                fontSize: '14px', // Decrease input text font size
              },
            }}
            sx={{
              marginRight: '16px',
            }}
            size="small"
          />
          <TextField
            type="date"
            label="End Date"
            onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
            InputLabelProps={{
              shrink: true,
              style: {
                color: isLightMode ? 'black' : 'white', // Label color
                fontSize: '14px' // Decrease label font size
              },
            }}
            InputProps={{
              style: {
                color: isLightMode ? 'black' : 'white', // Input text color
                fontSize: '14px', // Decrease input text font size
              },
            }}
            sx={{
              marginRight: '16px',
            }}
            size="small"
          />

        </Box>
      </Box>
       <Divider sx={{ width: '100%', borderColor : isLightMode? "grey" :'white' }} />
      <Table border={'1px'} sx={{flexGrow:1}}>
        <TableHead>
          <TableRow >
            <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>S.NO.</TableCell>
            <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Collect ID</TableCell>
            <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>School ID</TableCell>
            <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Gateway</TableCell>
            <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Order Amount</TableCell>
            <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Transaction AMT.</TableCell>
            <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: '700', fontSize: '15px', color: isLightMode ? 'black' : 'white' }}>Custom Order ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {SearchedTransactions.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((txn, index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: isLightMode ? 'black' : 'whitesmoke' }}>{index + 1}.</TableCell>
              <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{txn.collect_id._id}</TableCell>
              <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{txn.collect_id.school_id}</TableCell>
              <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{txn.gateway}</TableCell>
              <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}> &#8377;{txn.collect_id.order_amount}</TableCell>
              <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}> &#8377;{txn.transaction_amount}</TableCell>
              <TableCell sx={{ color: txn.status == 'SUCCESS' ? 'green' : 'orange', fontSize: '13px' }}>{txn.status}</TableCell>
              <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{txn.collect_id.custom_order_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        sx={{ backgroundColor:isLightMode ? 'white' : 'black', color: isLightMode ? 'black' : 'whitesmoke'}}
      />
    </Box>
  );
};
