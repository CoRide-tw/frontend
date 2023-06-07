import { useGeolocationToAddress } from "@/modules/api/swr/useGeolocationToAddress";
import { Request } from "@/modules/types/request";
import { formatDateTime } from "@/utils/formatTime";
import { Flex, Text } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdModeStandby } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";

interface Props {
  item: Request;
}

export default function RequestCard({ item }: Props) {
  const { address: pickup } = useGeolocationToAddress({
    lat: item?.pickupLat || 0,
    lng: item?.pickupLong || 0,
  });
  const { address: dropoff } = useGeolocationToAddress({
    lat: item?.dropoffLat || 0,
    lng: item?.dropoffLong || 0,
  });
  const startTime = formatDateTime(new Date(item?.pickupStartTime || ""));
  const endTime = formatDateTime(new Date(item?.pickupEndTime || ""));

  return (
    <Flex
      borderRadius={"10px"}
      border={"1px solid #E2E8F0"}
      padding={"15px "}
      fontWeight={"500"}
      justify={"space-between"}
      align={"center"}
      onClick={() => {
        // router.push("/driver/requests?new=1&routeId=");
      }}
    >
      <Flex direction="column" w="full">
        <Flex padding={"5px 0px"} direction="column" w="full">
          <Flex gap="4px" align="center">
            <Text color={"gray.500"} fontSize={"xs"}>
              {startTime.date}
            </Text>
            <Text color={"gray.500"} fontSize={"xs"}>
              {startTime.time}
            </Text>
            <Text color={"gray.500"} fontSize={"xs"}>
              ~ {endTime.time}
            </Text>
          </Flex>
          <Flex padding={"5px 0px"} gap="4" align="center">
            <RxDividerVertical size="20px" />
            <Text fontSize={"xs"}>{pickup}</Text>
          </Flex>
          <Flex padding={"5px 0px"} gap="4" align="center">
            <RxDividerVertical size="20px" />
            <Text fontSize={"xs"}>{dropoff}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Text fontWeight={700} color={"green"}>
        {item.status}
      </Text>
    </Flex>
  );
}
