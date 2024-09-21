export type ArtCollection = {
  id: string;
  first_name: string | null;
  last_name: string;
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
  gap_1?: string;
  gap_2?: string;
  gap_3?: string;
  gap_4?: string;
  gap_5?: string;
  info: string;
  artist_slug: string;
  color: string;
  copyright: number;
  histocharacter: number;
  birthyear: string;
  deathyear: string;
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
  avatar_url: string;
  signature: string | null;
  color: string;
  site_web: string | null;
  info: string;
  slug: string;
};

export type MovementRow = {
  id: number;
  name: string;
  slug: string;
  art_count: string;
}