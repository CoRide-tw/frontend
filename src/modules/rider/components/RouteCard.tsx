import { RouteResponse } from "@/modules/types/route";
import { Box, Text } from "@chakra-ui/react";

// sample data format
// {
//     "id": 9,
//     "driverId": 34,
//     "startLong": 120.99037397130422,
//     "startLat": 24.77531233261688,
//     "endLong": 120.99776487500324,
//     "endLat": 24.78716874568955,
//     "startTime": "2023-06-08T10:00:00Z",
//     "endTime": "2023-06-08T11:00:00Z",
//     "capacity": 5,
//     "createdAt": "2023-06-06T14:56:06.359793Z",
//     "updatedAt": "2023-06-06T14:56:06.359793Z"
// }

interface Props {
  data: RouteResponse;
}

export default function RouteCard({ data }: Props) {
  return (
    <Box>
      <Text>{data.driverId}</Text>
      <Text>{data.driverId}</Text>
    </Box>
  );
}
