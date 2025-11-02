export type TagCollection = {
  id: number;
  name: string;
  position: string;
  rotation: number;
  slug: string;
};

export type ArtCollection = {
  artist_slug: string;
  avatar_url: string;
  birthyear: string;
  color: string;
  copyright: number;
  custom_css?: string;
  deathyear: string;
  first_name: string | null;
  font?: string;
  frame: number;
  gap_1?: string;
  gap_2?: string;
  gap_3?: string;
  gap_4?: string;
  gap_5?: string;
  height_cm: number | null;
  histocharacter: number;
  id: string;
  info: string;
  last_name: string;
  movement: string;
  movement_slug: string;
  name: string;
  polyptych: number;
  tags?: TagCollection[];
  url: string;
  url_2?: string;
  url_3?: string;
  url_4?: string;
  url_5?: string;
  width_cm: number | null;
  year: number | null;
};

export type ArtRow = {
  avatar_url: string;
  first_name: string | null;
  gender: string;
  id: number;
  last_name: string;
  movement: string;
  name: string;
  slug: string;
  url: string;
};

export type ArtistQuote = {
  avatar_url: string;
  first_name: string | null;
  id: number;
  last_name: string;
  quote: string | null;
  signature: string | null;
  slug: string;
};

export type ArtistRow = {
  avatar_url: string;
  birthyear: string;
  color: string;
  deathyear: string;
  facebook: string | null;
  first_name: string | null;
  id: number;
  info: string;
  instagram: string | null;
  last_name: string;
  main_tags: string | null;
  nationality: string;
  signature: string | null;
  site_web: string | null;
  slug: string;
};

export type MovementRow = {
  art_count: string;
  id: number;
  name: string;
  slug: string;
};

export type TagConst = {
  name: string;
  name_en: string;
  info: string;
  info_en: string;
  type: number;
  slug: string;
};