import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Flex, Center, IconButton, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { MouseEventHandler, PropsWithChildren } from "react";

const TopBar = ({
  title,
  buttonCallback,
}: {
  title: string;
  buttonCallback: MouseEventHandler<HTMLButtonElement>;
}) => (
  <Center w="full" h="60px" fontSize="22px" fontWeight="bold">
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

  return (
    <Flex direction="column">
      <TopBar title={title} buttonCallback={buttonCallback} />
      {children}
    </Flex>
  );
}
