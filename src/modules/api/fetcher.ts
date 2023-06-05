import { getClientCookies } from "@/utils/cookies";

// api call with auth header
export const authFetcher = async (url: string, options?: any) => {
  const { coRideToken } = getClientCookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_CORIDE_API_URL}${url}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${coRideToken}`,
      ...options?.headers,
    },
  });

  const data = await res.json();
  return data;
};

export const fetcher = async (url: string, options?: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CORIDE_API_URL}${url}`, {
    ...options,
  });
  const data = await res.json();
  return data;
};
