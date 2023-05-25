import { Box, Flex, Text } from "@chakra-ui/react";

import GoogleMapsCard from "@/modules/components/GoogleMapsCard";
import { DirectionsServiceProps } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdModeStandby } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";

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
  return (
    <Box margin="20px">
      <Text fontSize="xl" fontWeight={"600"} margin={"10px 0"}>
        Current Trip
      </Text>

      <Flex
        border={"1px solid"}
        borderRadius={"10px"}
        borderColor={"gray.300"}
        direction={"column"}
        padding={"12px"}
      >
        <GoogleMapsCard data={gMapData} height="150px" />
        <Text padding={"10px 0px"} color={"gray.400"}>
          {data.date}
          {"・"}
          {data.time}
        </Text>
        <Flex padding={"5px 0px"} gap="4">
          <MdModeStandby size="20px" />
          <Text fontSize={"sm"}>{data.origin}</Text>
        </Flex>
        {data.waypoints.map((waypoint, index) => (
          <Flex padding={"5px 0px"} key={index} gap="4">
            <RxDividerVertical size="20px" />
            <Text fontSize={"sm"}>{waypoint.location}</Text>
          </Flex>
        ))}
        <Flex padding={"5px 0px"} gap="4">
          <FaMapMarkerAlt size="20px" />
          <Text fontSize={"sm"}>{data.destination}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
