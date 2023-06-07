import useSWR from "swr";
import { authFetcher } from "../fetcher";
import type { Request } from "@/modules/types/request";
import { getClientCookies } from "@/utils/cookies";

export const useCurrentTrip = () => {
  const { userId } = getClientCookies();

  const { data, error, isLoading } = useSWR(
    `/trip?userId=${encodeURIComponent(userId ?? "")}`,
    authFetcher
  );

  return {
    trip: data?.rider[0],
    error,
    isLoading,
  };
};
