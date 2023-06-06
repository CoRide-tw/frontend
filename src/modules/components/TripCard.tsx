import { Avatar, AvatarGroup, Box, Flex, Icon, Spacer } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Progress, HStack, Heading, Text } from "@chakra-ui/react";
import { PropsWithoutRef } from "react";

import { BsStarFill } from "react-icons/bs";
import { BsFillCarFrontFill } from "react-icons/bs";
import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";

import type { User, UserRating } from "../types/user";
import type { CarPlate, Money, Trip, TripPoint } from "../types/trip";

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

const Tip = ({ tip }: { tip: Money }) => (
  <HStack spacing="1.5">
    <Text fontSize="sm">Tip</Text>
    <Text fontWeight="700">{tip.amount}</Text>
    <Text fontSize="sm">{tip.currency}</Text>
  </HStack>
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
  customTimeLocale,
}: {
  start: TripPoint;
  end: TripPoint;
  customTimeLocale?: Intl.DateTimeFormat;
}) => {
  const timeLocale =
    customTimeLocale ??
    Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const startTimeString = timeLocale.format(start.time);
  const endTimeString = timeLocale.format(end.time);

  return (
    <>
      <HStack>
        <FaLocationArrow />
        <Text p="1" fontWeight="600">
          {startTimeString}
        </Text>
        <Text p="1"> {start.location} </Text>
      </HStack>
      <HStack>
        <FaMapMarkerAlt color="red" />
        <Text p="1" fontWeight="600">
          {endTimeString}
        </Text>
        <Text p="1"> {end.location} </Text>
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

export default function TripCard({
  trip,
  customTimeLocale,
  customDateLocale,
}: PropsWithoutRef<{
  trip: Trip;
  customTimeLocale?: Intl.DateTimeFormat;
  customDateLocale?: Intl.DateTimeFormat;
}>) {
  return (
    <Card bgColor="#EEEEEE" m="3" borderRadius="xl">
      <CardHeader bgGradient="linear(#EEEEEE, #E1E1E1)" borderTopRadius="xl">
        <Flex>
          <UserBadge user={trip.user} rating={trip.userRating} />
          <Spacer />
          <Tip tip={trip.tip} />
        </Flex>
      </CardHeader>
      <CardBody py="2">
        <DateRow date={trip.date} customDateLocale={customDateLocale} />
        <TripPointsRows
          start={trip.start}
          end={trip.end}
          customTimeLocale={customTimeLocale}
        />
      </CardBody>
      <CardFooter py="2">
        <HStack>
          <CarPlateCol carPlate={trip.carPlate} />
          <AttachedUserCol attachedUsers={trip.attachedUsers} />
        </HStack>
      </CardFooter>
    </Card>
  );
}
