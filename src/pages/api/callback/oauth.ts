import { getFirstQuery } from "@/utils/getFirstQuery";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.redirect("/login");
  }

  if (!req.query.code) res.redirect("/login");

  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_CORIDE_API_URL}/user/login`,
      {
        method: "POST",
        body: JSON.stringify({ code: getFirstQuery(req.query.code) }),
      }
    );
    const { user, token } = await data.json();

    const coRideTokenCookie = `coRideToken=${token}; Path=/`;
    const userIdCookie = `userId=${user.id}; Path=/`;
    res.setHeader("set-cookie", [coRideTokenCookie, userIdCookie]);

    res.redirect(302, "/home");
  } catch {
    res.redirect("/login");
  }
}
