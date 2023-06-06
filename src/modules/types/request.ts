import { Latitude, Longtitude, RouteId, TimeString } from "./route";
import { UserId } from "./user";

export type RequestId = number;
export type RequestStatus =
  | "pending"
  | "denied"
  | "accepted"
  | "canceled"
  | "completed";

export type Request = {
  id: RequestId;
  riderId: UserId;
  routeId: RouteId;
  pickupLong: Longtitude;
  pickupLat: Latitude;
  dropoffLong: Longtitude;
  dropoffLat: Latitude;
  pickupStartTime: TimeString;
  pickupEndTime: TimeString;
  status: RequestStatus;
  createdAt: TimeString;
  updatedAt: TimeString;
};
