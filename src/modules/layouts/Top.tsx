import { Flex, Center, Box } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function TopLayout({ children }: PropsWithChildren) {
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

  const ScrollArea = () => (
    <Box flex="1" overflow="scroll">
      {children}
    </Box>
  );

  return (
    <Flex direction="column" maxH="100vh" maxW="100vw">
      <TopBar />
      <ScrollArea />
    </Flex>
  );
}
