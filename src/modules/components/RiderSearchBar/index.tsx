import { useState } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { formatDateTime } from "@/utils/formatTime";
import SearchInput from "./SearchInput";
import Maps from "./Maps";
import { useRiderSearchInput } from "./store";

type Geocoding = {
  lat: string;
  lng: string;
};

export default function RiderSearchBar() {
  const toast = useToast();

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupLocGeocoding, setPickupLocGeocoding] = useState<
    Geocoding | undefined
  >();
  const [dropoffLocGeocoding, setDropoffLocGeocoding] = useState<
    Geocoding | undefined
  >();
  const now = new Date();

  const [tips, setTips] = useState("");
  const [startDateTime, setStartDateTime] = useState(formatDateTime(now));
  const [endDateTime, setEndDateTime] = useState(
    formatDateTime(new Date(now.getTime() + 30 * 60 * 1000))
  );

  const router = useRouter();

  const isInputValid =
    pickupLocGeocoding &&
    pickupLocGeocoding &&
    tips &&
    startDateTime &&
    endDateTime;

  const { setInputState } = useRiderSearchInput();

  const handleSearch = async () => {
    const startTime = new Date(
      new Date(startDateTime.date + " " + startDateTime.time).getTime()
    ).toISOString();
    const endTime = new Date(
      new Date(endDateTime.date + " " + endDateTime.time).getTime()
    ).toISOString();

    if (startTime > endTime) {
      toast({
        position: "top",
        title: "Invalid time range",
        description: "Start time must be earlier than end time",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (endTime < new Date().toISOString()) {
      toast({
        position: "top",
        title: "Invalid time range",
        description: "End time must be later than current time",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!Number(tips)) {
      toast({
        position: "top",
        title: "Invalid tips",
        description: "Please enter a valid tips",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!pickupLocGeocoding?.lng || !pickupLocGeocoding?.lat) {
      toast({
        position: "top",
        title: "Invalid pickup location",
        description: "Please enter a valid pickup location",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!dropoffLocGeocoding?.lng || !dropoffLocGeocoding?.lat) {
      toast({
        position: "top",
        title: "Invalid dropoff location",
        description: "Please enter a valid dropoff location",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setInputState({
      pickupLocationInput: pickupLocation,
      dropoffLocationInput: dropoffLocation,
      pickupLong: Number(pickupLocGeocoding?.lng),
      pickupLat: Number(pickupLocGeocoding?.lat),
      dropoffLong: Number(dropoffLocGeocoding?.lng),
      dropoffLat: Number(dropoffLocGeocoding?.lat),
      pickupStartTime: startTime,
      pickupEndTime: endTime,
      tips: Number(tips),
    });

    router.push("/rider/search/result");
  };

  return (
    <Box position="relative">
      <Box height="100vh" paddingTop="200px">
        <Maps
          origin={`${pickupLocGeocoding?.lat}, ${pickupLocGeocoding?.lng}`}
          destination={`${dropoffLocGeocoding?.lat}, ${dropoffLocGeocoding?.lng}`}
        />
      </Box>

      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        bg="white"
        padding="20px"
        borderRadius="0 0 16px 16px"
      >
        <SearchInput
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          dropoffLocation={dropoffLocation}
          setDropoffLocation={setDropoffLocation}
          setPickupLocGeocoding={setPickupLocGeocoding}
          setDropoffLocGeocoding={setDropoffLocGeocoding}
          tips={tips}
          setTips={setTips}
          startDateTime={startDateTime}
          setStartDateTime={setStartDateTime}
          endDateTime={endDateTime}
          setEndDateTime={setEndDateTime}
        />
      </Box>

      <Box position="absolute" bottom="20px" left="0" padding="20px" w="100%">
        <Button
          w="100%"
          borderRadius="10px"
          bgGradient={
            isInputValid
              ? "linear(to-r, #8E2DE2 30%, #4A00E0 100%)"
              : "linear(to-r, #ccc, #ccc)"
          }
          variant={"colorful"}
          disabled={!isInputValid}
          onClick={handleSearch}
        >
          Search For Your Ride
        </Button>
      </Box>
    </Box>
  );
}
