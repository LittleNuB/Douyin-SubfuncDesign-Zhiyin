import { useEffect, useMemo, useState } from "react";
import { CafeExploreSheet, type ExploreTopic } from "./CafeExploreSheet";
import { DouyinFeedScreen } from "./DouyinFeedScreen";
import { InspirationBagSheet } from "./InspirationBagSheet";
import { InspirationSaveSheet } from "./InspirationSaveSheet";
import { PhoneFrame } from "./PhoneFrame";
import { ZhiyinSheet } from "./ZhiyinSheet";
import { feedVideos, triggerContent, userSignal } from "../data/mockData";
import { generateBundles } from "../lib/orchestration";
import type { FeedVideoItem } from "../types";

type Overlay = "none" | "addSuccess" | "inspirationBag";

export type ZhiyinDemoPreset = {
  activeVideoIndex?: number;
  favoritedIds?: string[];
  isSheetOpen?: boolean;
  overlay?: Overlay;
  isInspirationSaved?: boolean;
  addedFeedIds?: string[];
  lastAddedFeedId?: string;
  zhiyinOpeningIndex?: number;
  zhiyinClueIndex?: number;
  initialReminderSet?: boolean;
};

type ZhiyinDemoExperienceProps = {
  demoPreset?: ZhiyinDemoPreset;
};

export function ZhiyinDemoExperience({ demoPreset }: ZhiyinDemoExperienceProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [screen, setScreen] = useState<"feed" | ExploreTopic>("feed");
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [isInspirationSaved, setIsInspirationSaved] = useState(false);
  const [addedFeedIds, setAddedFeedIds] = useState<string[]>([]);
  const [lastAddedItem, setLastAddedItem] = useState<FeedVideoItem | undefined>();

  const bundles = useMemo(() => generateBundles(userSignal, triggerContent), []);

  useEffect(() => {
    if (!demoPreset) return;

    const presetAddedIds = demoPreset.addedFeedIds ?? [];
    const presetLastAddedId = demoPreset.lastAddedFeedId ?? presetAddedIds[presetAddedIds.length - 1];

    setScreen("feed");
    setIsSheetOpen(demoPreset.isSheetOpen ?? false);
    setOverlay(demoPreset.overlay ?? "none");
    setIsInspirationSaved(demoPreset.isInspirationSaved ?? false);
    setAddedFeedIds(presetAddedIds);
    setLastAddedItem(feedVideos.find((item) => item.id === presetLastAddedId));
  }, [demoPreset]);

  const handleSaveInspiration = () => {
    setIsInspirationSaved(true);
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
            activeIndexOverride={demoPreset?.activeVideoIndex}
            favoritedIdsOverride={demoPreset?.favoritedIds}
          />
          <ZhiyinSheet
            isOpen={isSheetOpen && overlay === "none"}
            bundles={bundles}
            isInspirationSaved={isInspirationSaved}
            activeOpeningIndexPreset={demoPreset?.zhiyinOpeningIndex}
            activeClueIndexPreset={demoPreset?.zhiyinClueIndex}
            onClose={() => setIsSheetOpen(false)}
            onSaveInspiration={handleSaveInspiration}
            onContinueFeed={() => setIsSheetOpen(false)}
            onViewBag={() => {
              setIsSheetOpen(false);
              setOverlay("inspirationBag");
            }}
          />
          {overlay === "addSuccess" && (
            <InspirationSaveSheet
              mode="addSuccess"
              previewTopic="erhai"
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
              initialReminderSet={demoPreset?.initialReminderSet}
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
            activeIndexOverride={demoPreset?.activeVideoIndex}
            favoritedIdsOverride={demoPreset?.favoritedIds}
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
  );
}
