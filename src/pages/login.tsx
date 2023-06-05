import { GoogleLoginButton } from "@/modules/login/components/GoogleLoginButton";
import { Title } from "@/modules/login/components/Title";
import { Text, Flex, Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
interface Props {
  url: string;
}

export default function LoginPage({ url }: Props) {
  return (
    <>
      <Head>
        <title>Login - CoRide</title>
      </Head>
      <Box
        height="100vh"
        bgGradient={
          "linear(to-b,#8E2DE2 0%, #7929E1 20%, #6634DE 40%, #543FDA 60%, #424AD7 70%, #FFFFFF 70%)"
        }
      >
        <Flex direction={"column"} align={"center"} justify="end" height="50%">
          <Title />
          <GoogleLoginButton url={url} />
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
    </>
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
