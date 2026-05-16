import { baseBundles } from "../data/mockData";
import type { ContentItem, InspirationBundle, TuningChip, UserSignal } from "../types";

export function generateBundles(
  _userSignal: UserSignal,
  _triggerContent: ContentItem,
): InspirationBundle[] {
  return baseBundles;
}

export function applyTuning(
  bundle: InspirationBundle,
  selectedChips: TuningChip[],
  textConstraint?: string,
): InspirationBundle {
  if (selectedChips.length === 0 && !textConstraint?.trim()) {
    return bundle;
  }

  const effects = new Set(selectedChips.map((chip) => chip.effect));
  let cards = [...bundle.cards];
  let insight = bundle.insight;

  if (effects.has("lessWalking")) {
    cards = cards.map((card) => ({
      ...card,
      title: card.title.includes("少走路") ? card.title : `少走路 · ${card.title}`,
    }));
    insight = "知音已把咖啡、日落和低强度移动方式排在更前面。";
  }

  if (effects.has("photoFirst")) {
    insight = "知音已把更适合出片的光线、机位和穿搭内容排在更前面。";
    cards = cards.map((card) => ({
      ...card,
      subtitle: `${card.subtitle} 更适合留下好看的片段。`,
    }));
  }

  if (effects.has("local")) {
    insight = "知音已优先保留更像本地人会去的内容，减少游客感打卡。";
    cards = cards.map((card) => ({
      ...card,
      subtitle: `${card.subtitle} 本地小店和低调点位会更靠前。`,
    }));
  }

  if (effects.has("budget")) {
    insight = "知音已把预算更友好的选择前置，优先保留免费风景和轻消费点位。";
  }

  if (effects.has("family")) {
    insight = "知音已按两个人一起出发来调整，减少折腾，保留更舒服的停留点。";
  }

  if (effects.has("slower")) {
    insight = "知音已把节奏放慢，优先保留能坐下来、看风和等日落的内容。";
  }

  const normalizedText = textConstraint?.trim();
  if (normalizedText) {
    const familyHint = /妈妈|父母|家人|老人/.test(normalizedText);
    insight = familyHint
      ? `收到“${normalizedText}”。知音已把舒服落座、少走路和就近咖啡排到更前面。`
      : `收到“${normalizedText}”。知音已按这句话重新校准当前组合。`;
    cards = cards.map((card) => ({
      ...card,
      subtitle: familyHint ? "更适合慢一点、舒服一点地一起去。" : card.subtitle,
    }));
  }

  return {
    ...bundle,
    insight,
    cards,
  };
}
