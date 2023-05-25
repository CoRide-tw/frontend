import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Input,
  useToast,
} from "@chakra-ui/react";

export default function RiderSearchInput() {
  const toast = useToast();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const handleSearch = () => {
    if (pickupLocation === "" || dropoffLocation === "" || !date || !time) {
      toast({
        position: "top",
        title: "Search Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    // search api
  };

  return (
    <Box margin="20px">
      <Box borderRadius="5px" border="1px" color="gray.200">
        <Input
          placeholder="Pickup Location"
          border="white"
          color="black"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        />
        <Divider />
        <Input
          placeholder="Dropoff Location"
          border="white"
          color="black"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
        />
      </Box>
      <Center height="30px" margin="10px">
        <Input
          placeholder="Select Date "
          type="date"
          width="50%"
          border="none"
          onChange={(e) => setDate(e.target.value)}
        />
        <Divider orientation="vertical" />
        <Input
          placeholder="Select Time"
          type="time"
          width="50%"
          border="none"
          onChange={(e) => setTime(e.target.value)}
        />
      </Center>
      <Button w="100%" bg="black" color="white" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}
