import { ArrowLeft, Bell, CheckCircle2, ChevronRight, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { inspirationBagCard } from "../data/mockData";
import type { ExploreTopic } from "./CafeExploreSheet";
import { MediaView } from "./MediaView";

type InspirationBagSheetProps = {
  addedFeedIds: string[];
  onClose: () => void;
  onContinueFeed: () => void;
  onOpenExplore: (topic: ExploreTopic) => void;
};

const actionOptions = [
  "周五晚上看看天气和心情",
  "周末先去找个低配代餐",
  "发给朋友一起选 3 个想去的地方",
];

export function InspirationBagSheet({ addedFeedIds, onClose, onContinueFeed, onOpenExplore }: InspirationBagSheetProps) {
  const [view, setView] = useState<"bag" | "detail">("bag");
  const [actionState, setActionState] = useState<"idle" | "choosing" | "reminded">("idle");
  const addedCount = addedFeedIds.length;
  const hasVideo3Update = addedFeedIds.includes("followup-dali-cafe");

  return (
    <div className="inspiration-layer">
      <button className="inspiration-backdrop" aria-label="关闭灵感袋" onClick={onClose} />
      <section className="inspiration-sheet inspiration-bag-sheet" aria-label="灵感袋">
        <div className="sheet-handle" />
        <header className="inspiration-sheet__header">
          {view === "detail" ? (
            <button type="button" aria-label="返回灵感袋" onClick={() => setView("bag")}>
              <ArrowLeft size={20} />
            </button>
          ) : (
            <div>
              <span>灵感袋</span>
              <strong>你收集到的灵感卡</strong>
            </div>
          )}
          {view === "detail" && (
            <div>
              <span>灵感卡</span>
              <strong>{inspirationBagCard.title}</strong>
            </div>
          )}
          <button type="button" aria-label="关闭" onClick={onClose}>
            <X size={20} />
          </button>
        </header>

        {view === "bag" ? (
          <div className="bag-home">
            <button className="mini-inspiration-card" type="button" onClick={() => setView("detail")}>
              <span className="mini-inspiration-card__badge">{addedCount > 0 ? `新补进 +${addedCount}` : "已收进"}</span>
              <span className="mini-inspiration-card__covers" aria-hidden="true">
                {inspirationBagCard.covers.map((cover, index) => (
                  <img src={cover} alt="" key={cover} />
                ))}
              </span>
              <span className="mini-inspiration-card__body">
                <strong>{inspirationBagCard.title}</strong>
                <small>3 个打开方式</small>
                <small>已收集 {inspirationBagCard.baseCount} 条{addedCount > 0 ? ` · 新补进 +${addedCount}` : ""}</small>
                <span className="mini-card-stat">{inspirationBagCard.distribution}</span>
                <span className="mini-chip-row">
                  {inspirationBagCard.chips.map((chip) => (
                    <em key={chip}>{chip}</em>
                  ))}
                </span>
                <span className="mini-progress">
                  <i style={{ width: "72%" }} />
                </span>
                <span className="mini-card-gap">
                  <b>{inspirationBagCard.completeness}</b>
                  {inspirationBagCard.gap}
                </span>
              </span>
              <ChevronRight size={19} />
            </button>

            <p className="bag-home__hint">灵感袋不是第二个收藏夹。它会把后来刷到的相关内容继续补回同一张灵感卡。</p>
            <button className="bag-continue" type="button" onClick={onContinueFeed}>
              继续刷视频
            </button>
          </div>
        ) : (
          <div className="bag-detail">
            <p className="bag-detail__source">{inspirationBagCard.source}</p>

            <div className="child-direction-list">
              {inspirationBagCard.childDirections.map((direction) => {
                const isUpdated = hasVideo3Update && direction.id === "erhai";
                return (
                  <button
                    className={`child-direction-card ${isUpdated ? "child-direction-card--updated" : ""}`}
                    key={direction.id}
                    type="button"
                    onClick={() => onOpenExplore(direction.id)}
                  >
                    <MediaView media={direction.media} alt={direction.title} />
                    <div>
                      <span>{isUpdated ? "新补进 +1" : "打开方式"}</span>
                      <strong>{direction.title}</strong>
                      <small>{direction.summary}</small>
                    </div>
                    <ChevronRight className="child-direction-card__arrow" size={17} />
                  </button>
                );
              })}
            </div>

            <div className="action-gap-card">
              <p>这张灵感还差一个「什么时候去」，就可以变成一次小行动。</p>
              {actionState === "idle" && (
                <button className="save-primary" type="button" onClick={() => setActionState("choosing")}>
                  变成一次小行动
                  <ChevronRight size={16} />
                </button>
              )}
            </div>

            {actionState !== "idle" && (
              <div className={`light-action-panel ${actionState === "reminded" ? "light-action-panel--done" : ""}`}>
                <div className="light-action-panel__title">
                  {actionState === "reminded" ? <CheckCircle2 size={17} /> : <Sparkles size={17} />}
                  <strong>{actionState === "reminded" ? "已设置灵感浮现" : "这张灵感可以先这样开始"}</strong>
                </div>
                {actionState === "reminded" ? (
                  <p>周五晚上，知音会把这张卡轻轻递回来。</p>
                ) : (
                  <>
                    <p>不用做完整攻略，先选一个低压力的小行动：</p>
                    <div className="light-action-options">
                      {actionOptions.map((option) => (
                        <span key={option}>{option}</span>
                      ))}
                    </div>
                    <div className="light-action-buttons">
                      <button className="save-primary" type="button" onClick={() => setActionState("reminded")}>
                        <Bell size={15} />
                        周五晚上提醒我
                      </button>
                      <button className="save-secondary" type="button" onClick={onContinueFeed}>
                        继续补灵感
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
