import useSWR from "swr";

export const fetcher = async (url: string, options?: any) => {
  const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=zh-TW`;

  const res = await fetch(`${baseUrl}&latlng=${url}`, {
    ...options,
  });
  const data = await res.json();
  return data;
};

export const useGeolocationToAddress = ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => {
  const shouldFetch = lat && lng;
  const { data, error, isLoading } = useSWR(
    () => (shouldFetch ? `${lat},${lng}` : null),
    fetcher
  );

  return {
    address: data?.results[0].formatted_address,
    error,
    isLoading,
  };
};
