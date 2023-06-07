export const addressToGeoLocation = async (
  address: string,
  coRideToken: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CORIDE_API_URL}/google_api/geocoding?text=${address}`,
    {
      headers: {
        Authorization: `Bearer ${coRideToken}`,
      },
    }
  );

  const data = await res.json();

  return data as { address: string; lat: string; lng: string };
};

export const geolocationToAddress = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );
  const data = await res.json();
  return data.results[0].formatted_address;
};
