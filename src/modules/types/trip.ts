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
