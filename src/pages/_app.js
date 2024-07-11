import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AppCacheProvider {...pageProps}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppCacheProvider>
    </ChakraProvider>
  );
}
