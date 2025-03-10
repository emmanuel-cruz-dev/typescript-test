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
