import { RefreshCw, Sparkles, X } from "lucide-react";
import type { InspirationBundle, TuningChip } from "../types";
import type { ExploreTopic } from "./CafeExploreSheet";
import { InspirationCarousel } from "./InspirationCarousel";

type ZhiyinSheetProps = {
  isOpen: boolean;
  bundles: InspirationBundle[];
  activeIndex: number;
  tunedBundle: InspirationBundle;
  selectedChips: TuningChip[];
  textConstraint: string;
  isInputOpen: boolean;
  onClose: () => void;
  onOpenExplore: (topic: ExploreTopic) => void;
  onSelectBundle: (index: number) => void;
  onToggleChip: (chip: TuningChip) => void;
  onToggleInput: () => void;
  onTextConstraintChange: (value: string) => void;
  onPrepareSave?: (topic: ExploreTopic, index: number) => void;
};

export function ZhiyinSheet({
  isOpen,
  bundles,
  activeIndex,
  tunedBundle,
  selectedChips,
  textConstraint,
  isInputOpen,
  onClose,
  onOpenExplore,
  onSelectBundle,
  onToggleChip,
  onToggleInput,
  onTextConstraintChange,
  onPrepareSave,
}: ZhiyinSheetProps) {
  return (
    <div className={`sheet-layer ${isOpen ? "sheet-layer--open" : ""}`} aria-hidden={!isOpen}>
      <button className="sheet-backdrop" aria-label="关闭知音" onClick={onClose} />
      <section className="zhiyin-sheet" aria-label="知音半屏卡">
        <div className="sheet-handle" />
        <header className="sheet-header">
          <div>
            <strong>知音</strong>
            <span>根据你收藏的云南内容整理</span>
          </div>
          <button className="sheet-close" type="button" onClick={onClose} aria-label="关闭">
            <X size={22} />
          </button>
        </header>

        <div className="zhiyin-paper-card">
          <div className="paper-brand-row">
            <div className="paper-brand">
              <span>
                <Sparkles size={15} />
              </span>
              <strong>知音</strong>
              <em>来自你的收藏 + AI补全</em>
            </div>
            <div className="paper-stamp" aria-hidden="true">
              <span>知音</span>
              <small>FOR YOU</small>
            </div>
          </div>

          <div className="understood-card">
            <p>我知道你喜欢的云南：</p>
            <h2>
              咖啡馆、雪山机位、民族风穿搭、地道美食…
              <span>都记住了。</span>
            </h2>
            <div className="recommendation-row">
              <p>所以猜你会喜欢——<strong>慢下来也能出片。</strong></p>
              <button className="refresh-recommendation" type="button" aria-label="换一换推荐方案">
                <RefreshCw size={13} />
                换一换
              </button>
            </div>
          </div>

          <InspirationCarousel
            bundles={bundles}
            activeIndex={activeIndex}
            tunedBundle={tunedBundle}
            selectedChips={selectedChips}
            textConstraint={textConstraint}
            isInputOpen={isInputOpen}
            onSelectBundle={onSelectBundle}
            onToggleChip={onToggleChip}
            onToggleInput={onToggleInput}
            onTextConstraintChange={onTextConstraintChange}
            onOpenExplore={onOpenExplore}
            onPrepareSave={onPrepareSave}
          />
        </div>
      </section>
    </div>
  );
}
