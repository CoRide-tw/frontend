import { Center } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

const NavBar = () => (
  <Center
    w="full"
    h="60px"
    fontSize="28px"
    bgGradient="linear(to-r, #8E2DE2 30%, #4A00E0 100%)"
    fontWeight="bold"
    borderBottom={"1px solid rgba(0, 0, 0, 0.1)"}
    shadow={"0 0 5px rgba(0, 0, 0, 0.1)"}
    bgClip="text"
  >
    CoRide
  </Center>
);

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
