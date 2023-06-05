import { type ComponentStyleConfig } from "@chakra-ui/react";


export const ButtonStyle: ComponentStyleConfig = {
  variants: {
    solid: {
      bg: "black",
      color: "white",

      _hover: {
        bg: "blackAlpha.800",
      },
    },
    white: {
      bg: "white",
      color: "black",
      _hover: {
        bg: "whiteAlpha.800",
      },
    },
    login: {
      bg: "white",
      color: "black",
    },
  },
  
};
