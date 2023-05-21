import { Flex, Center, Box } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

const TopBar = () => (
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
);

const ScrollArea = ({ children }: PropsWithChildren) => (
  <Box flex="1" overflow="scroll">
    {children}
  </Box>
);

export default function TopLayout({ children }: PropsWithChildren) {
  return (
    <Flex direction="column" h="100vh" w="100vw">
      <TopBar />
      <ScrollArea>{children}</ScrollArea>
    </Flex>
  );
}
