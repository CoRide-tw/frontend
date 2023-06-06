import { useUser } from "@/modules/api/swr/useUser";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function GreetingSection() {
  const { user } = useUser();
  const router = useRouter();
  const handleClick = () => {
    router.push("/rider/search");
  };
  return (
    <Flex padding={"15px 25px "} direction={"column"}>
      <Text fontWeight={600} fontSize={"2xl"}>
        Hello, {user?.name}
      </Text>
      <InputGroup onClick={handleClick} margin={"20px 0px 0px"}>
        <InputLeftElement>
          <SearchIcon color={"gray.400"} />
        </InputLeftElement>
        <Input placeholder="Where to?" isReadOnly />
      </InputGroup>
    </Flex>
  );
}
