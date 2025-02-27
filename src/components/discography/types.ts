
export type Album = {
  artist: string;
  title: string;
  year: number;
  notable?: boolean;
};

export type DiscographyData = Record<string, Album[]>;
