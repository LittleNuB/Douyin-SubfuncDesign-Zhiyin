import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Heart, Search } from "lucide-react";
import type { MediaAsset } from "../types";
import { MediaView } from "./MediaView";

export type ExploreTopic = "erhai" | "snow" | "food";

type CafeExploreSheetProps = {
  topic: ExploreTopic;
  onBack: () => void;
};

type ExploreCard = {
  title: string;
  likes: string;
  media: MediaAsset;
};

type ExploreConfig = {
  title: string;
  ariaLabel: string;
  kicker: string;
  intro: string;
  opening: string;
  cards: ExploreCard[];
};

const exploreConfigs: Record<ExploreTopic, ExploreConfig> = {
  erhai: {
    title: "看洱海",
    ariaLabel: "洱海附近灵感",
    kicker: "知音继续整理",
    intro: "按“慢下来也能出片”延展出咖啡、骑行、餐厅和住宿",
    opening: "先找一扇能看海的窗，喝杯咖啡等风慢下来；兴致来了就沿湖骑一小段，晚上住近一点，把日落留到最后。",
    cards: [
      {
        title: "窗边等日落",
        likes: "128",
        media: { type: "image", src: "/assets/cafe-window.webp" },
      },
      {
        title: "海边骑行慢下来",
        likes: "116",
        media: { type: "image", src: "/assets/erhai-cycling.webp" },
      },
      {
        title: "湖边住一晚",
        likes: "94",
        media: { type: "image", src: "/assets/erhai-stay.webp" },
      },
      {
        title: "海边街角吃点东西",
        likes: "86",
        media: { type: "image", src: "/assets/cafe-street.webp" },
      },
    ],
  },
  snow: {
    title: "看雪山",
    ariaLabel: "雪山照片灵感",
    kicker: "知音继续整理",
    intro: "按“雪山照片优先”延展出机位、穿搭和同款角度",
    opening: "把上午留给雪山，先看光线干净的机位；衣服和小道具提前配好，到现场就少纠结，多拍几张会发光的瞬间。",
    cards: [
      {
        title: "先看干净机位",
        likes: "142",
        media: { type: "image", src: "/assets/snow-spot.webp" },
      },
      {
        title: "穿搭先配好",
        likes: "118",
        media: { type: "image", src: "/assets/snow-outfit.webp" },
      },
      {
        title: "雪山同款角度",
        likes: "105",
        media: { type: "image", src: "/assets/snow-mountain.webp" },
      },
    ],
  },
  food: {
    title: "看美食",
    ariaLabel: "云南本地美食灵感",
    kicker: "知音继续整理",
    intro: "按“晚上吃到本地味道”延展出餐厅、夜市和本地小吃",
    opening: "晚饭别急着冲热门榜，先坐下来吃一锅热的；再顺路逛逛小摊和夜市，把本地味道一点点吃出来。",
    cards: [
      {
        title: "菌子火锅先安排",
        likes: "156",
        media: { type: "image", src: "/assets/food-restaurant.webp" },
      },
      {
        title: "夜市小吃慢慢逛",
        likes: "123",
        media: { type: "image", src: "/assets/food-street.webp" },
      },
      {
        title: "本地味道别错过",
        likes: "109",
        media: { type: "image", src: "/assets/night-market.webp" },
      },
    ],
  },
};

export function CafeExploreSheet({ topic, onBack }: CafeExploreSheetProps) {
  const config = exploreConfigs[topic];
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveCardIndex(0);
    stripRef.current?.scrollTo({ left: 0 });
  }, [topic]);

  const handleScroll = () => {
    const strip = stripRef.current;
    if (!strip) return;

    const stripCenter = strip.scrollLeft + strip.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(strip.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const center = element.offsetLeft + element.offsetWidth / 2;
      const distance = Math.abs(stripCenter - center);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveCardIndex(nearestIndex);
  };

  const scrollToCard = (index: number) => {
    const card = stripRef.current?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="cafe-layer">
      <button className="cafe-backdrop" onClick={onBack} aria-label="返回信息流" />
      <section className={`cafe-sheet explore-sheet explore-sheet--${topic}`} aria-label={config.ariaLabel}>
        <div className="sheet-handle" />
        <header className="cafe-header">
          <button onClick={onBack} aria-label="返回知音首页">
            <ChevronLeft size={26} />
          </button>
          <div className="cafe-heading">{config.title}</div>
          <button className="cafe-search-icon" aria-label={`搜索${config.title}`}>
            <Search size={20} />
          </button>
        </header>

        <div className="cafe-title">
          <span>{config.kicker}</span>
          <p>{config.intro}</p>
        </div>

        <div className="cafe-card-strip" ref={stripRef} onScroll={handleScroll}>
          {config.cards.map((card) => (
            <article className="cafe-card" key={card.title}>
              <MediaView media={card.media} alt={card.title} />
              <div className="cafe-card__shade" />
              <div className="cafe-card__copy">
                <span>{card.title}</span>
                <em>
                  <Heart size={14} />
                  {card.likes}
                </em>
              </div>
            </article>
          ))}
        </div>

        <div className="cafe-dots">
          {config.cards.map((card, index) => (
            <button
              className={index === activeCardIndex ? "cafe-dot cafe-dot--active" : "cafe-dot"}
              key={card.title}
              type="button"
              aria-label={`切换到${card.title}`}
              onClick={() => scrollToCard(index)}
            />
          ))}
        </div>

        <div className="cafe-note">
          <p>
            <b>打开方式：</b>
            {config.opening}
          </p>
        </div>
      </section>
    </div>
  );
}
