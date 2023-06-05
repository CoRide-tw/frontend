import useSWR from "swr";

import { authFetcher } from "../fetcher";
import { getClientCookies } from "@/utils/cookies";

export const useUser = () => {
  const { userId } = getClientCookies();

  const shouldFetch = !!Number(userId);

  // get user
  const { data, error, isLoading } = useSWR(
    shouldFetch ? `/user/${Number(userId)}` : null,
    authFetcher
  );

  return {
    user: data,
    error,
    isLoading,
    mutate,
  };
};
