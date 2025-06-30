import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FormWithZod } from "./FormWithZod";
import {
  Container,
  createTheme,
  CssBaseline,
  Link,
  Stack,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 8 }}>
        <Stack alignItems={"center"} sx={{ mb: 4 }}>
          <Link
            href="https://github.com/yash49/zod-tech-talk/blob/develop/src/FormWithZod.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to code
          </Link>
        </Stack>
        <FormWithZod />
      </Container>
    </ThemeProvider>
  </StrictMode>
);
