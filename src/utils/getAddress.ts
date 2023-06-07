export default function getAddress({ lat, lng }: { lat: number; lng: number }) {
  return new Promise<string>((resolve, reject) => {
    const coord = new google.maps.LatLng(lat, lng);
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: coord }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        let result = results![0];
        let rsltAdrComponent = result.address_components;
        if (result != null) {
          const address_result = rsltAdrComponent
            .slice(0)
            .reverse()
            .map((item) => item.short_name)
            .join("");
          const address = address_result.slice(5, address_result.length);
          resolve(address);
        } else {
          reject(new Error("No address available!"));
        }
      } else {
        reject(new Error(`Geocoder failed due to: ${status}`));
      }
    });
  });
}
