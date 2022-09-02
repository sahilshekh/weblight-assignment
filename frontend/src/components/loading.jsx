import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
  return (
   <div style={{margin:"5% auto 14% auto",width:"25%"}}>
        <Stack sx={{ color: 'orange' }} spacing={15} direction="row">
            <CircularProgress size={100} color="secondary"/>
            <CircularProgress size={100} color="success" />
            <CircularProgress size={100}  color="inherit" />
        </Stack>
   </div>
  );
}