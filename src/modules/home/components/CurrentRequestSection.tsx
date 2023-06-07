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
    () => (shouldFetch ? `/request?riderId=${Number(user.id)}` : null),
    authFetcher
  );

  let cnt = data?.filter(
    (item: any) =>
      item.status === "pending" && new Date(item.pickupEndTime) > new Date()
  ).length;
  console.log(data);

  return (
    <Flex margin={"20px"} direction={"column"}>
      <Text fontSize="xl" fontWeight={"600"} margin={"10px 0"}>
        Your Requests
      </Text>
      {cnt ? (
        <Flex
          borderRadius={"10px"}
          border={"1px solid #E2E8F0"}
          padding={"10px "}
          fontWeight={"500"}
          justify={"space-between"}
          align={"center"}
          onClick={() => {
            router.push("/driver/requests?new=1&routeId=");
          }}
        >
          You have requested rides from {cnt} drivers
          <ChevronRightIcon />
        </Flex>
      ) : (
        <Box>
          <Text color="gray.500">You have not request any rides yet</Text>
        </Box>
      )}
    </Flex>
  );
}
