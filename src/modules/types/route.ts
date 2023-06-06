import type { UserId } from "./user";

export type RouteId = number;
export type Longitude = number;
export type Latitude = number;
export type TimeString = string;
export type RouteCapacity = number;

export type RouteRequestBody = {
  driverId: UserId;
  startLong: Longitude;
  startLat: Latitude;
  endLong: Longitude;
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

export type RouteResponse = {
  id: RouteId;
  driverId: UserId;
  startLong: Longitude;
  startLat: Latitude;
  endLong: Longitude;
  endLat: Latitude;
  startTime: TimeString;
  endTime: TimeString;
  capacity: RouteCapacity;
  createdAt: TimeString;
  updatedAt: TimeString;
};
