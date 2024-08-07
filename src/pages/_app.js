import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { createContext, useState } from "react";
import jwtInterceptor from "@/utils/jwtinterceptor";

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

export const AddCourseContext = createContext();
jwtInterceptor();
export default function App({ Component, pageProps }) {
  const [course, setCourse] = useState({
    course_name: "",
    price: "",
    duration: "",
    summary: "",
    detail: "",
    course_image: null,
    video_trailer: null,
    attach_file: null,
    lessons: [],
  });
  return (
    <ChakraProvider>
      <AppCacheProvider {...pageProps}>
        <ThemeProvider theme={theme}>
          <AddCourseContext.Provider value={{ course, setCourse }}>
            <Component {...pageProps} />
          </AddCourseContext.Provider>
        </ThemeProvider>
      </AppCacheProvider>
    </ChakraProvider>
  );
}
