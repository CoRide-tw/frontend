import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Flex, Center, IconButton, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { MouseEventHandler, PropsWithChildren } from "react";

export default function NestedLayout({
  children,
  title,
  backButtonCallback,
}: PropsWithChildren<{
  title: string;
  backButtonCallback?: MouseEventHandler<HTMLButtonElement>;
}>) {
  const router = useRouter();
  const buttonCallback = backButtonCallback ?? (() => router.back());

  const TopBar = () => (
    <Center w="full" h="80px" fontSize="22px" fontWeight="bold">
      <IconButton
        aria-label="Back"
        icon={<ChevronLeftIcon />}
        fontSize="24px"
        variant="ghost"
        position="absolute"
        left="4px"
        onClick={buttonCallback}
      />
      {title}
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