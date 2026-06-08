import { createTheme } from "@mui/material";

const theme = createTheme({

  palette: {
  mode: "dark",

  primary: {
    main: "#38bdf8",   
  },

  secondary: {
    main: "#0ea5e9",  
  },

  background: {
    default: "#121212", 
    paper: "#1e1e1e",   
  },

  text: {
    primary: "#ffffff", 
    secondary: "#b3b3b3",
  },
},
  typography: {
    fontFamily: "'Poppins', sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {

   MuiCard: {
  defaultProps: {
    variant: "outlined",
  },

  styleOverrides: {
    root: {
      borderRadius: "20px",
      border: "1px solid #2a2a2a",
      backgroundColor: "#1e1e1e",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    },
  },
},

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          padding: "10px 20px",
          fontWeight: 600,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "15px",
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "md",
      },
    },
  },
});

export default theme;