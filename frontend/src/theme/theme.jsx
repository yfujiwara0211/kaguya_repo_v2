import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: { // for login button and header
      primary: {
        main: '#27282C', // The main shade of the color
        contrastText: '#ffffff', // Text color, intended to contrast with main
      },
      secondary: { // for register button　
        main: '#078080',
        contrastText: '#ffffff',
      },
      background: { // for background color
        default: '#FBFBFB',
      },
    },
  });

export default theme;