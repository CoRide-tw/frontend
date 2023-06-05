import {
  Button,
  Text,
  Center,
  Icon,
  chakra,
  shouldForwardProp,
  Flex,
  Box,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { AiOutlineGoogle } from "react-icons/ai";

interface Props {
  url: string;
}
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function LoginPage({ url }: Props) {
  const router = useRouter();

  const handleLogin = () => {
    router.push(url);
  };
  return (
    <Box
      height="100vh"
      bgGradient={
        "linear(to-b,#8E2DE2 0%, #7929E1 20%, #6634DE 40%, #543FDA 60%, #424AD7 70%, #FFFFFF 70%)"
      }
    >
      <Flex direction={"column"} align={"center"} justify="end" height="50%">
        <ChakraBox
          fontSize="5xl"
          fontWeight={700}
          color={"white"}
          animate={{
            scale: [1, 1.2, 1.2, 1],
          }}
          transition={{
            duration: "3",
            ease: "easeInOut",
            repeatType: "loop",
          }}
        >
          CoRide
        </ChakraBox>
        <Box w="100%" paddingInline={"20px"} marginTop="50px">
          <Button mb={4} onClick={handleLogin} variant="login" w="100%">
            <Center>
              <Center w="30px">
                <Icon as={AiOutlineGoogle} boxSize={5} />
              </Center>
              <Text marginLeft="10px">Login with Google</Text>
            </Center>
          </Button>
        </Box>
      </Flex>

      <Box>
        <Flex justify={"center"} width="full">
          <Image src={"/login.png"} width={"400"} height={"270"} alt={""} />
        </Flex>
      </Box>

      <Flex direction={"column"} justify={"center"} textAlign={"center"}>
        <Text width={"80%"} margin={"0 auto  10px"} fontSize={"xl"}>
          Share your ride with colleagues and friends now !
        </Text>
      </Flex>
    </Box>
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
