import { Box, Flex, Text, Image } from "@chakra-ui/react";

export default function HistoryTripCard({ info }: { info: any }) {
  return (
    <Flex
      gap="3"
      width={"full"}
      border={"1px solid "}
      borderColor={"#EEEEEE"}
      borderRadius={"10px"}
    >
      <Box borderLeftRadius={10} bg="#EEEEEE" height={"100%"}>
        <Image
          width={"74px"}
          objectFit={"cover"}
          height={"100%"}
          src={info.type === "DRIVING" ? "vehicle.png" : "passenger.png"}
          alt={""}
        />
      </Box>
      <Flex direction={"column"} flex={1} padding={"4px 0px"}>
        <Text fontWeight={600} fontSize={"md"}>
          {info.destination}
        </Text>
        <Text fontWeight={400} fontSize={"sm"} color={"gray.400"}>
          {info.date}
          {"・"}
          {info.startTime}
        </Text>
        <Text fontWeight={400} fontSize={"sm"} color={"gray.400"}>
          {info.price}
        </Text>
      </Flex>
    </Flex>
  );
}
