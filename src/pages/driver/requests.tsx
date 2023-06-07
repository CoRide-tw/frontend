import { useRequests } from "@/modules/api/swr/useRequests";
import NestedLayout from "@/modules/layouts/Nested";
import { Box, Center, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PropsWithoutRef, useEffect, useRef } from "react";
import { getFirstQuery } from "@/utils/getFirstQuery";
import TripCard from "@/modules/components/TripCard";
import { Request } from "@/modules/types/request";
import { Trip } from "@/modules/types/trip";
import Link from "next/link";
import { UserDisplay } from "@/modules/types/user";
import { useGeolocationToAddress } from "@/modules/api/swr/useGeolocationToAddress";

const Card = ({ request }: PropsWithoutRef<{ request: Request }>) => {
  const user: UserDisplay = {
    name: request.riderName,
    pictureUrl: request.riderPictureUrl,
  };

  const { address: pickupAddress } = useGeolocationToAddress({
    lat: request.pickupLat,
    lng: request.pickupLong,
  });
  const { address: dropoffAddress } = useGeolocationToAddress({
    lat: request.dropoffLat,
    lng: request.dropoffLong,
  });

  const trip: Trip = {
    user,
    tip: { amount: request.tips, currency: "NTD" },
    date: new Date(request.pickupStartTime),
    start: {
      location: pickupAddress,
      time: new Date(request.pickupStartTime),
    },
    end: {
      location: dropoffAddress,
      time: new Date(request.pickupEndTime),
    },
  };

  return <TripCard trip={trip} />;
};

const RequestCards = ({ routeId }: { routeId: string }) => {
  const { requests } = useRequests({ routeId });

  if (!requests || requests.length === 0)
    return (
      <Center h="full" color="blackAlpha.600">
        No Rider Request
      </Center>
    );

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );

  const cards = pendingRequests.map((request: Request, index) => (
    <Link key={index} href={`/driver/request/${request.id}?routeId=${routeId}`}>
      <Card request={request} />
    </Link>
  ));

  return <>{cards}</>;
};

export default function RequestsListView() {
  const router = useRouter();
  const toast = useToast();

  const toastShown = useRef(false);

  useEffect(() => {
    if (toastShown.current === false && router.query.new === "1") {
      toastShown.current = true;
      toast({
        title: "Share Success",
        status: "success",
        duration: 1600,
        position: "bottom",
      });

      history.replaceState(
        null,
        "",
        `/driver/requests?routeId=${router.query.routeId}`
      );
    }
  }, []);

  return (
    <NestedLayout title="Driver List">
      {router.query.routeId === undefined ? null : (
        <RequestCards routeId={getFirstQuery(router.query.routeId) as string} />
      )}
    </NestedLayout>
  );
}
