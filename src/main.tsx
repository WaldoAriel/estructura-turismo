import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App.tsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a202c',
      light: '#2d3748',
      dark: '#171923',
      contrastText: '#f7fafc',
    },
    secondary: {
      main: '#4a5568',
      light: '#718096',
      dark: '#2d3748',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f7fafc',
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#4a5568 #f7fafc',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f7fafc',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4a5568',
            borderRadius: '4px',
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#1a202c',
          color: '#f7fafc',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '64px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '6px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f7fafc',
          borderRight: '1px solid #e2e8f0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
        },
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
