import { useState } from "react";

export default function getAddress({ lat, lng }: { lat: number; lng: number }) {
  const coord = new google.maps.LatLng(lat, lng);
  const geocoder = new google.maps.Geocoder();
  const [address, setAddress] = useState("");
  geocoder.geocode({ location: coord }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      let result = results![0];
      let rsltAdrComponent = result.address_components;
      if (result != null) {
        const address_result = rsltAdrComponent
          .slice(0)
          .reverse()
          .map((item) => item.short_name)
          .join("");
        setAddress(address_result.slice(5, address_result.length));
      } else {
        console.log("No address available!");
      }
    }
  });
  return address;
}
