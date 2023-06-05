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
    >
      <ChakraBox
        fontSize="5xl"
        fontWeight={700}
        mb={8}
        color={"black"}
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

      <Image src={"/login.png"} alt={""} width={"400"} height={"270"} />

      <Link href={url} width={"full"} padding={"0px 20px"}>
        <Button w="100%" border="1px" borderColor={"gray.500"} mb={4}>
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
    </Center>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_CORIDE_API_URL}/oauthUrl`
  );
  const { url } = await data.json();
  console.log(url);
  return {
    props: {
      url,
    },
  };
};
