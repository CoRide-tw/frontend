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
  },
};
