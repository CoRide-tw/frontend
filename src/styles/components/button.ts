import { type ComponentStyleConfig } from "@chakra-ui/react";

export const ButtonStyle: ComponentStyleConfig = {
  variants: {
    solid: {
      bgGradient: "linear(to-r, #8E2DE2 30%, #4A00E0 100%)",
      color: "white",

      _active: {
        bgGradient: "linear(to-r, #8E2DE2 30%, #4A00E0 100%)",
        shadow: "none",
        transform: "none",
      },

      _hover: {
        bgGradient: "linear(to-r, #8E2DE2 30%, #4A00E0 100%)",
        shadow: "0 0.2em 0.2em 0 rgba(0, 0, 0, 0.25)",
        transform: "translateY(-0.10em)",
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
