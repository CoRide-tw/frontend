import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { ButtonStyle } from "./components/button";

// customize Chakra theme
const colors = {};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const inter = Inter({ subsets: ["latin"] });

const fonts = {
  body: inter.style.fontFamily,
};

const components = {
  Button: ButtonStyle,
};

const theme = extendTheme({ colors, fonts, config, components });
export default theme;
