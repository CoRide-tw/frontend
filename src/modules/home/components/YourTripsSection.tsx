import { Box, Flex, Text } from "@chakra-ui/react";

import GoogleMapsCard from "@/modules/components/GoogleMapsCard";
import { DirectionsServiceProps } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdModeStandby } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import { useTrips } from "@/modules/api/swr/useTrips";
import { useGeolocationToAddress } from "@/modules/api/swr/useGeolocationToAddress";
import { formatDateTime } from "@/utils/formatTime";

//request data
const data = {
  origin: "新北市政府",
  waypoints: [
    {
      location: "中正紀念堂",
    },
    {
      location: "國父紀念館",
    },
  ],
  destination: "台北市政府",
  travelMode: "DRIVING" as DirectionsServiceProps["options"]["travelMode"],
  time: "18:00",
  date: "2023-05-23",
};

//parse data for GoogleMapsCard
const gMapData = {
  origin: data.origin,
  waypoints: data.waypoints,
  destination: data.destination,
  travelMode: data.travelMode,
};

export default function YourTripsSection() {
  const { data: tripData } = useTrips();

  const sortedTrip = tripData?.rider || tripData?.driver;
  const data = sortedTrip?.[0];

  const { address: origin } = useGeolocationToAddress({
    lat: data?.routeStartLocationLat || 0,
    lng: data?.routeStartLocationLng || 0,
  });
  const { address: pickup } = useGeolocationToAddress({
    lat: data?.pickupLocationLat || 0,
    lng: data?.pickupLocationLng || 0,
  });
  const { address: dropoff } = useGeolocationToAddress({
    lat: data?.dropoffLocationLat || 0,
    lng: data?.dropoffLocationLng || 0,
  });
  const { address: destination } = useGeolocationToAddress({
    lat: data?.routeEndLocationLat || 0,
    lng: data?.routeEndLocationLng || 0,
  });
  const startTime = formatDateTime(new Date(data?.routeStartTime || ""));
  const endTime = formatDateTime(new Date(data?.routeEndTime || ""));

  if (!data)
    return (
      <Box margin="20px">
        <Text fontSize="xl" fontWeight={"600"} margin={"10px 0"}>
          Your Current Trip
        </Text>
        <Box>
          <Text color="gray.500">You have not established a trip yet</Text>
        </Box>
      </Box>
    );

  return (
    <Box margin="20px">
      <Text fontSize="xl" fontWeight={"600"} margin={"10px 0"}>
        Your Current Trip
      </Text>

      <Flex
        border={"1px solid"}
        borderRadius={"10px"}
        borderColor={"gray.300"}
        direction={"column"}
        padding={"12px"}
      >
        <GoogleMapsCard
          data={{
            origin: `${data.routeStartLocationLat},${data.routeStartLocationLng}`,
            destination: `${data.routeEndLocationLat},${data.routeEndLocationLng}`,
            waypoints: [
              {
                location: {
                  lat: data.pickupLocationLat,
                  lng: data.pickupLocationLng,
                },
              },
              {
                location: {
                  lat: data.dropoffLocationLat,
                  lng: data.dropoffLocationLng,
                },
              },
            ],
            travelMode:
              "DRIVING" as DirectionsServiceProps["options"]["travelMode"],
          }}
          height="150px"
        />
        <Flex direction="column" gap="2px" margin="8px">
          <Text fontSize={"sm"} color="gray.500">
            Departure: {startTime.date} {startTime.time}
          </Text>
          <Text fontSize={"sm"} color="gray.500">
            Arrival: {endTime.date} {endTime.time}
          </Text>
        </Flex>
        <Flex padding={"5px 0px"} gap="4" align="center">
          <MdModeStandby size="20px" />
          <Text fontSize={"xs"}>{origin}</Text>
        </Flex>
        <Flex padding={"5px 0px"} gap="4" align="center">
          <RxDividerVertical size="20px" />
          <Text fontSize={"xs"}>{pickup}</Text>
        </Flex>
        <Flex padding={"5px 0px"} gap="4" align="center">
          <RxDividerVertical size="20px" />
          <Text fontSize={"xs"}>{dropoff}</Text>
        </Flex>
        <Flex padding={"5px 0px"} gap="4" align="center">
          <FaMapMarkerAlt size="20px" />
          <Text fontSize={"xs"}>{destination}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
