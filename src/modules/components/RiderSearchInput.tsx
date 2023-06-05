import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
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

export default function RiderSearchInput() {
  const toast = useToast();

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const nowTime = Date.now();
  const now = new Date(nowTime);
  const dateValues =
    now.getFullYear().toString().padStart(2, "0") +
    "-" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    now.getDate().toString().padStart(2, "0");
  const timeValues =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");

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

    if (new Date(date).getTime() < nowTime) {
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
    onOpen();

    // search api
  };
  const handleConfirm = () => {
    onClose();
    const href = {
      pathname: path.join("/rider", "search"),
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
      <Button w="100%" bg="black" color="white" onClick={handleSearch}>
        Search
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent margin={"100px 10px"}>
          <GoogleMapsCard
            data={{
              origin: pickupLocation,
              waypoints: [],
              destination: dropoffLocation,
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
            <Text>Pickup Location : {pickupLocation}</Text>
            <Text>Dropoff Location : {dropoffLocation}</Text>
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
