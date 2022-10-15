export type ArtCollection = {
  firstName: string;
  lastName: string;
  id: string;
  name: string;
  movement: string;
  url: string;
};

export type ArtRow = {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  gender: string;
  avatar_url: string;
  slug: string;
  movement: string;
  url: string;
};

export type ArtistRow = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  signature: string | null;
  slug: string;
};

export interface Spring {
  p: number;
  v: number;
}
