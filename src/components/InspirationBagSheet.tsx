import { Bell, CheckCircle2, ChevronRight, Sparkles, X } from "lucide-react";
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

type TuneId = "slower" | "lessWalking" | "photoFirst";

const tuneOptions: Array<{ id: TuneId; label: string; feedback: string }> = [
  {
    id: "slower",
    label: "更慢一点",
    feedback: "已按「更慢一点」重新整理：优先保留咖啡、日落和少移动的内容。",
  },
  {
    id: "lessWalking",
    label: "少走路",
    feedback: "已按「少走路」重新整理：咖啡、日落和住宿会更靠近同一片区。",
  },
  {
    id: "photoFirst",
    label: "更出片",
    feedback: "已按「更出片」重新整理：雪山机位和穿搭参考会更靠前。",
  },
];

export function InspirationBagSheet({ addedFeedIds, onClose, onOpenExplore }: InspirationBagSheetProps) {
  const [selectedTune, setSelectedTune] = useState<TuneId | undefined>();
  const [isReminderSet, setIsReminderSet] = useState(false);
  const addedCount = addedFeedIds.length;
  const hasUpdates = addedCount > 0;
  const selectedTuneCopy = tuneOptions.find((option) => option.id === selectedTune)?.feedback;

  return (
    <div className="inspiration-layer">
      <button className="inspiration-backdrop" aria-label="关闭灵感袋" onClick={onClose} />
      <section className="inspiration-sheet inspiration-bag-sheet inspiration-bag-sheet--merged" aria-label="灵感袋">
        <div className="sheet-handle" />
        <header className="inspiration-sheet__header inspiration-sheet__header--merged">
          <div>
            <span>来自知音持续补全</span>
            <strong>灵感袋</strong>
          </div>
          <button type="button" aria-label="关闭" onClick={onClose}>
            <X size={20} />
          </button>
        </header>

        <div className="bag-merged">
          <section className="bag-merged-card" aria-label={inspirationBagCard.title}>
            <div className="bag-merged-card__hero">
              <div>
                <strong>{inspirationBagCard.title}</strong>
                <small>
                  3 个打开方式 · 已收集 {inspirationBagCard.baseCount} 条{hasUpdates ? ` · 新补进 +${addedCount}` : ""}
                </small>
              </div>
              {hasUpdates && <span>新补进 +{addedCount}</span>}
            </div>

            <div className="bag-direction-list" aria-label="打开方式">
              {inspirationBagCard.childDirections.map((direction) => {
                const isUpdated = hasUpdates && direction.id === "erhai";
                return (
                  <button
                    className={isUpdated ? "bag-direction-row bag-direction-row--updated" : "bag-direction-row"}
                    key={direction.id}
                    type="button"
                    onClick={() => onOpenExplore(direction.id)}
                  >
                    <MediaView media={direction.media} alt={direction.title} />
                    <span>
                      <strong>{direction.title}</strong>
                      <small>{direction.summary}</small>
                    </span>
                    {isUpdated && <em>新补进 +{addedCount}</em>}
                    <ChevronRight size={16} />
                  </button>
                );
              })}
            </div>

            <div className="bag-tune-strip" aria-label="轻调节">
              {tuneOptions.map((option) => (
                <button
                  className={selectedTune === option.id ? "bag-tune-chip bag-tune-chip--active" : "bag-tune-chip"}
                  type="button"
                  key={option.id}
                  onClick={() => setSelectedTune(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {selectedTuneCopy && (
              <p className="bag-tune-feedback">
                <Sparkles size={13} />
                {selectedTuneCopy}
              </p>
            )}
          </section>

          <section className={isReminderSet ? "bag-action-strip bag-action-strip--done" : "bag-action-strip"} aria-label="变成一次小行动">
            <div>
              <span>{isReminderSet ? "已记下" : "变成一次小行动"}</span>
              <strong>{isReminderSet ? "知音会在周末前提醒你先看一眼。" : "周末先找一家低配代餐"}</strong>
            </div>
            <button type="button" onClick={() => setIsReminderSet(true)}>
              {isReminderSet ? <CheckCircle2 size={15} /> : <Bell size={15} />}
              {isReminderSet ? "已记下" : "设个提醒"}
            </button>
          </section>
        </div>
      </section>
    </div>
  );
}
