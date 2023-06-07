import { useRiderSearchInput } from "@/modules/components/RiderSearchBar/store";
import { Flex, Text } from "@chakra-ui/react";

interface Props {}

export default function SearchInputDisplaySection({}: Props) {
  const { inputState } = useRiderSearchInput();

  return (
    <Flex direction={"column"} margin={"20px"} gap={2}>
      <Text
        borderRadius={"10px"}
        border={"1px solid #c2c2c2"}
        padding={"5px"}
        color={"gray.500"}
      >
        Pickup Location : {inputState?.pickupLocationInput}
      </Text>
      <Text
        borderRadius={"10px"}
        border={"1px solid #c2c2c2"}
        padding={"5px"}
        color={"gray.500"}
      >
        Dropoff Location : {inputState?.dropoffLocationInput}
      </Text>
      <Text
        borderRadius={"10px"}
        border={"1px solid #c2c2c2"}
        padding={"5px"}
        color={"gray.500"}
      >
        StartTime :{" "}
        {new Date(inputState?.pickupStartTime || "").toString().slice(4, 21)}
      </Text>
      <Text
        borderRadius={"10px"}
        border={"1px solid #c2c2c2"}
        padding={"5px"}
        color={"gray.500"}
      >
        EndTime :{" "}
        {new Date(inputState?.pickupEndTime || "").toString().slice(4, 21)}
      </Text>
    </Flex>
  );
}
