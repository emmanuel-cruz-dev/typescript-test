declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }
}

export interface APIResults {
  results: User[];
  info: Info;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface User {
  gender: Gender;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Dob;
  phone: string;
  cell: string;
  id: ID;
  picture: Picture;
  nat: string;
}

export interface Dob {
  date: Date;
  age: number;
}

export enum Gender {
  Female = "female",
  Male = "male",
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number | string;
  coordinate: Coordinates;
  timezone: Timezone;
}

export interface Street {
  number: number;
  name: string;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Timezone {
  offset: string;
  description: string;
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

export interface ID {
  name: string;
  value: null | string;
}

export enum SortBy {
  NONE = "none",
  NAME = "name",
  LAST = "last",
  COUNTRY = "country",
}
