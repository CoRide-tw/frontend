import { authFetcher } from "@/modules/api/fetcher";
import { useGeolocationToAddress } from "@/modules/api/swr/useGeolocationToAddress";
import { useRiderRequests } from "@/modules/api/swr/useRiderRequests";
import { useUser } from "@/modules/api/swr/useUser";
import { formatDateTime } from "@/utils/formatTime";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdModeStandby } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import useSWR from "swr";
import RequestCard from "./RequestCard";

export default function CurrentRequestSection() {
  const { user } = useUser();
  const router = useRouter();

  const { requests } = useRiderRequests({ riderId: Number(user?.id) });

  let filteredRequests = requests?.filter(
    (item: any) =>
      item.status === "pending" && new Date(item.pickupEndTime) > new Date()
  );
  console.log(requests);

  return (
    <Flex margin={"20px"} direction={"column"} gap="4px">
      <Text fontSize="xl" fontWeight={"600"} margin={"10px 0"}>
        Your Requests
      </Text>
      {filteredRequests?.length ? (
        filteredRequests.map((item) => (
          <RequestCard key={item.id} item={item} />
        ))
      ) : (
        <Box>
          <Text color="gray.500">You have not request any rides yet</Text>
        </Box>
      )}
    </Flex>
  );
}
