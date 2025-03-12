declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }
}

export interface UserLocation {
  country: string;
}

export interface UserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface UserId {
  name: string;
  value: string;
}

export interface User {
  cell: string;
  email: string;
  id: UserId;
  name: UserName;
  picture: UserPicture;
  location: UserLocation;
}

export enum SortBy {
  NONE = "none",
  NAME = "name",
  LAST = "last",
  COUNTRY = "country",
}
