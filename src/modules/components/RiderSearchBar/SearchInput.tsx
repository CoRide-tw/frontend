import { formatDateTime } from "@/utils/formatTime";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { authFetcher } from "@/modules/api/fetcher";

type Geocoding = {
  lat: string;
  lng: string;
};
type DateTime = {
  date: string;
  time: string;
};

interface Props {
  pickupLocation: string;
  setPickupLocation: Dispatch<SetStateAction<string>>;
  dropoffLocation: string;
  setDropoffLocation: Dispatch<SetStateAction<string>>;
  setPickupLocGeocoding: Dispatch<SetStateAction<Geocoding | undefined>>;
  setDropoffLocGeocoding: Dispatch<SetStateAction<Geocoding | undefined>>;
  tips: string;
  setTips: Dispatch<SetStateAction<string>>;
  startDateTime: DateTime;
  setStartDateTime: Dispatch<SetStateAction<DateTime>>;
  endDateTime: DateTime;
  setEndDateTime: Dispatch<SetStateAction<DateTime>>;
}

export default function SearchInput({
  pickupLocation,
  setPickupLocation,
  dropoffLocation,
  setDropoffLocation,
  setPickupLocGeocoding,
  setDropoffLocGeocoding,
  tips,
  setTips,
  startDateTime,
  setStartDateTime,
  endDateTime,
  setEndDateTime,
}: Props) {
  const debouncedSearchPickup = useMemo(() => {
    return debounce(async (address: string) => {
      const res = await authFetcher(
        encodeURI("/google_api/geocoding?text=" + address)
      );
      setPickupLocGeocoding(res);
    }, 2000);
  }, [setPickupLocGeocoding]);
  const debouncedSearchDropoff = useMemo(() => {
    return debounce(async (address: string) => {
      const res = await authFetcher(
        encodeURI("/google_api/geocoding?text=" + address)
      );
      setDropoffLocGeocoding(res);
    }, 2000);
  }, [setDropoffLocGeocoding]);

  return (
    <Flex direction="column" gap="4px">
      <Input
        height="30px"
        borderRadius="5px"
        border="1px"
        borderColor="gray.200"
        placeholder="Pickup Location"
        value={pickupLocation}
        onChange={(e) => {
          setPickupLocation(e.target.value);
          debouncedSearchPickup(e.target.value);
        }}
      />

      <Input
        height="30px"
        borderRadius="5px"
        border="1px"
        borderColor="gray.200"
        placeholder="Dropoff Location"
        value={dropoffLocation}
        onChange={(e) => {
          setDropoffLocation(e.target.value);
          debouncedSearchDropoff(e.target.value);
        }}
      />
      <Input
        height="30px"
        borderRadius="5px"
        border="1px"
        borderColor="gray.200"
        type="number"
        placeholder="Tips"
        value={tips}
        onChange={(e) => {
          setTips(e.target.value);
        }}
      />

      <Flex direction="column" mt="8px" gap="2px">
        <Text fontSize="sm" color="gray.500">
          Pickup time range:
        </Text>
        <Flex gap="4px" align="center">
          <Box>
            <Text fontSize="sm" color="gray.500" w="40px">
              From
            </Text>
          </Box>
          <Input
            height="30px"
            placeholder="Select Date"
            type="date"
            value={startDateTime.date}
            onChange={(e) => {
              setStartDateTime((prev) => ({ ...prev, date: e.target.value }));
            }}
          />
          <Input
            height="30px"
            placeholder="Select Time"
            type="time"
            value={startDateTime.time}
            onChange={(e) => {
              setStartDateTime((prev) => ({ ...prev, time: e.target.value }));
            }}
          />
        </Flex>

        <Flex gap="4px" align="center">
          <Box>
            <Text fontSize="sm" color="gray.500" w="40px">
              To
            </Text>
          </Box>
          <Input
            height="30px"
            placeholder="Select Date"
            type="date"
            value={endDateTime.date}
            onChange={(e) => {
              setEndDateTime((prev) => ({ ...prev, date: e.target.value }));
            }}
          />
          <Input
            height="30px"
            placeholder="Select Time"
            type="time"
            value={endDateTime.time}
            onChange={(e) => {
              setEndDateTime((prev) => ({ ...prev, time: e.target.value }));
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
