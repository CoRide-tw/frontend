import { authFetcher } from "@/modules/api/fetcher";
import { useUser } from "@/modules/api/swr/useUser";

import { Avatar, Flex, Text } from "@chakra-ui/react";

import useSWR from "swr";
import HistoryTripCard from "./HistoryTripCard";
import { useState } from "react";

export default function PersonalDetails() {
  const { user } = useUser();
  const [isJoin, setIsJoin] = useState(true);

  const shouldFetch = !!Number(user?.id);
  const { data, error, isLoading } = useSWR(
    () => (shouldFetch ? `/trip?userId=${Number(user.id)}` : null),
    authFetcher
  );
  const PreviousTripData = {
    driver: [
      {
        id: 5,
        riderId: 34,
        driverId: 34,
        requestId: 4,
        routeId: 9,
        destination: "Kathmandu",
        time: "2023-06-06T15:08:09.743606Z",
        fee: 100,
        createdAt: "2023-06-06T15:08:09.743606Z",
      },
      {
        id: 6,
        riderId: 34,
        driverId: 34,
        requestId: 5,
        routeId: 10,
        destination: "Kathmandu",
        time: "2023-06-06T15:08:09.743606Z",
        fee: 100,

        createdAt: "2023-06-06T15:08:16.326172Z",
      },
      {
        id: 7,
        riderId: 34,
        driverId: 34,
        requestId: 6,
        routeId: 11,
        destination: "Kathmandu",
        time: "2023-06-06T15:08:09.743606Z",
        fee: 100,
        createdAt: "2023-06-06T15:08:20.625445Z",
      },
    ],
    rider: [
      {
        id: 5,
        riderId: 34,
        driverId: 34,
        requestId: 4,
        routeId: 9,
        destination: "fgfg",
        time: "2023-06-06T15:08:09.743606Z",
        fee: 100,
        createdAt: "2023-06-06T15:08:09.743606Z",
      },
      {
        id: 6,
        riderId: 34,
        driverId: 34,
        requestId: 5,
        routeId: 10,
        destination: "fgfg",
        time: "2023-06-06T15:08:09.743606Z",
        fee: 100,
        createdAt: "2023-06-06T15:08:16.326172Z",
      },
      {
        id: 7,
        riderId: 34,
        driverId: 34,
        requestId: 6,
        routeId: 11,
        destination: "fgfg",
        time: "2023-06-06T15:08:09.743606Z",
        fee: 100,

        createdAt: "2023-06-06T15:08:20.625445Z",
      },
    ],
  };

  let tripData = isJoin ? PreviousTripData?.rider : PreviousTripData?.driver;
  return (
    <Flex direction="column" padding={"20px 20px"}>
      <Flex gap={4}>
        <Avatar name={user?.name} size="lg" src={user?.pictureUrl} />
        <Flex direction={"column"} justify={"center"} align={"center"}>
          <Text fontWeight={"600"} fontSize={"2xl"}>
            {user?.name}
          </Text>
        </Flex>
      </Flex>

      <Flex
        width="100%"
        justify={"center"}
        align={"center"}
        padding={"10px"}
        margin={"20px 0px"}
        bg={"#EEEEEE"}
        borderRadius={"30px"}
        gap={4}
      >
        <Flex
          width={"full"}
          justify={"center"}
          align={"center"}
          gap={2}
          bg={isJoin ? "gray.600" : "white"}
          color={isJoin ? "white" : "gray.600"}
          padding={"10px"}
          borderRadius={"20px"}
          onClick={() => setIsJoin(true)}
        >
          <Text fontWeight="600">{!!data?.rider ? data?.rider.length : 0}</Text>
          <Text fontWeight="600">Rides</Text>
        </Flex>

        <Flex
          width={"full"}
          justify={"center"}
          align={"center"}
          gap={2}
          color={isJoin ? "gray.600" : "white"}
          bg={isJoin ? "white" : "gray.600"}
          padding={"10px"}
          borderRadius={"20px"}
          onClick={() => setIsJoin(false)}
        >
          <Text fontWeight="600">
            {!!data?.driver ? data?.driver.length : 0}
          </Text>
          <Text fontWeight="600">Drives</Text>
        </Flex>
      </Flex>
      {tripData.map((item, index) => (
        <HistoryTripCard key={index} info={item} />
      ))}
    </Flex>
  );
}
