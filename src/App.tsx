import { useMemo, useState } from "react";
import { DouyinFeedScreen } from "./components/DouyinFeedScreen";
import { MetricsPanel } from "./components/MetricsPanel";
import { PhoneFrame } from "./components/PhoneFrame";
import { ZhiyinSheet } from "./components/ZhiyinSheet";
import { CafeExploreSheet, type ExploreTopic } from "./components/CafeExploreSheet";
import { triggerContent, userSignal } from "./data/mockData";
import { applyTuning, generateBundles } from "./lib/orchestration";
import type { TuningChip } from "./types";

export default function App() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedChips, setSelectedChips] = useState<TuningChip[]>([]);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [textConstraint, setTextConstraint] = useState("");
  const [screen, setScreen] = useState<"feed" | ExploreTopic>("feed");

  const bundles = useMemo(() => generateBundles(userSignal, triggerContent), []);
  const activeBundle = bundles[activeIndex];
  const tunedBundle = useMemo(
    () => applyTuning(activeBundle, selectedChips, textConstraint),
    [activeBundle, selectedChips, textConstraint],
  );

  const handleSelectBundle = (index: number) => {
    setActiveIndex(index);
    setSelectedChips([]);
    setTextConstraint("");
    setIsInputOpen(false);
  };

  const handleToggleChip = (chip: TuningChip) => {
    setSelectedChips((current) =>
      current.some((item) => item.id === chip.id)
        ? current.filter((item) => item.id !== chip.id)
        : [...current, chip],
    );
  };

  return (
    <main className="app-shell">
      <PhoneFrame>
        {screen === "feed" ? (
          <>
            <DouyinFeedScreen isSheetOpen={isSheetOpen} onOpenZhiyin={() => setIsSheetOpen(true)} />
            <ZhiyinSheet
              isOpen={isSheetOpen}
              bundles={bundles}
              activeIndex={activeIndex}
              tunedBundle={tunedBundle}
              selectedChips={selectedChips}
              textConstraint={textConstraint}
              isInputOpen={isInputOpen}
              onClose={() => setIsSheetOpen(false)}
              onOpenExplore={(topic) => {
                setIsSheetOpen(false);
                setScreen(topic);
              }}
              onSelectBundle={handleSelectBundle}
              onToggleChip={handleToggleChip}
              onToggleInput={() => setIsInputOpen((value) => !value)}
              onTextConstraintChange={setTextConstraint}
            />
          </>
        ) : (
          <>
            <DouyinFeedScreen isSheetOpen onOpenZhiyin={() => setScreen("feed")} />
            <CafeExploreSheet
              topic={screen}
              onBack={() => {
                setScreen("feed");
                setIsSheetOpen(true);
              }}
            />
          </>
        )}
      </PhoneFrame>
      <MetricsPanel />
    </main>
  );
}
