import GoogleMapsCard from "../GoogleMapsCard";
import { DirectionsServiceProps } from "@react-google-maps/api";

interface Props {
  origin?: string;
  destination?: string;
}

export default function Maps({ origin, destination }: Props) {
  if (!origin || !destination) return null;

  return (
    <GoogleMapsCard
      data={{
        origin,
        waypoints: [],
        destination,
        travelMode:
          "DRIVING" as DirectionsServiceProps["options"]["travelMode"],
      }}
      draggable={true}
      width="100%"
      height="100%"
    />
  );
}
