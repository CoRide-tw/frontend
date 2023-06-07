import { Box, Flex, Text, Divider } from "@chakra-ui/react";
import { useRouteRankings } from "@/modules/api/swr/useRouteRankings";
import RouteCard from "./RouteCard";

export default function FindAvailableSection() {
  const { data: availableRoutes, error, isLoading } = useRouteRankings();

  return (
    <Box margin="20px">
      <Text fontSize="xl" fontWeight={"600"} marginBottom="10px">
        Best Matches
      </Text>

      <Divider />
      <Flex direction="column" gap="8px">
        {availableRoutes.map((data) => (
          <RouteCard key={data.id} data={data} />
        ))}
      </Flex>
    </Box>
  );
}
