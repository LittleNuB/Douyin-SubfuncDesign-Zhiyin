# Zhiyin Web Demo Technical Plan

Updated: 2026-05-17

## Goal

Build a stable local web demo for the Douyin AI Hackathon. The demo shows Zhiyin as an AI sub-feature inside a Douyin-like feed.

The implementation prioritizes demo reliability and visual clarity over real backend integration.

Current implementation includes the vertical short-video feed, real local video assets, and the 灵感袋 loop documented in `zhiyin-inspiration-bag-development-plan.md`.

## Tech Stack

- Vite
- React
- TypeScript
- CSS
- lucide-react
- local mock data

No backend is required.

## Commands

Install:

```bash
npm install
```

Run:

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

Build:

```bash
npm run build
```

Build must pass after every change.

## Data Model

Media is represented by `MediaAsset`:

```ts
export type MediaAsset = {
  type: "image" | "video";
  src: string;
  poster?: string;
};
```

`ContentItem` uses `media`, not the old `coverUrl` shape.

Video assets can be added later without changing business components:

```ts
media: {
  type: "video",
  src: "/assets/erhai.mp4"
}
```

`poster` is optional in the type, but the current feed videos intentionally do not use posters.

Feed videos are represented by `FeedVideoItem` in `src/types.ts`. The current feed uses five local video files:

- `/assets/feed-video-1.mp4`
- `/assets/feed-video-2.mp4`
- `/assets/feed-video-3.mp4`
- `/assets/feed-video-4.mp4`
- `/assets/feed-video-5.mp4`

Feed video poster policy:

- None. `feed-image-*` files were intentionally removed from the feed video setup.
- Do not reintroduce feed posters unless explicitly requested.

## Component Map

### 2026-05-17 Routing And Intro Architecture

`App.tsx` now owns only a lightweight route switch:

- `/`: pure interactive phone demo, rendered through `ZhiyinDemoExperience`.
- `/intro`: product introduction and synchronized roadshow, rendered through `ProductIntroSite`.

`ZhiyinDemoExperience.tsx` owns the reusable demo state that previously lived at app level:

- `screen`: `feed | erhai | snow | food`
- `isSheetOpen`
- `overlay`: `none | addSuccess | inspirationBag`
- `isInspirationSaved`
- `addedFeedIds`
- `lastAddedItem`

It accepts an optional `demoPreset` prop for `/intro` only. When no preset is passed, the pure `/` route remains manually interactive.

`ProductIntroSite.tsx` renders the 16-step Xiaolin journey. Each `下一步` advances one right-side phone-demo action, then the left-side journey state updates from the active step.

Preset fields currently supported:

- `activeVideoIndex`
- `favoritedIds`
- `isSheetOpen`
- `overlay`
- `isInspirationSaved`
- `addedFeedIds`
- `lastAddedFeedId`
- `zhiyinOpeningIndex`
- `zhiyinClueIndex`
- `initialReminderSet`

### `App.tsx`

Owns top-level state:

- `screen`: `feed | erhai | snow | food`
- `isSheetOpen`
- `overlay`: `none | addSuccess | inspirationBag`
- `isInspirationSaved`
- `addedFeedIds`
- `lastAddedItem`

Current note:

- `App.tsx` now owns the local mock state for the 灵感袋 flow.
- It tracks whether the parent card is saved, which feed items were added, and the last added item.

Navigation rules:

- Feed + Zhiyin home are shown when `screen === "feed"`.
- Detail sheets are shown when `screen` is an explore topic.
- Detail sheet back returns to feed state with `isSheetOpen=true`, which shows the Zhiyin home sheet again.

### `DouyinFeedScreen.tsx`

Renders the Douyin-like vertical video feed:

- status bar
- top channel row
- right interaction rail
- bottom copy
- Zhiyin entry
- Douyin-style bottom tab bar
- background media via `MediaView`
- pointer and wheel swipe navigation
- looping feed behavior
- preloading current/adjacent media

Current behavior:

- Video 1: no Zhiyin entry.
- Video 2: Zhiyin entry.
- Video 3 and 4: lightweight follow-up prompt via `ZhiyinFollowupPrompt`.
- The favorite/star action can be toggled locally and increments the displayed count.

### `ZhiyinSheet.tsx`

Renders the Zhiyin home half-sheet:

- sheet handle
- close button
- warm paper card
- brand row
- understood copy
- embedded parent card: "慢下来也能出片"
- segmented tabs: 洱海边 / 雪山照 / 本地味
- source clue rows that switch the left-side image in place
- gray "不感兴趣" and black "收进灵感袋" actions before save
- compact saved state with "继续刷视频" and "查看灵感袋"

### `InspirationCarousel.tsx`

Current behavior:

- renders three direction cards
- direction card click calls both `onSelectBundle(index)` and `onOpenExplore(topic)`
- renders tuning chips
- renders one-thought input

Important current state:

- The duplicate `active-insight` / evidence text box has been removed.
- The home sheet should fit in one screen without requiring vertical scroll for normal demo content.
- Result-card stacked media is no longer part of the main flow.

Current behavior:

- The main demo path should save the parent card "慢下来也能出片" instead of ending at a detail sheet.
- The existing detail sheet can remain as a secondary action such as "先看看详情".
- The three direction cards remain child directions under the parent inspiration card.

### `CafeExploreSheet.tsx`

Legacy name, current responsibility:

```ts
export type ExploreTopic = "erhai" | "snow" | "food";
```

It renders all three compact detail sheets:

- Erhai
- Snow mountain
- Local food

Current detail layout:

- inset half-screen window
- compact header
- short intro
- large horizontal media card strip
- clickable active dots
- bottom-pinned opening method copy

### `MediaView.tsx`

Shared image/video renderer:

- image: `<img>`
- video: `<video muted autoPlay loop playsInline preload>`

Business components should keep using `MediaView`.

`MediaView` still supports optional `poster`, but feed data currently omits it.

### `ZhiyinFollowupPrompt.tsx`

Lightweight prompt displayed on later feed videos.

Current behavior:

- Shows "这条可以补进你的「慢下来也能出片」".
- Clicking it opens a lightweight add-success toast.
- The toast offers "查看灵感袋" and "继续刷视频".

### `InspirationSaveSheet.tsx`

- save confirmation for "慢下来也能出片"
- save success feedback
- lightweight add-success toast after Video 3/4 prompts

### `InspirationBagSheet.tsx`

- merged single-layer 灵感袋 half-sheet
- parent card: "慢下来也能出片"
- status line: `3 个打开方式 · 已收集 9 条` plus `新补进 +N` when available
- three child direction rows: Erhai, snow mountain, local food
- row click routes to existing `CafeExploreSheet` topics
- lightweight tuning chips: 更慢一点 / 少走路 / 更出片
- bottom "变成一次小行动" strip with mock reminder state

The previous mini-card home and second-layer card detail are intentionally merged for the current one-card demo.

### `orchestration.ts`

Local rule-based AI simulation:

- `generateBundles`
- `applyTuning`

No real model call is used in this demo.

## Styling Notes

Main stylesheet: `src/styles.css`.

Important classes:

- `.phone-frame`
- `.feed-screen`
- `.zhiyin-entry`
- `.zhiyin-sheet`
- `.zhiyin-paper-card`
- `.understood-card`
- `.direction-strip`
- `.direction-card`
- `.chip-row`
- `.idea-input-wrap`
- `.cafe-layer`
- `.explore-sheet`
- `.cafe-card-strip`
- `.cafe-card`
- `.cafe-note`
- `.feed-slide`
- `.douyin-tabbar`
- `.zhiyin-followup`

Implemented classes:

- `.inspiration-bag-sheet`
- `.inspiration-bag-sheet--merged`
- `.bag-merged-card`
- `.bag-direction-row`
- `.bag-tune-chip`
- `.bag-action-strip`
- `.inspiration-add-toast`
- `.inspiration-bag-entry`
- `.save-hero-card`
- `.zhiyin-main-card`
- `.zhiyin-opening-tabs`
- `.zhiyin-clue-card`

Current key layout decisions:

- Zhiyin home paper card is inset inside the half-sheet.
- Detail sheets use `left: 12px`, `right: 12px`, `bottom: 8px`, and `height: calc(68% - 24px)`.
- Detail sheets are flex columns.
- The media strip flexes to consume available vertical space.
- Opening method copy is bottom-pinned with `margin: auto 20px 14px`.

## Testing Plan

After every change:

```bash
npm run build
```

Manual browser checks:

- `/` opens the pure phone demo without the metrics panel.
- `/intro` opens the product introduction site.
- `/intro` can advance through all 16 steps with one right-side demo action per `下一步`.
- `/intro` desktop controls stay fixed on the left and the `下一步` button remains fully visible.
- `/intro` mobile controls dock at the bottom and do not cover the main story content.
- Feed still looks like a Douyin sub-feature context.
- Five feed videos swipe vertically and loop.
- Video 1 has no Zhiyin entry.
- Video 2 has Zhiyin entry.
- Video 3/4 have follow-up prompts.
- Zhiyin home opens and fits without needing scroll for normal content.
- Direction cards navigate to the correct topic.
- Erhai/Snow/Food sheets have the same compact window size.
- Detail media cards can scroll horizontally.
- Dot clicks switch detail cards.
- Back from detail returns to the Zhiyin home sheet.
- Zhiyin home source clue clicks switch the left-side image in place.
- "不感兴趣" closes the Zhiyin home sheet without saving.
- "查看灵感袋" opens the merged 灵感袋 sheet directly.
- Video 3/4 add-success feedback is a compact toast, not a large feedback card.
- 灵感袋 direction rows open the correct detail sheet.
- 灵感袋 tuning chips show short feedback.
- "设个提醒" changes to a mock "已记下" state.

## Known Non-P0 Items

- Old stacked result-card CSS may remain but is not in the main flow.
- Real AI model integration is not part of the current demo.
- Real analytics tracking is not implemented.
- 灵感袋 data is local mock state only; no persistence across refresh.

## 2026-05-16 Implementation Status

Current implementation status:

- Feed data now includes five local video assets: `/assets/feed-video-1.mp4` through `/assets/feed-video-5.mp4`.
- Feed videos still intentionally omit `poster`.
- App-level local state tracks whether the inspiration card is saved, which feed ids were added, and the last added feed id.
- `InspirationSaveSheet.tsx` handles save confirmation, save success, and add-success states.
- `InspirationBagSheet.tsx` handles the first-layer mini card, card detail, child-direction navigation, and mock light-action reminder.
- `CafeExploreSheet.tsx` supports per-card source labels for收藏/点赞/转发/评论 signals.
- The three child directions in the saved card route to the existing compact detail sheets instead of creating new pages.
- `README.md` has been added for the GitHub repository landing page.

Validation:

```bash
npm run build
```

The latest build passed after the current updates.

## 2026-05-17 Implementation Status

Current implementation status:

- `ZhiyinSheet.tsx` has replaced the old carousel-first surface with an embedded parent inspiration card.
- The home card supports in-place opening tabs and source clue image switching.
- The unsaved action row includes `不感兴趣` and `收进灵感袋`; the saved state remains in the same sheet.
- `InspirationSaveSheet.tsx` uses a compact add-success toast for Video 3/4 feed updates.
- `InspirationBagSheet.tsx` now renders one merged 灵感袋 surface instead of a mini-card home plus card-detail layer.
- The merged 灵感袋 includes direction rows, tuning chips, and a mock lightweight action strip.
- Direction rows route to the existing `CafeExploreSheet` topics.
- `/intro` now provides a product introduction site and a synchronized 16-step Xiaolin user journey.
- The intro journey uses `demoPreset` snapshots to keep the roadshow stable while preserving free manual interaction on `/`.
- `DouyinFeedScreen`, `ZhiyinSheet`, and `InspirationBagSheet` now expose optional preset hooks used only by the intro route.
- The old metrics panel has been removed from the pure `/` demo route.
- Intro navigation is fixed on the left on desktop and bottom-docked on mobile so `下一步` stays fully visible.

Validation:

```bash
npm run build
```

The latest build passed after these updates.
