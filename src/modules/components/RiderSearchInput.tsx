import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import GoogleMapsCard from "./GoogleMapsCard";
import { DirectionsServiceProps } from "@react-google-maps/api";
import path from "path";
import { useRouter } from "next/router";
import { authFetcher } from "../api/fetcher";
type Address = {
  lat: number;
  lng: number;
  address: string;
};
type Data = {
  pickup?: Address;
  dropoff?: Address;
  date?: string;
  time?: string;
  tips?: string;
};
export default function RiderSearchInput() {
  const toast = useToast();
  const now = new Date(Date.now());
  const dateValues =
    now.getFullYear().toString().padStart(4, "0") +
    "-" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    now.getDate().toString().padStart(2, "0");
  const timeValues =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    (now.getMinutes() + 1).toString().padStart(2, "0");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState(dateValues);
  const [time, setTime] = useState(timeValues);
  const [tips, setTips] = useState<string | undefined>();
  const [resData, setResData] = useState<Data>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleSearch = async () => {
    // check if the input is valid

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

    if (new Date(date + time).getTime() < Date.now()) {
      toast({
        position: "top",
        title: "Search Time Error",
        description: "Please select a valid date",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const [pickupRes, dropoffRes] = await Promise.all([
      authFetcher(encodeURI("/google_api/geocoding?text=" + pickupLocation)),
      authFetcher(encodeURI("/google_api/geocoding?text=" + dropoffLocation)),
    ]);

    if (
      pickupRes.lat == "" ||
      pickupRes.lng == "" ||
      dropoffRes.lat == "" ||
      dropoffRes.lng == ""
    ) {
      toast({
        position: "top",
        title: "Search Error",
        description: "Please enter a valid address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setResData({
      pickup: {
        lat: pickupRes.lat,
        lng: pickupRes.lng,
        address: pickupRes.address,
      },
      dropoff: {
        lat: dropoffRes.lat,
        lng: dropoffRes.lng,
        address: dropoffRes.address,
      },
      date: date,
      time: time,
      tips: tips,
    });

    onOpen();
  };
  const handleConfirm = () => {
    onClose();
    const href = {
      pathname: path.join("/rider", "searchpage"),
      query: {
        pickupLocation: pickupLocation,
        dropoffLocation: dropoffLocation,
        date: date,
        time: time,
      },
    };
    router.push(href);
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
        <Divider />

        <Input
          type="number"
          placeholder="Enter your anticipated tips"
          border="white"
          color="black"
          value={tips}
          onChange={(e) => {
            setTips(e.target.value);
          }}
        />
      </Box>
      <Center height="30px" margin="10px">
        <Input
          placeholder="Select Date "
          type="date"
          width="50%"
          border="none"
          onChange={(e) => setDate(e.target.value)}
          defaultValue={dateValues}
        />
        <Divider orientation="vertical" />
        <Input
          placeholder="Select Time"
          type="time"
          width="50%"
          border="none"
          onChange={(e) => setTime(e.target.value)}
          defaultValue={timeValues}
        />
      </Center>
      <Button w="100%" onClick={handleSearch}>
        Search
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent margin={"100px 10px"}>
          <GoogleMapsCard
            data={{
              origin: resData?.pickup?.lat + "," + resData?.pickup?.lng,
              waypoints: [],
              destination: resData?.dropoff?.lat + "," + resData?.dropoff?.lng,
              travelMode:
                "DRIVING" as DirectionsServiceProps["options"]["travelMode"],
            }}
            draggable={true}
            width="100%"
          />
          <ModalCloseButton />
          <Flex
            direction={"column"}
            margin={"10px 20px"}
            gap={2}
            color={"gray.500"}
          >
            <Text>
              Pickup Location : <br />
              {resData?.pickup?.address}
            </Text>
            <Text>
              Dropoff Location : <br />
              {resData?.dropoff?.address}
            </Text>
            <Text>
              Time : {date} {time}
            </Text>
          </Flex>

          <ModalFooter width={"100%"}>
            <Button onClick={handleConfirm} width={"100%"}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
