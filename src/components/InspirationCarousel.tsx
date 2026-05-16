import { ChevronRight } from "lucide-react";
import type { InspirationBundle, TuningChip } from "../types";
import type { ExploreTopic } from "./CafeExploreSheet";
import { MediaView } from "./MediaView";

type InspirationCarouselProps = {
  bundles: InspirationBundle[];
  activeIndex: number;
  tunedBundle: InspirationBundle;
  selectedChips: TuningChip[];
  textConstraint: string;
  isInputOpen: boolean;
  onSelectBundle: (index: number) => void;
  onToggleChip: (chip: TuningChip) => void;
  onToggleInput: () => void;
  onTextConstraintChange: (value: string) => void;
  onOpenExplore: (topic: ExploreTopic) => void;
};

export function InspirationCarousel({
  bundles,
  activeIndex,
  tunedBundle,
  selectedChips,
  textConstraint,
  isInputOpen,
  onSelectBundle,
  onToggleChip,
  onToggleInput,
  onTextConstraintChange,
  onOpenExplore,
}: InspirationCarouselProps) {
  const activeChipIds = new Set(selectedChips.map((chip) => chip.id));
  const directionTitles = ["去洱海边慢下来", "拍一组雪山人生照", "把晚上留给本地味道"];
  const directionTopics: ExploreTopic[] = ["erhai", "snow", "food"];

  return (
    <div className="carousel">
      <div className="direction-strip" role="tablist" aria-label="知音打开方式">
        {bundles.map((bundle, index) => {
          const previewCard = bundle.cards[0];
          const previewItem = previewCard.items[0];

          return (
            <button
              className={`direction-card ${index === activeIndex ? "direction-card--active" : ""}`}
              key={bundle.id}
              onClick={() => {
                onSelectBundle(index);
                onOpenExplore(directionTopics[index] ?? "erhai");
              }}
              role="tab"
              aria-selected={index === activeIndex}
            >
              <span className="direction-card__number">{String(index + 1).padStart(2, "0")}</span>
              <MediaView className="direction-card__media" media={previewItem.media} alt={previewItem.title} />
              <span className="direction-card__copy">
                <strong>{directionTitles[index] ?? bundle.title}</strong>
                <small>{previewCard.subtitle}</small>
              </span>
            </button>
          );
        })}
      </div>

      <div className="chip-row" aria-label="轻量调一调">
        {tunedBundle.chips.map((chip) => (
          <button
            key={chip.id}
            className={`tune-chip ${activeChipIds.has(chip.id) ? "tune-chip--active" : ""}`}
            onClick={() => onToggleChip(chip)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="idea-input-wrap">
        <button className="idea-toggle" type="button" onClick={onToggleInput}>
          加一句想法
          <ChevronRight size={15} className={isInputOpen ? "rotate" : ""} />
        </button>
        {isInputOpen && (
          <div className="idea-input">
            <input
              value={textConstraint}
              onChange={(event) => onTextConstraintChange(event.target.value)}
              placeholder="比如：想带妈妈去 / 不想太累"
            />
            <button type="button" onClick={() => onTextConstraintChange(textConstraint || "想带妈妈去")}>
              调一下
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
