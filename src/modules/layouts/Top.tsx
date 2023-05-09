import { Flex, Center } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function TitleBarLayout({ children }: PropsWithChildren) {
  return (
    <Flex direction="column">
      <Center
        w="full"
        h="80px"
        bg="black"
        color="white"
        fontSize="36px"
        lineHeight="7"
        fontWeight="extrabold"
      >
        CoRide
      </Center>
      {children}
    </Flex>
  );
}
