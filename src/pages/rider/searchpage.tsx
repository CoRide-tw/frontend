import NestedLayout from "@/modules/layouts/Nested";
import RiderSearchInput from "@/modules/components/RiderSearchInput";
import FindAvailableSection from "@/modules/rider/components/FindAvailableSection";
import { Center } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { authFetcher } from "@/modules/api/fetcher";

const Profile = async () => {
  const router = useRouter();
  const { pickupLocation, dropoffLocation, date, time } = router.query;
  const [pickupRes, dropoffRes] = await Promise.all([
    authFetcher(encodeURI("/google_api/geocoding?text=" + pickupLocation)),
    authFetcher(encodeURI("/google_api/geocoding?text=" + dropoffLocation)),
  ]);
  const [startTime, endTime] = [
    // new Date(`${date} ${time}`),
    new Date("2023-06-04T18:00:00+08:00").toISOString(),
    new Date("2023-06-04T19:00:00+08:00").toISOString(),
  ];

  console.log(startTime);
  console.log(endTime);

  const route = await Promise.all([
    authFetcher(
      encodeURI(
        `/route/ranking?startLong=${pickupRes.lng}&startLat=${pickupRes.lat}&endLong=${dropoffRes.lng}&endLat=${dropoffRes.lat}`
      ) +
        `&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`
    ),
  ]);

  console.log(route[0]);
  
  //  const driver = await Promise.all([
  //    authFetcher(encodeURI("/user/21")),
  //  ]);

  // console.log(encodeURIComponent("2023-06-04T19:00:00+08:00"));

  // return (
  //   <div>
  //     {pickupRes}
  //   </div>
  // );
}

export default function AvailableDrivers() {
  Profile();
  return (
    <NestedLayout title="Available Drivers">
      <RiderSearchInput />
      <FindAvailableSection />
      <Center h="full" color="blackAlpha.600">
        Match not found
      </Center>
    </NestedLayout>
  );
}
