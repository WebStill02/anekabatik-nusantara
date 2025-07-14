'use client'; 

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#374431ff', 
    },
    secondary: {
      main: '#7c826fff', 
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', 
  },
});

export default theme;