import useFetchUser from "@/modules/api/swr/useFetchUser";
import { RouteResponse } from "@/modules/types/route";
import { CarPlate, Money, TripPoint } from "@/modules/types/trip";
import { User, UserRating } from "@/modules/types/user";

import getAddress from "@/utils/getAddress";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Progress,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { get } from "http";
import { PropsWithoutRef } from "react";
import { BsFillCarFrontFill } from "react-icons/bs";
import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";

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

interface Props {
  data: RouteResponse;
}
const UserBadge = ({
  user,
  rating,
  ...props
}: {
  user: User;
  rating?: UserRating;
}) => (
  <Flex alignItems="center" gap="4" {...props}>
    <Avatar name={user.name} src={user.pictureUrl} />
    <Box>
      <Heading size="sm">{user.name}</Heading>
      {rating ? (
        <HStack>
          <Progress
            minW="65px"
            value={rating ? (rating / 5) * 100 : 0}
            colorScheme="green"
            my="1"
            bgColor="gray.300"
            borderRadius="10"
          />
          <Text fontSize="xs" fontWeight="700">
            {rating}/5
          </Text>
        </HStack>
      ) : (
        <></>
      )}
    </Box>
  </Flex>
);

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
  data: any;
  customTimeLocale?: Intl.DateTimeFormat;
  customDateLocale?: Intl.DateTimeFormat;
}>) {
  console.log(data);
  const res = useFetchUser(data?.driverId.toString());
  const user = res?.user;

  console.log(getAddress({ lat: route.startLat, lng: route.startLong }));

  getAddress({ lat: route.endLat, lng: route.endLong });
  // const routeId = data?.id.toString();
  // console.log(routeId);
  // const { route, error, isLoading } = useRouteDetail({ routeId });
  // console.log(route, error, isLoading);
  return (
    <Card bgColor="#EEEEEE" m="3" borderRadius="xl">
      <CardHeader bgGradient="linear(#EEEEEE, #E1E1E1)" borderTopRadius="xl">
        <Flex>
          <UserBadge user={user} rating={4.8} />
          <Spacer />
        </Flex>
      </CardHeader>
      <CardBody py="2">
        <DateRow
          date={new Date(route.startTime)}
          customDateLocale={customDateLocale}
        />
        <TripPointsRows
          start={getAddress({ lat: route.startLat, lng: route.startLong })}
          end={getAddress({ lat: route.endLat, lng: route.endLong })}
          startTime={new Date(route.startTime)}
          endTime={new Date(route.endTime)}
          customTimeLocale={customTimeLocale}
        />
      </CardBody>
      <CardFooter py="2">
        <HStack>
          {/* <CarPlateCol carPlate={trip.carPlate} /> */}
          {/* <AttachedUserCol attachedUsers={trip.attachedUsers} /> */}
        </HStack>
      </CardFooter>
    </Card>
  );
}
