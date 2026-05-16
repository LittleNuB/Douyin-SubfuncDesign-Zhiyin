import { Plus, Sparkles } from "lucide-react";

type ZhiyinFollowupPromptProps = {
  target: string;
  isAdded: boolean;
  onAdd: () => void;
};

export function ZhiyinFollowupPrompt({ target, isAdded, onAdd }: ZhiyinFollowupPromptProps) {
  return (
    <button
      className={`zhiyin-followup ${isAdded ? "zhiyin-followup--added" : ""}`}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onAdd}
      disabled={isAdded}
    >
      <span className="zhiyin-followup__mark">
        <Sparkles size={15} />
      </span>
      <span className="zhiyin-followup__copy">
        <strong>{isAdded ? `已加入「${target}」` : `这条刚好补上「${target}」里的日落氛围`}</strong>
        <small>{isAdded ? "这张灵感卡已更新" : "补进同一张会生长的灵感卡"}</small>
      </span>
      <span className="zhiyin-followup__action">
        {isAdded ? "已加入" : (
          <>
            <Plus size={15} />
            加入
          </>
        )}
      </span>
    </button>
  );
}
