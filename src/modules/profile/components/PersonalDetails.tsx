import { Avatar, Flex, Center, Divider, Box, Text } from "@chakra-ui/react";
import { DiAptana } from "react-icons/di";

const Username = "Eric Chen";
const Jobname = "Senior Software Engineer";
const Location = "Hsinchu";

export default function PersonalDetails() {
  return (
    <Flex bg="#EEEEEE" direction="column" justify="center" align="center">
      <Avatar
        marginTop={"80px"}
        name={Username}
        size="2xl"
        src="https://bit.ly/kent-c-dodds"
      />
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Text fontWeight={"600"} fontSize={"3xl"}>
          {Username}
        </Text>
        <DiAptana />
      </Flex>
      <Text fontWeight={"600"} fontSize={"lg"} color={"gray.500"}>
        {Jobname}
      </Text>
      <Text fontWeight={"600"} fontSize={"lg"} color={"gray.500"}>
        {Location}
      </Text>
      <Flex
        width="100%"
        justify={"center"}
        align={"center"}
        bgGradient="linear(to-b, #EEEEEE 0%, #EEEEEE 50%,white 51%,white 100%)"
        padding={"20px"}
      >
        <Flex
          justify={"center"}
          align={"center"}
          bg={"white"}
          h="80px"
          width="350px"
          borderRadius="10px"
          boxShadow=" 0px 4px 4px rgba(0, 0, 0, 0.25)"
        >
          <Flex
            direction="column"
            justify={"center"}
            align={"center"}
            width="60px"
            margin="auto"
          >
            <Text fontWeight="600">25</Text>
            <Text fontWeight="600" color="gray.400">
              Joins
            </Text>
          </Flex>
          <Box height="60px" width="5px" margin="auto 10px">
            <Divider orientation="vertical" color="gray.900" size="2xl" />
          </Box>
          <Flex
            direction="column"
            justify={"center"}
            align={"center"}
            width="60px"
            margin="auto"
          >
            <Text fontWeight="600">56</Text>
            <Text fontWeight="600" color="gray.400">
              Drives
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
