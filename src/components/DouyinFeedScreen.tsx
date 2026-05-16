import { useEffect, useMemo, useRef, useState, type PointerEvent, type WheelEvent } from "react";
import { ChevronLeft, Forward, Heart, Home, MapPin, MessageCircle, Music2, Plus, Search, Star, UserRound, UsersRound } from "lucide-react";
import { feedVideos } from "../data/mockData";
import type { FeedVideoItem } from "../types";
import { MediaView } from "./MediaView";
import { ZhiyinEntry } from "./ZhiyinEntry";
import { ZhiyinFollowupPrompt } from "./ZhiyinFollowupPrompt";

type DouyinFeedScreenProps = {
  isSheetOpen: boolean;
  onOpenZhiyin: () => void;
  onAddToInspiration?: (item: FeedVideoItem) => void;
  isInspirationSaved?: boolean;
  addedFeedIds?: string[];
  onOpenInspirationBag?: () => void;
};

const SWIPE_DURATION_MS = 260;
const DISTANCE_THRESHOLD = 92;
const VELOCITY_THRESHOLD = 0.48;
const WHEEL_THRESHOLD = 70;

function getLoopedIndex(index: number, length: number) {
  return (index + length) % length;
}

function preloadMedia(items: FeedVideoItem[], activeIndex: number) {
  [-1, 0, 1].forEach((offset) => {
    const item = items[getLoopedIndex(activeIndex + offset, items.length)];
    if (!item) return;

    if (item.media.type === "image") {
      const image = new Image();
      image.src = item.media.src;
      return;
    }

    const video = document.createElement("video");
    video.src = item.media.src;
    video.poster = item.media.poster ?? "";
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
  });
}

function incrementStat(value: string) {
  if (/^\d+$/.test(value)) {
    return String(Number(value) + 1);
  }

  const wanMatch = value.match(/^(\d+(?:\.\d+)?)万$/);
  if (wanMatch) {
    const current = Number(wanMatch[1]);
    return `${(current + 0.1).toFixed(1)}万`;
  }

  return value;
}

export function DouyinFeedScreen({
  isSheetOpen,
  onOpenZhiyin,
  onAddToInspiration,
  isInspirationSaved = false,
  addedFeedIds = [],
  onOpenInspirationBag,
}: DouyinFeedScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [settlingOffset, setSettlingOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  const [favoritedIds, setFavoritedIds] = useState<string[]>([]);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const frameRef = useRef<HTMLElement | null>(null);
  const wheelLockedRef = useRef(false);

  const activeItem = feedVideos[activeIndex];
  const visibleSlides = useMemo(
    () =>
      [-1, 0, 1].map((position) => ({
        position,
        item: feedVideos[getLoopedIndex(activeIndex + position, feedVideos.length)],
      })),
    [activeIndex],
  );

  useEffect(() => {
    preloadMedia(feedVideos, activeIndex);
  }, [activeIndex]);

  const commitSwipe = (direction: 1 | -1) => {
    if (isSettling || isSheetOpen) return;

    const height = frameRef.current?.clientHeight ?? 760;
    setIsDragging(false);
    setIsSettling(true);
    setSettlingOffset(direction === 1 ? -height : height);

    window.setTimeout(() => {
      setActiveIndex((current) => getLoopedIndex(current + direction, feedVideos.length));
      setDragY(0);
      setSettlingOffset(0);
      setIsSettling(false);
    }, SWIPE_DURATION_MS);
  };

  const resetDrag = () => {
    setIsDragging(false);
    setDragY(0);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (isSettling || isSheetOpen) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    startYRef.current = event.clientY;
    startTimeRef.current = performance.now();
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!isDragging || isSettling || isSheetOpen) return;

    const rawDistance = event.clientY - startYRef.current;
    const height = frameRef.current?.clientHeight ?? 760;
    const limitedDistance = Math.max(Math.min(rawDistance, height * 0.42), -height * 0.42);
    setDragY(limitedDistance);
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!isDragging || isSettling || isSheetOpen) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    const elapsed = Math.max(performance.now() - startTimeRef.current, 1);
    const velocity = dragY / elapsed;
    const shouldGoNext = dragY < -DISTANCE_THRESHOLD || velocity < -VELOCITY_THRESHOLD;
    const shouldGoPrevious = dragY > DISTANCE_THRESHOLD || velocity > VELOCITY_THRESHOLD;

    if (shouldGoNext) {
      commitSwipe(1);
      return;
    }

    if (shouldGoPrevious) {
      commitSwipe(-1);
      return;
    }

    resetDrag();
  };

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (isSettling || isSheetOpen || wheelLockedRef.current || Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;

    wheelLockedRef.current = true;
    commitSwipe(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLockedRef.current = false;
    }, SWIPE_DURATION_MS + 80);
  };

  const handleAddToInspiration = () => {
    if (addedFeedIds.includes(activeItem.id)) return;
    onAddToInspiration?.(activeItem);
  };

  const handleToggleFavorite = () => {
    setFavoritedIds((current) =>
      current.includes(activeItem.id)
        ? current.filter((id) => id !== activeItem.id)
        : [...current, activeItem.id],
    );
  };

  const sideActions = [
    { label: activeItem.stats.likes, icon: Heart, kind: "like" },
    { label: activeItem.stats.comments, icon: MessageCircle, kind: "comment" },
    {
      label: favoritedIds.includes(activeItem.id) ? incrementStat(activeItem.stats.favorites) : activeItem.stats.favorites,
      icon: Star,
      kind: "favorite",
    },
    { label: activeItem.stats.shares, icon: Forward, kind: "share" },
  ];

  return (
    <section
      ref={frameRef}
      className={`feed-screen ${isSheetOpen ? "feed-screen--dimmed" : ""} ${isDragging ? "feed-screen--dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={resetDrag}
      onWheel={handleWheel}
    >
      <div className="feed-stack" aria-live="polite">
        {visibleSlides.map(({ item, position }) => (
          <article
            className={`feed-slide ${position === 0 ? "feed-slide--active" : ""} ${isSettling ? "feed-slide--settling" : ""}`}
            key={`${item.id}-${position}`}
            style={{
              transform: `translate3d(0, calc(${position * 100}% + ${isSettling ? settlingOffset : dragY}px), 0)`,
            }}
            aria-hidden={position !== 0}
          >
            <MediaView
              className="feed-bg"
              media={item.media}
              alt={`${item.title}视频画面`}
              autoPlay={position === 0}
              preload={Math.abs(position) <= 1 ? "auto" : "metadata"}
            />
            <div className="feed-vignette" />
          </article>
        ))}
      </div>

      <div className="status-bar">
        <span>00:37</span>
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
          <div className="avatar">{activeItem.author.slice(0, 1)}</div>
          <div className="follow-plus">+</div>
        </div>
        {sideActions.map((action) => {
          const Icon = action.icon;
          const isFavorite = action.kind === "favorite";
          const isActive = isFavorite && favoritedIds.includes(activeItem.id);
          return (
            <button
              className={`side-action ${isActive ? "side-action--active" : ""}`}
              key={action.kind}
              aria-label={action.label}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={isFavorite ? handleToggleFavorite : undefined}
            >
              <Icon
                size={37}
                fill={action.icon === Heart || isActive ? "white" : "none"}
                strokeWidth={action.icon === Forward ? 2.8 : 2.2}
              />
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
          {activeItem.location}
        </div>
        <p className="author">
          @{activeItem.author} · <span>{activeItem.publishDate}</span>
        </p>
        <p className="caption">
          {activeItem.caption} <span>展开</span>
        </p>
        <div className="music-tag">
          <span>去汽水听</span>
          {activeItem.musicTitle}
        </div>
        {isInspirationSaved && activeItem.promptType === "none" && (
          <button className="inspiration-bag-entry" type="button" onPointerDown={(event) => event.stopPropagation()} onClick={onOpenInspirationBag}>
            <span>灵感袋</span>
            慢下来也能出片
          </button>
        )}
        {activeItem.promptType === "zhiyinEntry" && <ZhiyinEntry onOpen={onOpenZhiyin} />}
        {isInspirationSaved && activeItem.promptType === "inspirationAdd" && (
          <ZhiyinFollowupPrompt
            target={activeItem.promptTarget ?? "慢下来也能出片"}
            isAdded={addedFeedIds.includes(activeItem.id)}
            onAdd={handleAddToInspiration}
          />
        )}
      </div>

      <footer className="douyin-tabbar" aria-label="抖音底部导航">
        <button className="douyin-tabbar__item douyin-tabbar__item--active" type="button">
          <Home size={19} />
          首页
        </button>
        <button className="douyin-tabbar__item" type="button">
          <UsersRound size={19} />
          朋友
        </button>
        <button className="douyin-tabbar__create" type="button" aria-label="发布">
          <Plus size={31} strokeWidth={2.6} />
        </button>
        <button className="douyin-tabbar__item douyin-tabbar__message" type="button">
          <MessageCircle size={19} />
          消息
          <span>3</span>
        </button>
        <button className="douyin-tabbar__item" type="button">
          <UserRound size={19} />
          我
        </button>
      </footer>
      <div className="feed-progress" aria-hidden="true">
        {feedVideos.map((item, index) => (
          <span className={index === activeIndex ? "feed-progress__dot feed-progress__dot--active" : "feed-progress__dot"} key={item.id} />
        ))}
      </div>
    </section>
  );
}
