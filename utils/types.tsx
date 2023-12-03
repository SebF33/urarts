export type ArtCollection = {
  first_name: string | null;
  last_name: string;
  id: string;
  name: string;
  movement: string;
  movement_slug: string;
  font?: string;
  polyptych: number;
  frame: number;
  url: string;
  url_2?: string;
  url_3?: string;
  url_4?: string;
  url_5?: string;
  info: string | null;
  artist_slug: string;
  histocharacter: number;
};

export type ArtRow = {
  id: number;
  name: string;
  first_name: string | null;
  last_name: string;
  gender: string;
  avatar_url: string;
  slug: string;
  movement: string;
  url: string;
};

export type ArtistQuote = {
  id: number;
  first_name: string | null;
  last_name: string;
  avatar_url: string;
  signature: string | null;
  quote: string | null;
  slug: string;
};

export type ArtistRow = {
  id: number;
  first_name: string | null;
  last_name: string;
  nationality: string;
  birthyear: string;
  deathyear: string;
  avatar_url?: string;
  signature: string | null;
  color: string;
  site_web: string | null;
  info: string | null;
  slug: string;
};

export type MovementRow = {
  id: number;
  name: string;
  slug: string;
  art_count: string;
};

export interface Spring {
  p: number;
  v: number;
}
