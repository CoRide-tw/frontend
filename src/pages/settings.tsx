import { Box, Text, Button, Flex } from "@chakra-ui/react";

import { useState } from "react";
import NestedLayout from "@/modules/layouts/Nested";

import SavedVehicle from "@/modules/settings/components/SavedVehicle";

const locationData = [
  {
    address: "No.187, Rd.Gao cui,Dist. East, Hsinchu",
    alias: "Dorm",
  },
  {
    address: "No.1001, Rd.University,Dist. East, Hsinchu",
    alias: "School",
  },
];

const vehicleData = {
  car: "Model 3",
  num: "123-XXXX",
};

export default function SettingsPage() {
  const [location, setLocation] = useState(locationData);
  const [vehicle, setVehicle] = useState(vehicleData);

  return (
    <NestedLayout title="Settings">
      <Box margin="20px">
        <SavedVehicle vehicle={vehicle} setVehicle={setVehicle} />
        <Button width={"full"}>Confirm</Button>
      </Box>
    </NestedLayout>
  );
}
