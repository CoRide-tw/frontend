import type { UserId } from "./user";

export type RouteId = number;
export type Longtitude = number;
export type Latitude = number;
export type TimeString = string;
export type RouteCapacity = number;

export type RouteRequestBody = {
  driverId: UserId;
  startLong: Longtitude;
  startLat: Latitude;
  endLong: Longtitude;
  endLat: Latitude;
  startTime: TimeString;
  endTime: TimeString;
  capacity: RouteCapacity;
};

export type Route = {
  id: RouteId;
  riderId: UserId;
  routeId: RouteId;
};
