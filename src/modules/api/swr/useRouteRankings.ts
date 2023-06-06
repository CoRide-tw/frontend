import useSWR from "swr";
import { authFetcher } from "../fetcher";
import { useRiderSearchInput } from "@/modules/components/RiderSearchBar/store";
import { RouteResponse } from "@/modules/types/route";

export const useRouteRankings = () => {
  const { inputState } = useRiderSearchInput();
  const shouldFetch = !!inputState;

  const url = shouldFetch
    ? encodeURI(
        `/route/ranking?startLong=${inputState.pickupLong}&startLat=${inputState?.pickupLat}&endLong=${inputState?.dropoffLong}&endLat=${inputState?.dropoffLat}`
      ) +
      `&startTime=${encodeURIComponent(
        inputState.pickupStartTime
      )}&endTime=${encodeURIComponent(inputState.pickupEndTime)}`
    : "";

  const { data, error, isLoading } = useSWR(
    () => (shouldFetch ? url : null),
    authFetcher
  );

  return {
    data: data as RouteResponse[],
    error,
    isLoading,
  };
};
