import { UserDisplay, UserRating } from "./user";

export type TripPoint = {
  location: string;
  time: Date;
};

export type Money = {
  amount: number;
  currency: string;
};

export type CarPlate = string;

export interface Trip {
  user: UserDisplay;
  userRating?: UserRating;
  tip: Money;
  date: Date;
  start: TripPoint;
  end: TripPoint;
  carPlate?: CarPlate;
  attachedUsers?: UserDisplay[];
}

export type CurrentTripType = {
  id: number;
  riderId: number;
  driverId: number;
  requestId: number;
  routeId: number;
  driverName: string;
  driverPictureUrl: string;
  driverCarType: string;
  driverCarPlate: string;
  routeStartTime: string;
  pickupStartTime: string;
  pickupEndTime: string;
  routeEndTime: string;
  routeStartLocationLng: number;
  routeStartLocationLat: number;
  routeEndLocationLng: number;
  routeEndLocationLat: number;
  pickupLocationLng: number;
  pickupLocationLat: number;
  dropoffLocationLng: number;
  dropoffLocationLat: number;
  createdAt: string;
};
export type CurrentTripResponse = {
  rider: CurrentTripType[] | undefined;
  driver: CurrentTripType[] | undefined;
};
