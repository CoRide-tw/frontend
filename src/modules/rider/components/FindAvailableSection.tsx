import { Box, Flex, Text, Divider } from "@chakra-ui/react";
import AvailableDriverCard from "@/modules/components/AvailableDriverCard";
import TripCard from "@/modules/components/TripCard";
import { User } from "@/modules/types/user";
import { Trip } from "@/modules/types/trip";


// request data

const trip: Trip = {
  user: {
    name: "Eric Chen",
    pictureUrl: "https://bit.ly/sage-adebayo",
  },
  userRating: 3.8,
  date: new Date("2023-05-23"),
  tip: {
    amount: 65,
    currency: "NTD",
  },
  start: {
    location: "TSMC 5",
    time: new Date("2023-05-23 18:30"),
  },
  end: {
    location: "Home",
    time: new Date("2023-05-23 18:55"),
  },
  carPlate: "XXX-1234",
};

export default function FindAvailableSection() {
  return (
    <Box margin="20px">
      <Text fontSize="xl" fontWeight={"600"} margin={"10px 0"}>
        Best Matches
      </Text>

      <Divider />
      
      <TripCard trip={trip} />
    </Box>
  );
}
