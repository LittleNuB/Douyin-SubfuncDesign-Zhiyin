import type { ContentItem, InspirationBundle, TuningChip, UserSignal } from "../types";

export const triggerContent: ContentItem = {
  id: "trigger-erhai",
  title: "傍晚 7:30 的洱海，适合发呆",
  category: "scenery",
  source: "similar",
  media: { type: "image", src: "/assets/erhai-sunset.webp" },
  creator: "去有风的地方",
};

export const contentItems: ContentItem[] = [
  {
    id: "fav-cafe",
    title: "洱海边适合发呆的咖啡馆",
    category: "food",
    source: "favorite",
    media: { type: "image", src: "/assets/erhai-sunset.webp" },
    creator: "扶光里 FUGUANGLI",
  },
  {
    id: "fav-bike",
    title: "大理海西骑行，日落前这一段最安静",
    category: "transport",
    source: "favorite",
    media: { type: "image", src: "/assets/erhai-sunset.webp" },
    creator: "去有风的地方",
  },
  {
    id: "fav-snow",
    title: "玉龙雪山远景机位，上午光线更干净",
    category: "photo",
    source: "favorite",
    media: { type: "image", src: "/assets/snow-mountain.webp" },
    creator: "小陈在路上",
  },
  {
    id: "fav-outfit",
    title: "蓝月谷穿白色和浅蓝更出片",
    category: "outfit",
    source: "favorite",
    media: { type: "image", src: "/assets/snow-mountain.webp" },
    creator: "云南拍照指南",
  },
  {
    id: "fav-hotpot",
    title: "菌子火锅要这样吃，别急着下筷",
    category: "food",
    source: "favorite",
    media: { type: "image", src: "/assets/night-market.webp" },
    creator: "本地胃口",
  },
  {
    id: "sim-cafe-area",
    title: "海西咖啡馆这段，出门就是日落",
    category: "food",
    source: "commercial",
    media: { type: "image", src: "/assets/erhai-sunset.webp" },
    creator: "大理咖啡精选",
  },
  {
    id: "sim-photo-template",
    title: "雪山同款慢镜头模板，三步就能拍",
    category: "photo",
    source: "similar",
    media: { type: "image", src: "/assets/snow-mountain.webp" },
    creator: "拍同款",
  },
  {
    id: "sim-night",
    title: "古城外这条小街，本地人下班会来",
    category: "food",
    source: "similar",
    media: { type: "image", src: "/assets/night-market.webp" },
    creator: "晚饭去哪",
  },
  {
    id: "sim-avoid",
    title: "雨季去大理，备一个不扫兴的方案",
    category: "avoidPit",
    source: "similar",
    media: { type: "image", src: "/assets/erhai-sunset.webp" },
    creator: "云南避坑",
  },
  {
    id: "sim-route",
    title: "少走路的一天：咖啡、日落、住海边",
    category: "transport",
    source: "similar",
    media: { type: "image", src: "/assets/erhai-sunset.webp" },
    creator: "轻松出门",
  },
];

export const userSignal: UserSignal = {
  favorites: contentItems.filter((item) => item.source === "favorite"),
  likes: [contentItems[0], contentItems[2], contentItems[7]],
  watches: [triggerContent, contentItems[1], contentItems[5], contentItems[8]],
  shares: [contentItems[3]],
};

export const defaultChips: TuningChip[] = [
  { id: "slower", label: "更慢一点", effect: "slower" },
  { id: "photoFirst", label: "更出片", effect: "photoFirst" },
  { id: "lessWalking", label: "少走路", effect: "lessWalking" },
  { id: "budget", label: "预算低一点", effect: "budget" },
  { id: "family", label: "适合两个人", effect: "family" },
];

export const baseBundles: InspirationBundle[] = [
  {
    id: "slow-photo",
    title: "慢下来也能出片",
    insight: "我知道你喜欢的云南里，有咖啡馆、洱海日落、民族风穿搭和地道美食。所以猜你会喜欢：慢下来也能出片。",
    evidence: ["大理咖啡馆", "洱海日落", "民族风穿搭", "云南美食"],
    chips: defaultChips,
    cards: [
      {
        id: "slow-1",
        title: "先把下午留给洱海",
        subtitle: "从咖啡馆开始，等风和日落一起慢下来。",
        items: [contentItems[0], contentItems[1]],
      },
      {
        id: "slow-2",
        title: "少走路的一天",
        subtitle: "把咖啡、日落和回程放在同一片区。",
        items: [contentItems[5], contentItems[9]],
      },
    ],
  },
  {
    id: "snow-photo",
    title: "雪山照片优先",
    insight: "你收藏的雪山和穿搭内容更像是在找一组能被记住的照片。",
    evidence: ["雪山机位", "蓝月谷穿搭", "同款模板", "上午光线"],
    chips: defaultChips,
    cards: [
      {
        id: "snow-1",
        title: "先定光线，再定机位",
        subtitle: "上午的雪山更干净，白色和浅蓝更稳。",
        items: [contentItems[2], contentItems[3]],
      },
      {
        id: "snow-2",
        title: "拍完不赶路",
        subtitle: "把模板、姿势和回程放在同一个节奏里。",
        items: [contentItems[6], contentItems[8]],
      },
    ],
  },
  {
    id: "local-night",
    title: "晚上吃到本地味道",
    insight: "你收藏的美食和避坑内容，说明你更在意晚上的真实体验。",
    evidence: ["菌子火锅", "古城小街", "本地夜市", "避坑提醒"],
    chips: defaultChips,
    cards: [
      {
        id: "night-1",
        title: "晚饭别只看热门榜",
        subtitle: "从菌子火锅开始，避开游客动线。",
        items: [contentItems[4], contentItems[7]],
      },
      {
        id: "night-2",
        title: "雨天也能继续逛",
        subtitle: "把室内小店和轻量夜市放进同一晚。",
        items: [contentItems[8], contentItems[7]],
      },
    ],
  },
];
