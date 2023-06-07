import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

interface Props {
  vehicle: Vehicle;
  setVehicle: Dispatch<SetStateAction<Vehicle>>;
}

export default function SavedVehicle({ vehicle, setVehicle }: Props) {
  const handleChange = ({ type, value }: { type: string; value: string }) => {
    let newVehicle = { ...vehicle };
    if (type == "carType") newVehicle.carType = value;
    if (type == "carPlate") newVehicle.carPlate = value;

    setVehicle(newVehicle);
    console.log(vehicle);
  };

  return (
    <Box marginBottom="40px">
      <Box>
        <Text fontWeight="600">Your vehicle</Text>
      </Box>

      <FormControl>
        <FormLabel color="gray.500">Vehicle Type</FormLabel>
        <InputGroup>
          <Input
            value={vehicle.carType}
            onChange={(e) =>
              handleChange({
                type: "carType",
                value: e.target.value,
              })
            }
          />
          <InputRightElement>
            <HiOutlineSwitchHorizontal />
          </InputRightElement>
        </InputGroup>

        <FormLabel color="gray.500">Number</FormLabel>
        <Input
          value={vehicle.carPlate}
          onChange={(e) =>
            handleChange({
              type: "carPlate",
              value: e.target.value,
            })
          }
        />
      </FormControl>
    </Box>
  );
}
