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
      return;
    }

    if (response.status === "OK") {
      setRenderData(response);
      onceRef.current = true;
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
      width={width}
      bg="gray"
      height={height}
      borderRadius={"8px"}
      visibility={renderReady ? "visible" : "hidden"}
    >
      <GoogleMap
        id="direction-example"
        mapContainerStyle={{
          height,
          borderRadius: "8px",
        }}
        zoom={16}
        center={{ lat: 24.788210986554585, lng: 120.99751811534229 }}
        options={{
          draggable,
          keyboardShortcuts: false,
          gestureHandling: "none",
          mapTypeControl: false,
          clickableIcons: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: false,
          styles: [
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },

            {
              featureType: "transit.line",
              elementType: "geometry",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry.fill",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry.fill",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "landscape.natural.landcover",
              elementType: "geometry.fill",
              stylers: [{ visibility: "off" }],
            },

            {
              featureType: "poi",
              elementType: "labels.text",
              stylers: [{ visibility: "off" }],
            },

            {
              featureType: "poi",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },

            {
              featureType: "administrative",
              elementType: "labels.text",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "administrative",
              elementType: "geometry.fill",
              stylers: [{ visibility: "off" }],
            },

            {
              featureType: "road.highway",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ visibility: "off" }],
            },
          ],
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
