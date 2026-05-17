import { useMemo, useState } from "react";
import { DouyinFeedScreen } from "./components/DouyinFeedScreen";
import { InspirationBagSheet } from "./components/InspirationBagSheet";
import { InspirationSaveSheet } from "./components/InspirationSaveSheet";
import { MetricsPanel } from "./components/MetricsPanel";
import { PhoneFrame } from "./components/PhoneFrame";
import { ZhiyinSheet } from "./components/ZhiyinSheet";
import { CafeExploreSheet, type ExploreTopic } from "./components/CafeExploreSheet";
import { triggerContent, userSignal } from "./data/mockData";
import { generateBundles } from "./lib/orchestration";
import type { FeedVideoItem } from "./types";

type Overlay = "none" | "addSuccess" | "inspirationBag";

export default function App() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [screen, setScreen] = useState<"feed" | ExploreTopic>("feed");
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [isInspirationSaved, setIsInspirationSaved] = useState(false);
  const [addedFeedIds, setAddedFeedIds] = useState<string[]>([]);
  const [lastAddedItem, setLastAddedItem] = useState<FeedVideoItem | undefined>();

  const bundles = useMemo(() => generateBundles(userSignal, triggerContent), []);

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
              isInspirationSaved={isInspirationSaved}
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
