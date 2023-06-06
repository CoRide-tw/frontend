import { authFetcher } from "@/modules/api/fetcher";
import { addressToGeoLocation } from "@/utils/address";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { coRideToken, userId } = req.cookies;

    const { lat: pickupLat, lng: pickupLong } = await addressToGeoLocation(
      req.body.startingPoint,
      coRideToken ?? ""
    );

    const { lat: dropoffLat, lng: dropoffLong } = await addressToGeoLocation(
      req.body.destination,
      coRideToken ?? ""
    );

    const body = {
      driverId: Number(userId),
      startTime: new Date(
        `${req.body.date} ${req.body.timeStart}`
      ).toISOString(),
      endTime: new Date(`${req.body.date} ${req.body.timeEnd}`).toISOString(),
      capacity: Number(req.body.passengerNumber),
      pickupLat,
      pickupLong,
      dropoffLat,
      dropoffLong,
    };

    const data = await authFetcher("/route", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${coRideToken}`,
      },
      body: JSON.stringify(body),
    });

    res.redirect(`/driver/requests?new=1?routeId=${data.id}`);
  }
}
