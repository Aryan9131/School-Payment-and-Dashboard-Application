import { Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TextField, MenuItem, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { EditMenu } from './EditMenu';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '0px',
    backgroundColor: "lightblue",
    '&:hover': {
        backgroundColor: "lightblue",
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '18ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

export const CheckStatus = () => {
    const { isLightMode } = useSelector((state) => state.user)
    const { token } = useSelector((state) => state.auth)
    const [searchedTrasaction, setSearchedTrasaction] = useState(undefined);
    const [searchedCustomOrderId, setSearchedCustomOrderId] = useState("");
    const [editable, setEditable] = useState(false);
    const [status, setStatus] = useState(searchedTrasaction?.status || 'SUCCESS');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleCheckTransactionStatus = async () => {
        const response = await fetch(`https://school-payment-and-dashboard-application.onrender.com/api/transactions/custom-order-id/${searchedCustomOrderId}`);
        const data = await response.json();
        setSearchedTrasaction(data);
        setStatus(data.status)
        setSearchedCustomOrderId("")
    }

    const handleUpdateStatus = async () => {
       try {
        setSearchedTrasaction((state) => ({
            ...state,
            status: status
        }))
        const response = await fetch(`https://school-payment-and-dashboard-application.onrender.com/api/transactions/update-status/${searchedTrasaction._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Header keys should be quoted, not the object itself
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: status })
        });
        const data = await response.json();
        toast("Status Updated !")
       } catch (error) {
          toast("Error while updating Status Try Again !")
       }
        setEditable(false);
    }
    const handleCancelUpdate = () => {
        setEditable(false)
        setStatus(searchedTrasaction.status);
    }
    return (
        <Box >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <Box sx={{ width: { xs: '100vw', md: '95vw' }, border: '1px solid grey', margin: '15px 2px' }}>
                    <Box sx={{ padding: '0px 5px', margin: '10px 0px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h5' sx={{ color: isLightMode ? 'black' : 'white' }}>Search by Custom Order Id :</Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Type Custom Order ID..."
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchedCustomOrderId}
                                    onChange={(e) => setSearchedCustomOrderId(e.target.value)}
                                />
                            </Search>
                            <Button size='small' onClick={handleCheckTransactionStatus} sx={{ backgroundColor: 'lightblue', borderLeft: '1px solid white', color: 'blue', textTransform: 'capitalize', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>Search</Button>
                        </Box>
                    </Box>
                    <Divider sx={{ width: '100%', borderColor: isLightMode ? "grey" : 'white' }} />
                    <Box >
                        <Table>
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
                            <TableBody sx={{ visibility: searchedTrasaction ? 'visibile' : 'hidden' }}>
                                <TableRow>
                                    <TableCell sx={{ color: isLightMode ? 'black' : 'whitesmoke' }}>1.</TableCell>
                                    <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{searchedTrasaction?.collect_id._id}</TableCell>
                                    <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{searchedTrasaction?.collect_id.school_id}</TableCell>
                                    <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{searchedTrasaction?.gateway}</TableCell>
                                    <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{searchedTrasaction?.collect_id.order_amount}</TableCell>
                                    <TableCell sx={{ fontSize: '13px', color: isLightMode ? 'black' : 'whitesmoke' }}>{searchedTrasaction?.transaction_amount}</TableCell>
                                    {
                                        editable
                                            ?
                                            <span>
                                                <TextField
                                                    select
                                                    label="status"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
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
                                                    <MenuItem value="SUCCESS">success</MenuItem>
                                                    <MenuItem value="PENDING">pending</MenuItem>
                                                    <MenuItem value="FAILURE">failed</MenuItem>
                                                </TextField>

                                            </span>
                                            :
                                            <>
                                                <TableCell sx={{ display: 'flex', alignItems: 'center', color: searchedTrasaction?.status == 'SUCCESS' ? 'green' : 'orange' }}>{searchedTrasaction?.status} <EditMenu setEditable={setEditable} /></TableCell>
                                            </>
                                    }
                                    <TableCell sx={{ color: isLightMode ? 'black' : 'whitesmoke' }}>{searchedTrasaction?.collect_id.custom_order_id}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Box sx={{ display: searchedTrasaction ? 'none' : 'flex', justifyContent: 'center', width: '100%' }}>
                            <Typography variant='h6' sx={{ color: isLightMode ? 'black' : 'white' }} >Please Search a Transaction !</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: editable ? 'flex' : 'none', margin: '5px 2px', justifyContent: 'center' }}>
                        <Button variant='outlined' onClick={handleUpdateStatus}>Update Status</Button>
                        <Button variant='outlined' onClick={handleCancelUpdate} sx={{ margin: '0px 5px' }}>Cancel</Button>
                    </Box>
                </Box>

            </Box>

        </Box>
    )
}
