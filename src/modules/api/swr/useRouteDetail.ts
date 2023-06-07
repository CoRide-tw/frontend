import useSWR from "swr";
import { authFetcher } from "../fetcher";

export default function  useRouteDetail({ routeId }: { routeId: string }) {
  const { data, error, isLoading } = useSWR(
    `/route/${encodeURIComponent(routeId)}`,
    authFetcher
  );

  return {
    route: data ,
    error,
    isLoading,
  };
}