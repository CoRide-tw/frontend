import GoogleMapsCard from "../GoogleMapsCard";
import { DirectionsServiceProps } from "@react-google-maps/api";

interface Props {
  origin?: string;
  destination?: string;
}

export default function Maps({ origin, destination }: Props) {
  const data =
    origin && destination
      ? {
          origin,
          waypoints: [],
          destination,
          travelMode:
            "DRIVING" as DirectionsServiceProps["options"]["travelMode"],
        }
      : undefined;

  return (
    <GoogleMapsCard data={data} draggable={true} width="100%" height="100%" />
  );
}
