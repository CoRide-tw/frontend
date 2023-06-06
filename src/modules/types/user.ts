import { TimeString } from "./route";

export type UserId = number;
export type Name = string;
export type Email = string;
export type GoogleId = string;
export type PictureUrl = string;

export type User = {
  id: UserId;
  name: Name;
  email: Email;
  googleId: GoogleId;
  pictureUrl: PictureUrl;
  createdAt: TimeString;
  updatedAt: TimeString;
};

export type UserRating = number;
