import { authFetcher } from "@/modules/api/fetcher";
import { useGeolocationToAddress } from "@/modules/api/swr/useGeolocationToAddress";
import { useUser } from "@/modules/api/swr/useUser";
import GoogleMapsCard from "@/modules/components/GoogleMapsCard";
import { useRiderSearchInput } from "@/modules/components/RiderSearchBar/store";
import { RouteResponse } from "@/modules/types/route";
import { CarPlate, Money, TripPoint } from "@/modules/types/trip";
import { User } from "@/modules/types/user";
import { formatDateTime } from "@/utils/formatTime";

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Progress,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { DirectionsServiceProps } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { PropsWithoutRef, useEffect } from "react";
import { BsFillCarFrontFill } from "react-icons/bs";
import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";
import { MdModeStandby } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";

// sample data format
const route = {
  id: 9,
  driverId: 34,
  startLong: 120.99037397130422,
  startLat: 24.77531233261688,
  endLong: 120.99776487500324,
  endLat: 24.78716874568955,
  startTime: "2023-06-08T10:00:00Z",
  endTime: "2023-06-08T11:00:00Z",
  capacity: 5,
  createdAt: "2023-06-06T14:56:06.359793Z",
  updatedAt: "2023-06-06T14:56:06.359793Z",
};

const DateRow = ({
  date,
  customDateLocale,
}: {
  date: Date;
  customDateLocale?: Intl.DateTimeFormat;
}) => {
  const dateLocale =
    customDateLocale ??
    Intl.DateTimeFormat([], {
      weekday: "short",
      day: "2-digit",
      month: "long",
    });

  const dateString = dateLocale.format(date);

  return (
    <Text py="1" fontWeight="800">
      {dateString}
    </Text>
  );
};
const TripPointsRows = ({
  start,
  end,
  startTime,
  endTime,
  customTimeLocale,
}: {
  start: string;
  end: string;
  startTime: Date;
  endTime: Date;
  customTimeLocale?: Intl.DateTimeFormat;
}) => {
  const timeLocale =
    customTimeLocale ??
    Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const startTimeString = timeLocale.format(startTime);
  const endTimeString = timeLocale.format(endTime);

  return (
    <>
      <HStack>
        <FaLocationArrow />
        <Text p="1" fontWeight="600">
          {startTimeString}
        </Text>
        <Text fontSize={"sm"}> {start} </Text>
      </HStack>
      <HStack>
        <FaMapMarkerAlt color="red" />
        <Text p="1" fontWeight="600">
          {endTimeString}
        </Text>
        <Text fontSize={"sm"}> {end} </Text>
      </HStack>
    </>
  );
};
const CarPlateCol = ({ carPlate }: { carPlate?: CarPlate }) => {
  if (carPlate === undefined) return <></>;

  return (
    <>
      <BsFillCarFrontFill />
      <Text p="1">Tesla Model X</Text>
      <Text p="1">{carPlate}</Text>
    </>
  );
};
const AttachedUserCol = ({ attachedUsers }: { attachedUsers?: User[] }) => {
  if (attachedUsers === undefined) return <></>;

  const avatars = attachedUsers.map((user, index) => (
    <Avatar key={index} name={user.name} src={user.pictureUrl} size="xs" />
  ));

  return <AvatarGroup pl="2">{avatars}</AvatarGroup>;
};

export default function RouteCard({
  data,
  customTimeLocale,
  customDateLocale,
}: PropsWithoutRef<{
  data: RouteResponse;
  customTimeLocale?: Intl.DateTimeFormat;
  customDateLocale?: Intl.DateTimeFormat;
}>) {
  const toast = useToast();
  const { user } = useUser();
  const router = useRouter();
  const { inputState } = useRiderSearchInput();
  const startTime = formatDateTime(new Date(data.startTime));
  const endTime = formatDateTime(new Date(data.endTime));

  const { address: startAddress } = useGeolocationToAddress({
    lat: data.startLat,
    lng: data.startLong,
  });
  const { address: endAddress } = useGeolocationToAddress({
    lat: data.endLat,
    lng: data.endLong,
  });

  const handleRequest = async () => {
    console.log({
      routeId: data.id,
      riderId: user.id,
      pickupLong: inputState?.pickupLong,
      pickupLat: inputState?.pickupLat,
      dropoffLong: inputState?.dropoffLong,
      dropoffLat: inputState?.dropoffLat,
      pickupStartTime: inputState?.pickupStartTime,
      pickupEndTime: inputState?.pickupEndTime,
      tips: inputState?.tips,
    });
    const res = await authFetcher(`/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        routeId: data.id,
        riderId: user.id,
        pickupLong: inputState?.pickupLong,
        pickupLat: inputState?.pickupLat,
        dropoffLong: inputState?.dropoffLong,
        dropoffLat: inputState?.dropoffLat,
        pickupStartTime: inputState?.pickupStartTime,
        pickupEndTime: inputState?.pickupEndTime,
        tips: inputState?.tips,
      }),
    });

    if (res) {
      toast({
        position: "top",
        title: "Request sent!",
        description: `Requested ${data.driverName}'s ride`,
        status: "success",
        duration: 3000,
        isClosable: false,
      });

      router.push("/home");
    } else {
      toast({
        position: "top",
        title: "Request sent!",
        description: `Requested ${data.driverName}'s ride`,
        status: "success",
        duration: 3000,
        isClosable: false,
      });
    }
  };

  return (
    <Flex
      direction="column"
      gap="8px"
      borderRadius="8px"
      border="1px"
      borderColor="gray.200"
      p="8px"
    >
      <GoogleMapsCard
        data={{
          origin: `${data.startLat},${data.startLong}`,
          destination: `${data.endLat},${data.endLong}`,
          travelMode:
            "DRIVING" as DirectionsServiceProps["options"]["travelMode"],
        }}
        height="150px"
      />

      <Flex alignItems="center" gap="4" p="4px">
        <Avatar name={data.driverName} src={data.driverPictureUrl} />
        <Box>
          <Heading size="sm">{data.driverName}</Heading>

          <HStack>
            <Progress
              minW="65px"
              value={(4.3 / 5) * 100}
              colorScheme="green"
              my="1"
              bgColor="gray.300"
              borderRadius="10"
            />
            <Text fontSize="xs" fontWeight="700">
              {4.3}/5
            </Text>
          </HStack>
        </Box>
      </Flex>

      <Flex direction="column" gap="2px" paddingInline="4px">
        <Text color={"gray.500"} fontSize={"sm"}>
          {startTime.date} {startTime.time}
        </Text>
        <Flex align="center">
          <Text color={"gray.500"} fontSize={"xs"} w="40px">
            From:
          </Text>
          <Text fontSize={"sm"}>{startAddress}</Text>
        </Flex>
      </Flex>
      <Flex direction="column" gap="2px" paddingInline="4px">
        <Text color={"gray.500"} fontSize={"sm"}>
          {endTime.date} {endTime.time}
        </Text>
        <Flex align="center">
          <Text color={"gray.500"} fontSize={"xs"} w="40px">
            To:
          </Text>
          <Text fontSize={"sm"}>{endAddress}</Text>
        </Flex>
      </Flex>

      <Flex justify="end">
        <Button onClick={handleRequest}>Request</Button>
      </Flex>
    </Flex>
  );
}
