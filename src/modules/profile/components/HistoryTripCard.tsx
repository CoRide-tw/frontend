import { Box, Flex, Text, Image } from "@chakra-ui/react";

export default function HistoryTripCard({ info }: { info: any }) {
  return (
    <Flex
      gap="3"
      width={"full"}
      border={"1px solid "}
      borderColor={"#EEEEEE"}
      borderRadius={"10px"}
      margin={"10px 0px"}
    >
      <Box borderLeftRadius={10} bg="#EEEEEE" height={"100%"}>
        <Image
          width={"74px"}
          objectFit={"cover"}
          height={"100%"}
          src={"vehicle.png"}
          alt={""}
        />
      </Box>
      <Flex
        direction={"column"}
        flex={1}
        padding={"4px 0px"}
        justify={"space-evenly"}
      >
        <Text fontWeight={600} fontSize={"md"}>
          {info.destination}
        </Text>
        <Text fontWeight={400} fontSize={"sm"} color={"gray.400"}>
          {new Date(info.time).toDateString().slice(4, 10)}
          {/* {"・"} */} <br />
          {new Date(info.time).toString().slice(16, 21)}
        </Text>
      </Flex>
    </Flex>
  );
}
