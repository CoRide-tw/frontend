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

type Vehicle = {
  car: string;
  num: string;
};
interface Props {
  vehicle: Vehicle;
  setVehicle: Dispatch<SetStateAction<Vehicle>>;
}

export default function SavedVehicle({ vehicle, setVehicle }: Props) {
  const handleChange = ({ type, value }: { type: string; value: string }) => {
    let newVehicle = { ...vehicle };
    if (type == "car") newVehicle.car = value;
    if (type == "num") newVehicle.num = value;
    console.log(newVehicle);
    setVehicle(newVehicle);
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
            value={vehicle.car}
            onChange={(e) =>
              handleChange({
                type: "car",
                value: e.target.value,
              })
            }
          />
          <InputRightElement children={<HiOutlineSwitchHorizontal />} />
        </InputGroup>

        <FormLabel color="gray.500">Number</FormLabel>
        <Input
          value={vehicle.num}
          onChange={(e) =>
            handleChange({
              type: "num",
              value: e.target.value,
            })
          }
        />
      </FormControl>
    </Box>
  );
}
