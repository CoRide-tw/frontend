import useSWR from "swr";
import { authFetcher } from "@/modules/api/fetcher";

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
