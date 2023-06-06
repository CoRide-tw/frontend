import { useRequests } from "@/modules/api/swr/useRequests";
import NestedLayout from "@/modules/layouts/Nested";
import { Box, Center, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PropsWithoutRef, useEffect, useMemo, useState } from "react";
import { getFirstQuery } from "@/utils/getFirstQuery";
import TripCard from "@/modules/components/TripCard";
import { Request } from "@/modules/types/request";
import { Trip } from "@/modules/types/trip";
import Link from "next/link";
import { User } from "@/modules/types/user";

const Card = ({ request }: PropsWithoutRef<{ request: Request }>) => {
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

  const trip: Trip = {
    user: mockUser,
    tip: { amount: 65, currency: "NTD" },
    date: new Date(request.pickupStartTime),
    start: {
      location: `${request.pickupLong}, ${request.pickupLat}`,
      time: new Date(request.pickupStartTime),
    },
    end: {
      location: `${request.dropoffLong}, ${request.dropoffLat}`,
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

  const cards = requests.map((request: Request, index) => (
    <Link key={index} href={`/driver/request/${request.id}`}>
      <Card request={request} />
    </Link>
  ));

  return <>{cards}</>;
};

export default function RequestsListView() {
  const router = useRouter();
  const toast = useToast();
  const [newQuery, setNewQuery] = useState(true);

  useEffect(() => {
    if (router.query.new === "1" && newQuery) {
      toast({
        title: "Share Success",
        status: "success",
        duration: 1600,
        position: "bottom",
      });

      setNewQuery(false);
    }
  }, [router.query]);

  return (
    <NestedLayout title="Driver List">
      {router.query.routeId === undefined ? null : (
        <RequestCards routeId={getFirstQuery(router.query.routeId) as string} />
      )}
    </NestedLayout>
  );
}
