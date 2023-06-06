import { Latitude, Longitude, RouteId, TimeString } from "./route";
import { UserId } from "./user";

export type RequestId = number;
export type RequestStatus =
  | "pending"
  | "denied"
  | "accepted"
  | "canceled"
  | "completed";
export type TipAmount = number;

export type Request = {
  id: RequestId;
  riderId: UserId;
  routeId: RouteId;
  pickupLong: Longitude;
  pickupLat: Latitude;
  dropoffLong: Longitude;
  dropoffLat: Latitude;
  pickupStartTime: TimeString;
  pickupEndTime: TimeString;
  status: RequestStatus;
  createdAt: TimeString;
  updatedAt: TimeString;
  tips: TipAmount;
};
