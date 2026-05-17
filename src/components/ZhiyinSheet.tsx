import { Bookmark, CheckCircle2, Heart, MessageCircle, MountainSnow, PackagePlus, Repeat2, Sparkles, X } from "lucide-react";
import { useState } from "react";
import type { InspirationBundle } from "../types";

type ZhiyinSheetProps = {
  isOpen: boolean;
  bundles: InspirationBundle[];
  isInspirationSaved: boolean;
  onClose: () => void;
  onSaveInspiration: () => void;
  onContinueFeed: () => void;
  onViewBag: () => void;
};

const directionTitles = ["去洱海边慢下来", "拍一组雪山人生照", "把晚上留给本地味道"];
const directionSummaries = ["窗边咖啡、日落、少走路", "机位、穿搭、上午光线", "菌子火锅、小街、夜市"];
const directionTabs = ["洱海边", "雪山照", "本地味"];
const openingClues = [
  [
    { signal: "收藏", title: "窗边等日落", detail: "坐下来等风和日落", image: "/assets/cafe-window.webp" },
    { signal: "点赞", title: "海边骑行慢下来", detail: "沿湖一小段，不赶路", image: "/assets/erhai-cycling.webp" },
    { signal: "收藏", title: "湖边住一晚", detail: "把日落留到最后", image: "/assets/erhai-stay.webp" },
  ],
  [
    { signal: "收藏", title: "先看干净机位", detail: "上午光线更稳", image: "/assets/snow-spot.webp" },
    { signal: "转发", title: "穿搭先配好", detail: "白色和浅蓝更出片", image: "/assets/snow-outfit.webp" },
    { signal: "评论", title: "雪山同款角度", detail: "到现场少纠结", image: "/assets/snow-mountain.webp" },
  ],
  [
    { signal: "收藏", title: "菌子火锅先安排", detail: "先吃一锅热的", image: "/assets/food-restaurant.webp" },
    { signal: "点赞", title: "夜市小吃慢慢逛", detail: "顺路逛小摊", image: "/assets/food-street.webp" },
    { signal: "评论", title: "本地味道别错过", detail: "避开游客动线", image: "/assets/night-market.webp" },
  ],
];

const signalIcons: Record<string, typeof Bookmark> = {
  收藏: Bookmark,
  点赞: Heart,
  转发: Repeat2,
  评论: MessageCircle,
};

export function ZhiyinSheet({
  isOpen,
  bundles,
  isInspirationSaved,
  onClose,
  onSaveInspiration,
  onContinueFeed,
  onViewBag,
}: ZhiyinSheetProps) {
  const [activeOpeningIndex, setActiveOpeningIndex] = useState(0);
  const [activeClueIndex, setActiveClueIndex] = useState(0);
  const activeTitle = directionTitles[activeOpeningIndex];
  const activeSummary = directionSummaries[activeOpeningIndex];
  const activeClues = openingClues[activeOpeningIndex];
  const activeClue = activeClues[activeClueIndex] ?? activeClues[0];

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

        <div className="zhiyin-paper-card zhiyin-paper-card--single">
          <div className="paper-brand-row">
            <div className="paper-brand">
              <span>
                <Sparkles size={15} />
              </span>
              <strong>知音</strong>
              <em>来自你的收藏 + AI补全</em>
            </div>
            <div className="paper-star-badge" aria-hidden="true">
              <Sparkles size={20} fill="currentColor" />
            </div>
          </div>

          <div className="understood-card understood-card--compact">
            <p>我知道你喜欢的云南：洱海、雪山机位、民族风穿搭、地道美食</p>
          </div>

          <div className="zhiyin-main-card">
            <div className="zhiyin-main-card__title">
              <div>
                <h3>慢下来也能出片</h3>
                <p>一张会继续生长的灵感卡</p>
              </div>
              <MountainSnow size={88} strokeWidth={1.1} />
            </div>

            <div className="zhiyin-opening-zone" aria-label="三个打开方式">
              <div className="zhiyin-section-title">
                <strong>3 个打开方式</strong>
              </div>
              <div className="zhiyin-opening-tabs" role="tablist" aria-label="打开方式切换">
                {bundles.map((bundle, index) => (
                  <button
                    className={index === activeOpeningIndex ? "zhiyin-opening-tab zhiyin-opening-tab--active" : "zhiyin-opening-tab"}
                    type="button"
                    role="tab"
                    aria-selected={index === activeOpeningIndex}
                    key={bundle.id}
                    onClick={() => {
                      setActiveOpeningIndex(index);
                      setActiveClueIndex(0);
                    }}
                  >
                    {directionTabs[index]}
                  </button>
                ))}
              </div>
              <div className="zhiyin-opening-detail" role="tabpanel">
                <img
                  className="zhiyin-opening-image"
                  key={activeClue.image}
                  src={activeClue.image}
                  alt={`${activeTitle}：${activeClue.title}`}
                />
                <div className="zhiyin-opening-copy">
                  <strong>{activeTitle}</strong>
                  <small>{activeSummary}</small>
                  <div className="zhiyin-clue-list" aria-label={`${activeTitle}内容线索`}>
                    {activeClues.map((clue, clueIndex) => {
                      const Icon = signalIcons[clue.signal] ?? Bookmark;
                      const isActiveClue = clueIndex === activeClueIndex;
                      return (
                        <button
                          className={isActiveClue ? "zhiyin-clue-card zhiyin-clue-card--active" : "zhiyin-clue-card"}
                          type="button"
                          aria-pressed={isActiveClue}
                          key={`${clue.signal}-${clue.title}`}
                          onClick={() => setActiveClueIndex(clueIndex)}
                        >
                          <Icon size={15} />
                          <span>
                            <b>{clue.signal}</b>
                            {clue.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="zhiyin-save-panel">
              {isInspirationSaved ? (
                <>
                  <div className="zhiyin-save-success">
                    <CheckCircle2 size={17} />
                    <span>
                      <strong>已收进灵感袋</strong>
                      之后刷到相关内容，知音会继续帮你补进去。
                    </span>
                  </div>
                  <div className="zhiyin-save-actions">
                    <button className="zhiyin-save-primary" type="button" onClick={onContinueFeed}>
                      继续刷视频
                    </button>
                    <button className="zhiyin-save-secondary" type="button" onClick={onViewBag}>
                      查看灵感袋
                    </button>
                  </div>
                </>
              ) : (
                <div className="zhiyin-save-choice">
                  <button className="zhiyin-save-secondary" type="button" onClick={onContinueFeed}>
                    不感兴趣
                  </button>
                  <button className="zhiyin-save-primary" type="button" onClick={onSaveInspiration}>
                    <PackagePlus size={17} />
                    收进灵感袋
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
