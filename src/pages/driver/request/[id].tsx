import NestedLayout from "@/modules/layouts/Nested";
import { Money, TripPoint } from "@/modules/types/trip";
import { User, UserId, UserRating } from "@/modules/types/user";
import { Avatar, Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import { AiOutlineDollar } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { BsCheckLg, BsStarFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { GoX } from "react-icons/go";
import { authFetcher } from "@/modules/api/fetcher";
import { NextRouter, useRouter, withRouter } from "next/router";
import { Request, RequestId } from "@/modules/types/request";
import { useEffect, useState } from "react";
import { getFirstQuery } from "@/utils/getFirstQuery";
import { getClientCookies } from "@/utils/cookies";

const UserBadge = ({
  userId,
  rating,
  ...props
}: {
  userId: UserId;
  rating?: UserRating;
}) => {
  // TODO: replace mock user
  const mockUser: User = {
    id: 0,
    name: "Jotpac",
    pictureUrl: "",
    email: "abc@example.com",
    googleId: "",
    createdAt: "",
    updatedAt: "",
  };

  const user = mockUser;

  return (
    <Flex alignItems="center" gap="5" {...props}>
      <Avatar src={user.pictureUrl} name={user.name} size="lg" />
      <Flex direction="column" justifyContent="center">
        <Box fontWeight="700" fontSize="20px">
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
      <Flex mt="4" gap="1" alignItems="center">
        <Icon as={BiCurrentLocation} w="6" h="6" />
        <Box fontWeight="700" fontSize="20px">
          {startTimeString}
        </Box>
        <Box pl="2">{start.location}</Box>
      </Flex>
      <Flex mt="2" gap="1" alignItems="center">
        <Icon as={HiLocationMarker} w="6" h="6" color="red" />
        <Box fontWeight="700" fontSize="20px">
          {endTimeString}
        </Box>
        <Box pl="2">{end.location}</Box>
      </Flex>
    </>
  );
};

const Tip = ({ tip }: { tip: Money }) => (
  <Flex mt="2" gap="1" alignItems="center">
    <Icon as={AiOutlineDollar} w="6" h="6" />
    <Box fontWeight="700" fontSize="20px">
      {tip.amount} {tip.currency}
    </Box>
  </Flex>
);

const ActionRow = ({ request }: { request: Request }) => {
  const router = useRouter();

  const acceptRequest = async ({ request }: { request: Request }) => {
    const { userId } = getClientCookies();

    try {
      await authFetcher("/trip", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          riderId: request.riderId,
          driverId: Number(userId),
          requestId: request.id,
          routeId: request.routeId,
        }),
      });

      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const denyRequest = async ({ request }: { request: Request }) => {
    try {
      await authFetcher(`/request/${request.id}/status`, {
        method: "PATCH",
      });

      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex gap="5" mt="7">
      <IconButton
        icon={<Icon as={GoX} w="6" h="6" color="red" />}
        aria-label={""}
        flex="1"
        variant="outline"
        py="3"
        onClick={() => denyRequest({ request })}
      />
      <IconButton
        icon={<Icon as={BsCheckLg} w="6" h="6" color="green" />}
        aria-label={""}
        flex="1"
        variant="outline"
        py="3"
        onClick={() => acceptRequest({ request })}
      />
    </Flex>
  );
};

const fetchRequest = async (requestId: RequestId) => {
  return await authFetcher(`/request/${requestId}`);
};

function DriverRequestDetailPage({ router }: { router: NextRouter }) {
  const [request, setRequest] = useState<Request>();

  useEffect(() => {
    if (!router.query.id) return;

    fetchRequest(Number(getFirstQuery(router.query.id))).then((ret) =>
      setRequest(ret)
    );
  }, [router]);

  if (!request) return <>Loading...</>;

  const tripStart: TripPoint = {
    location: `${request.pickupLong}, ${request.pickupLat}`,
    time: new Date(request.pickupStartTime),
  };

  const tripEnd: TripPoint = {
    location: `${request.dropoffLong}, ${request.dropoffLat}`,
    time: new Date(request.pickupEndTime),
  };

  const tip: Money = {
    amount: 40,
    currency: "NT",
  };

  return (
    <NestedLayout title="Agree or reject">
      <Box mx="8">
        <UserBadge userId={request.riderId} />
        <TripPointsRows start={tripStart} end={tripEnd} />
        <Tip tip={tip} />
        <ActionRow request={request} />
      </Box>
    </NestedLayout>
  );
}

export default withRouter(DriverRequestDetailPage);
