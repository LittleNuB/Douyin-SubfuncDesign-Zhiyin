export type ContentCategory =
  | "scenery"
  | "food"
  | "outfit"
  | "photo"
  | "transport"
  | "avoidPit";

export type ContentSource = "favorite" | "similar" | "commercial";

export type MediaAsset = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

export type ContentItem = {
  id: string;
  title: string;
  category: ContentCategory;
  source: ContentSource;
  media: MediaAsset;
  creator?: string;
};

export type UserSignal = {
  favorites: ContentItem[];
  likes: ContentItem[];
  watches: ContentItem[];
  shares: ContentItem[];
};

export type TuningEffect =
  | "slower"
  | "photoFirst"
  | "budget"
  | "local"
  | "lessWalking"
  | "family";

export type TuningChip = {
  id: string;
  label: string;
  effect: TuningEffect;
};

export type BundleCard = {
  id: string;
  title: string;
  subtitle: string;
  items: ContentItem[];
};

export type InspirationBundle = {
  id: string;
  title: string;
  insight: string;
  evidence: string[];
  chips: TuningChip[];
  cards: BundleCard[];
};
