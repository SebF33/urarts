export type ArtCollection = {
  first_name: string;
  last_name: string | null;
  id: string;
  name: string;
  movement: string;
  url: string;
};

export type ArtRow = {
  id: number;
  name: string;
  first_name: string;
  last_name: string | null;
  gender: string;
  avatar_url: string;
  slug: string;
  movement: string;
  url: string;
};

export type ArtistRow = {
  id: number;
  first_name: string;
  last_name: string | null;
  avatar_url: string;
  signature: string | null;
  slug: string;
};

export interface Spring {
  p: number;
  v: number;
}
