import { ArrowRight, Check, Eye, PackagePlus, X } from "lucide-react";
import type { ExploreTopic } from "./CafeExploreSheet";

type InspirationSaveSheetProps = {
  mode: "confirm" | "success" | "addSuccess";
  previewTopic: ExploreTopic;
  addedFeedId?: string;
  addedTitle?: string;
  onClose: () => void;
  onSave: () => void;
  onContinueFeed: () => void;
  onViewBag: () => void;
  onPreviewDetail: (topic: ExploreTopic) => void;
};

const updateLines = {
  video3: ["日落氛围 +1", "咖啡馆内容 +1", "低强度停留 +1"],
  video4: ["大理氛围 +1", "情绪片段 +1", "旅行转场灵感 +1"],
};

export function InspirationSaveSheet({
  mode,
  previewTopic,
  addedFeedId,
  addedTitle,
  onClose,
  onSave,
  onContinueFeed,
  onViewBag,
  onPreviewDetail,
}: InspirationSaveSheetProps) {
  const isConfirm = mode === "confirm";
  const isAddSuccess = mode === "addSuccess";
  const lines = addedFeedId === "feed-erhai-cycling" ? updateLines.video4 : updateLines.video3;

  return (
    <div className="inspiration-layer">
      <button className="inspiration-backdrop" aria-label="关闭灵感卡弹层" onClick={onClose} />
      <section className="inspiration-sheet inspiration-save-sheet" aria-label="灵感卡保存">
        <div className="sheet-handle" />
        <header className="inspiration-sheet__header">
          <div>
            <span>{isConfirm ? "收进灵感袋" : isAddSuccess ? "灵感卡已更新" : "已收进灵感袋"}</span>
            <strong>慢下来也能出片</strong>
          </div>
          <button type="button" aria-label="关闭" onClick={onClose}>
            <X size={20} />
          </button>
        </header>

        <div className="save-hero-card">
          <div className="save-hero-card__icon">
            {isConfirm ? <PackagePlus size={22} /> : <Check size={22} />}
          </div>
          <div>
            <p>
              {isConfirm
                ? "已为你整理出「慢下来也能出片」"
                : isAddSuccess
                  ? "已加入「慢下来也能出片」"
                  : "已收进灵感袋"}
            </p>
            <h3>
              {isConfirm
                ? "它不是一条收藏，而是一张会继续生长的灵感卡。要收进灵感袋吗？"
                : isAddSuccess
                  ? "这张灵感更完整了。"
                  : "之后刷到相关内容，知音会继续帮你补进去。这张卡会慢慢长成一次可以行动的小灵感。"}
            </h3>
          </div>
        </div>

        {isAddSuccess && (
          <div className="update-list" aria-label="本次更新">
            <span>本次补进</span>
            {lines.map((line) => (
              <em key={line}>{line}</em>
            ))}
            {addedTitle && <p>刚刚补进：{addedTitle}</p>}
          </div>
        )}

        <div className="save-actions">
          {isConfirm ? (
            <>
              <button className="save-primary" type="button" onClick={onSave}>
                收进灵感袋
                <ArrowRight size={16} />
              </button>
              <button className="save-secondary" type="button" onClick={() => onPreviewDetail(previewTopic)}>
                <Eye size={16} />
                先看看详情
              </button>
            </>
          ) : mode === "success" ? (
            <>
              <button className="save-primary" type="button" onClick={onContinueFeed}>
                继续刷视频
                <ArrowRight size={16} />
              </button>
              <button className="save-secondary" type="button" onClick={onViewBag}>
                查看灵感袋
              </button>
            </>
          ) : (
            <>
              <button className="save-primary" type="button" onClick={onViewBag}>
                查看灵感袋
                <ArrowRight size={16} />
              </button>
              <button className="save-secondary" type="button" onClick={onContinueFeed}>
                继续刷视频
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
