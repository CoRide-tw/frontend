import useSWR from "swr";
import { authFetcher } from "../fetcher";
import { useUser } from "./useUser";
import { CurrentTripResponse } from "@/modules/types/trip";

export const useTrips = () => {
  const { user } = useUser();
  const shouldFetch = user?.id;

  const { data, error, isLoading } = useSWR(
    () => (shouldFetch ? `/trip?userId=${encodeURIComponent(user.id)}` : null),
    authFetcher
  );

  return {
    data: data as CurrentTripResponse,
    error,
    isLoading,
  };
};
