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
    colorful: {
      bgGradient: "linear(to-r, #8E2DE2 30%, #4A00E0 100%)",
      color: "white",

      _disabled: {
        bg: "gray.500",
        color: "white",
      },
    },
  },
};
