import { Box, Center, Spinner } from "@chakra-ui/react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
  DirectionsServiceProps,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

interface Props {
  data?: DirectionsServiceProps["options"];
  width?: string;
  height?: string;
  draggable?: boolean;
}

export default function GoogleMapsCard({
  data,
  width = "100%",
  height = "300px",
  draggable = false,
}: Props) {
  const onceRef = useRef(false);
  const [renderData, setRenderData] = useState();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  const [renderReady, setRenderReady] = useState(data ? false : true);

  const directionsCallback = (response: any) => {
    if (!response) {
      console.log("response error: ");
      return;
    }

    if (response.status === "OK") {
      setRenderData(response);
      onceRef.current = true;
    } else {
      console.log("response error: ", response);
    }
  };

  if (!isLoaded) {
    return (
      <Center margin="20px" height={height} borderRadius={"8px"}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box
      margin="20px"
      bg="gray"
      height={height}
      borderRadius={"8px"}
      visibility={renderReady ? "visible" : "hidden"}
    >
      <GoogleMap
        id="direction-example"
        mapContainerStyle={{
          height,
          width,
          borderRadius: "8px",
        }}
        zoom={16}
        center={{ lat: 24.787113353364635, lng: 120.99744584351271 }}
        options={{
          draggable,
          keyboardShortcuts: false,
          mapTypeControl: false,
          clickableIcons: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: false,
        }}
      >
        {!onceRef.current && data && (
          <DirectionsService options={data} callback={directionsCallback} />
        )}
        {renderData && (
          <DirectionsRenderer
            options={{
              directions: renderData,
            }}
            onLoad={() => setRenderReady(true)}
          />
        )}
      </GoogleMap>
    </Box>
  );
}
