import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#2e7d32' }, // Nature/Food Green
    secondary: { main: '#ffa000' },
    background: { default: '#f4f7f6' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h4: { fontWeight: 700 }
  },
  shape: { borderRadius: 12 }
});

export default theme;