import { ChevronRight, Sparkles } from "lucide-react";

type ZhiyinEntryProps = {
  onOpen: () => void;
};

export function ZhiyinEntry({ onOpen }: ZhiyinEntryProps) {
  return (
    <button className="zhiyin-entry" onPointerDown={(event) => event.stopPropagation()} onClick={onOpen}>
      <span className="zhiyin-entry__mark">
        <Sparkles size={16} />
      </span>
      <span className="zhiyin-entry__copy">
        <strong>你收藏的云南，有 3 种打开方式</strong>
        <small>知音已整理好</small>
      </span>
      <span className="zhiyin-entry__action">
        打开看看 <ChevronRight size={16} />
      </span>
    </button>
  );
}
