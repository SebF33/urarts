export type ArtCollection = {
  first_name: string | null;
  last_name: string;
  id: string;
  name: string;
  movement: string;
  font?: string;
  polyptych: number;
  frame: number;
  url: string;
  url_2?: string;
  url_3?: string;
  url_4?: string;
  url_5?: string;
  info: string | null;
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

export type ArtistRow = {
  id: number;
  first_name: string | null;
  last_name: string;
  nationality: string;
  avatar_url?: string;
  signature: string | null;
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
