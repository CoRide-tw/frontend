import Cookies from "universal-cookie";

export const getClientCookies = (): {
  userId?: string;
  coRideToken?: string;
} => {
  const cookies = new Cookies();
  return {
    userId: cookies.get("userId"),
    coRideToken: cookies.get("coRideToken"),
  };
};
