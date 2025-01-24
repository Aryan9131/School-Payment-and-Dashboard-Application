import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export const UserProfile = () => {
    const {userDetails} = useSelector((state)=>state.user)
  return (
    <Box sx={{width:'90vw',height:'40vh' , backgroundColor:'whitesmoke'}}>
        <Box sx={{width:'60%', height:'90%', backgroundColor:'white'}}>
        <Typography>name : {userDetails.name}</Typography>
        <Typography>email : {userDetails.email}</Typography>
        <Typography>number : {userDetails.number}</Typography>
        <Typography>password : {userDetails.password}</Typography>
        </Box>
    </Box>
  )
}
