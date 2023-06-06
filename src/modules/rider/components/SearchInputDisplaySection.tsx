import { useRiderSearchInput } from "@/modules/components/RiderSearchBar/store";
import { Box, Text } from "@chakra-ui/react";

interface Props {}

export default function SearchInputDisplaySection({}: Props) {
  const { inputState } = useRiderSearchInput();

  return (
    <Box>
      <Text>{inputState?.pickupLocationInput}</Text>
      <Text>{inputState?.dropoffLocationInput}</Text>
      <Text>{inputState?.pickupStartTime}</Text>
      <Text>{inputState?.pickupEndTime}</Text>
    </Box>
  );
}
