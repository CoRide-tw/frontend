import { Avatar, AvatarGroup, Box, Flex, Icon } from "@chakra-ui/react";
import { PropsWithoutRef } from "react";

import { BiCurrentLocation } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { IoCarSportSharp } from "react-icons/io5";
import { BsStarFill } from "react-icons/bs";

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
  <Flex alignItems="center" gap="5" {...props}>
    <Avatar src={user.avatarSrc?.href} name={user.name} size="md" />
    <Flex direction="column" justifyContent="center">
      <Box fontWeight="600" lineHeight="16px">
        {user.name}
      </Box>
      {rating ? (
        <Flex alignItems="center" gap="1">
          <Icon as={BsStarFill} w="4" h="4" />
          <Box lineHeight="16px">{rating}</Box>
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  </Flex>
);

const Tip = ({ tip }: { tip: Money }) => (
  <Flex>
    tip {tip.amount} {tip.currency}
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
    <Box mt="3" fontWeight="600">
      {dateString}
    </Box>
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
    });

  const startTimeString = timeLocale.format(start.time);
  const endTimeString = timeLocale.format(end.time);

  return (
    <>
      <Flex mt="4" gap="1">
        <Icon as={BiCurrentLocation} w="6" h="6" />
        {startTimeString}
        <Box pl="2">{start.location}</Box>
      </Flex>
      <Flex mt="2" gap="1">
        <Icon as={HiLocationMarker} w="6" h="6" color="red" />
        {endTimeString}
        <Box pl="2">{end.location}</Box>
      </Flex>
    </>
  );
};

const CarPlateCol = ({ carPlate }: { carPlate?: CarPlate }) => {
  if (carPlate === undefined) return <></>;

  return (
    <>
      <Icon as={IoCarSportSharp} w="6" h="6" />
      {carPlate}
    </>
  );
};

const AttachedUserCol = ({ attachedUsers }: { attachedUsers?: User[] }) => {
  if (attachedUsers === undefined) return <></>;

  const avatars = attachedUsers.map((user, index) => (
    <Avatar key={index} name={user.name} src={user.avatarSrc?.href} size="xs" />
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
    <Box borderRadius="10px" bgColor="#EEE" p="16px">
      <Flex justifyContent="space-between" alignItems="center">
        <UserBadge user={trip.user} rating={trip.userRating} />
        <Tip tip={trip.tip} />
      </Flex>
      <DateRow date={trip.date} customDateLocale={customDateLocale} />
      <TripPointsRows
        start={trip.start}
        end={trip.end}
        customTimeLocale={customTimeLocale}
      />
      <Flex
        display={trip.carPlate || trip.attachedUsers ? "flex" : "none"}
        mt="2"
        gap="1"
      >
        <CarPlateCol carPlate={trip.carPlate} />
        <AttachedUserCol attachedUsers={trip.attachedUsers} />
      </Flex>
    </Box>
  );
}
