import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// customize Chakra theme
const colors = {};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, config });
export default theme;
