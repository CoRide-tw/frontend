import { authFetcher } from "@/modules/api/fetcher";
import { useUser } from "@/modules/api/swr/useUser";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CurrentRequestSection() {
  const { user } = useUser();
  const router = useRouter();

  const shouldFetch = !!Number(user?.id);
  const { data } = useSWR(
    () => (shouldFetch ? `/request?routeId=${Number(user.id)}` : null),
    authFetcher
  );

  const filteredData = data?.filter(
    (item: any) =>
      item.status === "pending" && new Date(item.pickupEndTime) > new Date()
  );

  return (
    <Flex margin={"20px"} direction={"column"}>
      <Text fontSize="xl" fontWeight={"600"} margin={"10px 0"}>
        Your Routes
      </Text>
      {filteredData ? (
        <Flex
          borderRadius={"10px"}
          border={"1px solid #E2E8F0"}
          padding={"10px "}
          fontWeight={"500"}
          justify={"space-between"}
          align={"center"}
          onClick={() => {
            // router.push(`/driver/requests?routeId=${}`);
          }}
        >
          You have shared {filteredData.length} routes to others
          <ChevronRightIcon />
        </Flex>
      ) : (
        <Box>
          <Text color="gray.500">You have not share any routes yet</Text>
        </Box>
      )}
    </Flex>
  );
}
