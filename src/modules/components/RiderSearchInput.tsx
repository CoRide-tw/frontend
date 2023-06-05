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
import Link from "next/link";
import path from "path";

export default function RiderSearchInput() {
  const toast = useToast();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    onOpen();

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody margin={"30px 0 0"}>
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
              margin={"10px 0"}
              gap={2}
              color={"gray.500"}
            >
              <Text>Pickup Location : {pickupLocation}</Text>
              <Text>Dropoff Location : {dropoffLocation}</Text>
              <Text>
                Time : {date} {time}
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Link
              href={{
                pathname: path.join("/rider", "search"),
                query: {
                  pickupLocation: pickupLocation,
                  dropoffLocation: dropoffLocation,
                  date: date,
                  time: time,
                },
              }}
            >
              <Button mr={3} onClick={onClose} width={"100%"} margin={0}>
                Confirm
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
