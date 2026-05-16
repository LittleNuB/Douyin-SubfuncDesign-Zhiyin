import {
  AtSign,
  ChevronLeft,
  Forward,
  Heart,
  ImageIcon,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Music2,
  Search,
  Smile,
  Star,
} from "lucide-react";
import { triggerContent } from "../data/mockData";
import { MediaView } from "./MediaView";
import { ZhiyinEntry } from "./ZhiyinEntry";

type DouyinFeedScreenProps = {
  isSheetOpen: boolean;
  onOpenZhiyin: () => void;
};

const sideActions = [
  { label: "1.5万", icon: Heart },
  { label: "677", icon: MessageCircle },
  { label: "814", icon: Star },
  { label: "6050", icon: Forward },
];

export function DouyinFeedScreen({ isSheetOpen, onOpenZhiyin }: DouyinFeedScreenProps) {
  return (
    <section className={`feed-screen ${isSheetOpen ? "feed-screen--dimmed" : ""}`}>
      <MediaView className="feed-bg" media={triggerContent.media} alt="洱海日落视频画面" />
      <div className="feed-vignette" />

      <div className="status-bar">
        <span>00:37</span>
        <div className="dynamic-island">∞　1台</div>
        <span>5G 92%</span>
      </div>

      <header className="top-channel">
        <button className="hamburger-menu" aria-label="菜单">
          <span />
          <span />
          <span />
        </button>
        <nav aria-label="抖音频道">
          <span>上海</span>
          <span>关注</span>
          <span>热点</span>
          <span>团购</span>
          <span>商城</span>
          <strong>推荐</strong>
        </nav>
        <button className="channel-search" aria-label="搜索">
          <Search size={21} />
        </button>
      </header>

      <button className="feed-back-button" aria-label="返回">
        <ChevronLeft size={32} strokeWidth={2.4} />
      </button>

      <aside className="side-rail" aria-label="视频互动">
        <div className="avatar-wrap">
          <div className="avatar">风</div>
          <div className="follow-plus">+</div>
        </div>
        {sideActions.map((action) => {
          const Icon = action.icon;
          return (
            <button className="side-action" key={action.label} aria-label={action.label}>
              <Icon size={37} fill={action.icon === Heart ? "white" : "none"} strokeWidth={action.icon === Forward ? 2.8 : 2.2} />
              <span>{action.label}</span>
            </button>
          );
        })}
        <div className="music-disc">
          <Music2 size={18} />
        </div>
      </aside>

      <div className="bottom-copy">
        <div className="danmu-badge">弹</div>
        <div className="location-tag">
          <MapPin size={17} fill="white" />
          大理白族自治州
        </div>
        <p className="author">
          @去有风的地方 · <span>2025年09月18日</span>
        </p>
        <p className="caption">
          9.18 日傍晚 7:30 的大理洱海没有人。晚霞很美，这里特别适合发呆。 <span>展开</span>
        </p>
        <div className="music-tag">
          <span>去汽水听</span>
          白色岛屿 - 小大火
        </div>
        <ZhiyinEntry onOpen={onOpenZhiyin} />
      </div>

      <footer className="comment-bar">
        <span>期待你的评论</span>
        <div className="comment-tools">
          <ImageIcon size={25} />
          <AtSign size={28} />
          <Smile size={28} />
          <MoreHorizontal size={24} />
        </div>
      </footer>
    </section>
  );
}
