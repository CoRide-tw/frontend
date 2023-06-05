import {
  Box,
  Button,
  Text,
  Center,
  Link,
  Icon,
  chakra,
  shouldForwardProp,
  AspectRatio,
  Flex,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Image from "next/image";

import { AiOutlineGoogle } from "react-icons/ai";

interface Props {
  url: string;
}
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
export default function LoginPage({ url }: Props) {
  return (
    <Center
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bgGradient={"linear(to-b,#8E2DE2 0%,#4A00E0 30%,#4A00E0 50%,#FFFFFF 51%)"}
    >
      <ChakraBox
        fontSize="5xl"
        fontWeight={700}
        color={"white"}
        animate={{
          scale: [1, 1.2, 1.2, 1],
        }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeatType: "loop",
        }}
      >
        CoRide
      </ChakraBox>
      <Flex
        justify={"center"}
        width="full"
        bgGradient={"linear(to-b, #4A00E0 70%, #FFFFFF 71%)"}
      >
        <Image src={"/login.png"} width={"400"} height={"270"} alt={""} />
      </Flex>
      <Flex direction={"column"} justify={"center"} textAlign={"center"}>
        <Text width={"70%"} margin={"0 auto  10px"} fontSize={"xl"}>
          Getting start with your trips and share your ride with others.
        </Text>
        <Link href={url} width={"full"} padding={"0px 20px"}>
          <Button w="100%" mb={4}>
            <Center width="60%">
              <Center w="30px" margin="10px">
                <Icon as={AiOutlineGoogle} boxSize={5} />
              </Center>
              <Text display={"flex"} marginLeft="10px" w="200px">
                Login with Google
              </Text>
            </Center>
          </Button>
        </Link>
      </Flex>
    </Center>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_CORIDE_API_URL}/oauthUrl`
  );
  const { url } = await data.json();
  return {
    props: {
      url,
    },
  };
};
