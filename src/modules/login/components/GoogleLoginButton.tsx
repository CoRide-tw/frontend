import { Box, Button, Center, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineGoogle } from "react-icons/ai";

export const GoogleLoginButton = ({ url }: { url: string }) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push(url);
  };
  return (
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
  );
};
