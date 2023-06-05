import HistoryTripCard from "@/modules/profile/components/HistoryTripCard";
import TripCard from "@/modules/profile/components/HistoryTripCard";
import { Box, Text } from "@chakra-ui/react";

const PreviousTripData = [
  {
    destination: "No.18, Rd.Gao Cui, HsinChu",
    startLocation: "No.1001, Rd.University, HsinChu",
    startTime: "18:30",
    date: "April 22",
    type: "DRIVING",
    price: "NT$100",
  },
];

export default function HistoryPosts() {
  return (
    <Box padding={"20px"}>
      <Text fontWeight="700" fontSize="20px" margin="5px">
        Previous Trips
      </Text>

      {PreviousTripData.map((item, index) => (
        <HistoryTripCard key={index} info={item} />
      ))}
    </Box>
  );
}
