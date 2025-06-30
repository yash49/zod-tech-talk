import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FormWithZod } from "./WithZod";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 8 }}>
        <FormWithZod />
      </Container>
    </ThemeProvider>
  </StrictMode>
);
