import { extendTheme } from "@mui/joy/styles";

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        /* Primary Colors - Orange */
        primary: {
          main: "#ff751f",
          hover: "#e5671b",
          light: "#ff9a4d",
          dark: "#cc5e18",
        },

        /* Dark Colors - Deep Teal */
        dark: {
          main: "#023740",
          hover: "#034653",
          light: "#045769",
          lighter: "#06758c",
        },

        /* White Colors */
        white: {
          main: "#ffffff",
          hover: "#f9fafb",
          light: "#f3f4f6",
          lighter: "#e5e7eb",
        },
      },
    },
  },

  fontFamily: {
    display: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif",
  },

  typography: {
    headingPrimary: {
      fontWeight: 600,
      lineHeight: 1.2,
      fontSize: "1.5rem",
      "@media (min-width:600px)": {
        fontSize: "1.875rem",
      },
      "@media (min-width:900px)": {
        fontSize: "2.25rem",
      },
      "@media (min-width:1200px)": {
        fontSize: "3rem",
      },
    },

    headingSecondary: {
      fontWeight: 600,
      lineHeight: 1.35,
      fontSize: "1.25rem",
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:900px)": {
        fontSize: "1.875rem",
      },
      "@media (min-width:1200px)": {
        fontSize: "2.25rem",
      },
    },

    headingTertiary: {
      fontWeight: 600,
      lineHeight: 1.35,
      fontSize: "0.875rem",
      "@media (min-width:600px)": {
        fontSize: "1.125rem",
      },
      "@media (min-width:900px)": {
        fontSize: "1.25rem",
      },
      "@media (min-width:1200px)": {
        fontSize: "1.5rem",
      },
    },
  },

  components: {
    JoyInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontPalette: theme.palette.dark.main,
          backgroundColor: theme.palette.white.main,
          "&.Mui-focused": {
            "--Input-focusedHighlight": theme.palette.primary.main,
          },
          "&::before": {
            transition: "box-shadow .15s ease-in-out",
          },
        }),
      },
    },
    JoyTextarea: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontPalette: theme.palette.dark.main,
          backgroundColor: theme.palette.white.main,
          "&.Mui-focused": {
            "--Textarea-focusedHighlight": theme.palette.primary.main,
          },
          "&::before": {
            transition: "all .15s ease-in-out",
          },
        }),
      },
    },
    JoyAutocomplete: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontPalette: theme.palette.dark.main,
          backgroundColor: theme.palette.white.main,
          "&.Mui-focused": {
            "--Input-focusedHighlight": theme.palette.primary.main,
          },

          "&::before": {
            transition: "box-shadow .15s ease-in-out",
          },
        }),
      },
    },
    JoySelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontPalette: theme.palette.dark.main,
          backgroundColor: theme.palette.white.main,
        }),
      },
    },
    JoyCircularProgress: {
      styleOverrides: {
        determinate: ({ theme }) => ({  
          color: theme.palette.primary.main,
        }),
        indeterminate: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },
  },
});

export default theme;
