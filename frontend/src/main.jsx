import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import store from "./store/store.js";

import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { theme } from "./theme/theme.js";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <App />
            </Router>
          </QueryClientProvider>
        </Provider>
      </CssBaseline>
    </CssVarsProvider>
  </StrictMode>
);
