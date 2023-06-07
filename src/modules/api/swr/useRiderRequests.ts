import useSWR from "swr";
import { authFetcher } from "../fetcher";
import type { Request } from "@/modules/types/request";

export const useRiderRequests = ({ riderId }: { riderId?: number }) => {
  const { data, error, isLoading } = useSWR(
    riderId ? `/request?riderId=${encodeURIComponent(riderId)}` : null,
    authFetcher
  );

  return {
    requests: data as Request[],
    error,
    isLoading,
  };
};
