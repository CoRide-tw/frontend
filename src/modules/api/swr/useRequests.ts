import useSWR from "swr";
import { authFetcher } from "../fetcher";
import type { Request } from "@/modules/types/request";

export const useRequests = ({ routeId }: { routeId: string }) => {
  const { data, error, isLoading } = useSWR(
    `/request?routeId=${encodeURIComponent(1)}`,
    authFetcher
  );

  return {
    requests: data as Request[],
    error,
    isLoading,
  };
};
