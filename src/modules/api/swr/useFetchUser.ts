import useSWR from "swr";
import { authFetcher } from "../fetcher";

export default function useFetchUser(userId: string) {
  const { data, error, isLoading } = useSWR(`/user/${userId}`, authFetcher);

  return {
    user : data,
    error,
    isLoading,
  };
}