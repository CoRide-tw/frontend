import { Icon } from "@chakra-ui/icons";
import { Flex, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DiAptana } from "react-icons/di";
import { ImProfile } from "react-icons/im";

export default function PageBar() {
  const router = useRouter();

  return (
    <Flex margin={"5px 20px"} gap={3}>
      <Flex w={"full"} borderRadius={"10px"} bg={"#8E2DE2 "} height={"50px"}>
        <Flex
          width={"50px"}
          justify={"center"}
          align={"center"}
          onClick={() => {
            router.push("/profile");
          }}
        >
          <Flex
            width={"35px"}
            height={"35px"}
            borderRadius={"50%"}
            bg="white"
            justify={"center"}
            align={"center"}
          >
            <Icon as={ImProfile} width={"20px"} height={"20px"} />
          </Flex>
        </Flex>
        <Center color={"white"} fontWeight={"700"}>
          Profile
        </Center>
      </Flex>
      <Flex w={"full"} borderRadius={"10px"} bg={"#4A00E0 "} height={"50px"}>
        <Flex
          width={"50px"}
          justify={"center"}
          align={"center"}
          onClick={() => {
            router.push("/settings");
          }}
        >
          <Flex
            width={"35px"}
            height={"35px"}
            borderRadius={"50%"}
            bg="white"
            justify={"center"}
            align={"center"}
          >
            <Icon as={DiAptana} width={"20px"} height={"20px"} />
          </Flex>
        </Flex>
        <Center color={"white"} fontWeight={"700"}>
          Settings
        </Center>
      </Flex>
    </Flex>
  );
}
