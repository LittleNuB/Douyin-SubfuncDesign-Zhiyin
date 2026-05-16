import { useMemo, useState } from "react";
import { DouyinFeedScreen } from "./components/DouyinFeedScreen";
import { InspirationBagSheet } from "./components/InspirationBagSheet";
import { InspirationSaveSheet } from "./components/InspirationSaveSheet";
import { MetricsPanel } from "./components/MetricsPanel";
import { PhoneFrame } from "./components/PhoneFrame";
import { ZhiyinSheet } from "./components/ZhiyinSheet";
import { CafeExploreSheet, type ExploreTopic } from "./components/CafeExploreSheet";
import { triggerContent, userSignal } from "./data/mockData";
import { applyTuning, generateBundles } from "./lib/orchestration";
import type { FeedVideoItem, TuningChip } from "./types";

type Overlay = "none" | "saveConfirm" | "saveSuccess" | "addSuccess" | "inspirationBag";

export default function App() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedChips, setSelectedChips] = useState<TuningChip[]>([]);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [textConstraint, setTextConstraint] = useState("");
  const [screen, setScreen] = useState<"feed" | ExploreTopic>("feed");
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [pendingTopic, setPendingTopic] = useState<ExploreTopic>("erhai");
  const [isInspirationSaved, setIsInspirationSaved] = useState(false);
  const [addedFeedIds, setAddedFeedIds] = useState<string[]>([]);
  const [lastAddedItem, setLastAddedItem] = useState<FeedVideoItem | undefined>();

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

  const handlePrepareSave = (topic: ExploreTopic, index: number) => {
    handleSelectBundle(index);
    setPendingTopic(topic);
    setIsSheetOpen(false);
    setOverlay("saveConfirm");
  };

  const handleSaveInspiration = () => {
    setIsInspirationSaved(true);
    setOverlay("saveSuccess");
  };

  const handleAddToInspiration = (item: FeedVideoItem) => {
    setIsInspirationSaved(true);
    setLastAddedItem(item);
    setAddedFeedIds((current) => (current.includes(item.id) ? current : [...current, item.id]));
    setOverlay("addSuccess");
  };

  const closeOverlays = () => {
    setOverlay("none");
  };

  return (
    <main className="app-shell">
      <PhoneFrame>
        {screen === "feed" ? (
          <>
            <DouyinFeedScreen
              isSheetOpen={isSheetOpen || overlay !== "none"}
              onOpenZhiyin={() => {
                setOverlay("none");
                setIsSheetOpen(true);
              }}
              onAddToInspiration={handleAddToInspiration}
              isInspirationSaved={isInspirationSaved}
              addedFeedIds={addedFeedIds}
              onOpenInspirationBag={() => setOverlay("inspirationBag")}
            />
            <ZhiyinSheet
              isOpen={isSheetOpen && overlay === "none"}
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
              onPrepareSave={handlePrepareSave}
              onSelectBundle={handleSelectBundle}
              onToggleChip={handleToggleChip}
              onToggleInput={() => setIsInputOpen((value) => !value)}
              onTextConstraintChange={setTextConstraint}
            />
            {overlay === "saveConfirm" && (
              <InspirationSaveSheet
                mode="confirm"
                previewTopic={pendingTopic}
                onClose={closeOverlays}
                onSave={handleSaveInspiration}
                onContinueFeed={closeOverlays}
                onViewBag={() => setOverlay("inspirationBag")}
                onPreviewDetail={(topic) => {
                  setOverlay("none");
                  setScreen(topic);
                }}
              />
            )}
            {overlay === "saveSuccess" && (
              <InspirationSaveSheet
                mode="success"
                previewTopic={pendingTopic}
                onClose={closeOverlays}
                onSave={handleSaveInspiration}
                onContinueFeed={closeOverlays}
                onViewBag={() => setOverlay("inspirationBag")}
                onPreviewDetail={(topic) => {
                  setOverlay("none");
                  setScreen(topic);
                }}
              />
            )}
            {overlay === "addSuccess" && (
              <InspirationSaveSheet
                mode="addSuccess"
                previewTopic={pendingTopic}
                addedFeedId={lastAddedItem?.id}
                addedTitle={lastAddedItem?.title}
                onClose={closeOverlays}
                onSave={handleSaveInspiration}
                onContinueFeed={closeOverlays}
                onViewBag={() => setOverlay("inspirationBag")}
                onPreviewDetail={(topic) => {
                  setOverlay("none");
                  setScreen(topic);
                }}
              />
            )}
            {overlay === "inspirationBag" && (
              <InspirationBagSheet
                addedFeedIds={addedFeedIds}
                onClose={closeOverlays}
                onContinueFeed={closeOverlays}
                onOpenExplore={(topic) => {
                  setOverlay("none");
                  setScreen(topic);
                }}
              />
            )}
          </>
        ) : (
          <>
            <DouyinFeedScreen
              isSheetOpen
              onOpenZhiyin={() => setScreen("feed")}
              onAddToInspiration={handleAddToInspiration}
              isInspirationSaved={isInspirationSaved}
              addedFeedIds={addedFeedIds}
              onOpenInspirationBag={() => {
                setScreen("feed");
                setOverlay("inspirationBag");
              }}
            />
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
