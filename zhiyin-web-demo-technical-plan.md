# Zhiyin Web Demo Technical Plan

Updated: 2026-05-16

## Goal

Build a stable local web demo for the Douyin AI Hackathon. The demo shows Zhiyin as an AI sub-feature inside a Douyin-like feed.

The implementation prioritizes demo reliability and visual clarity over real backend integration.

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
  src: "/assets/erhai.mp4",
  poster: "/assets/erhai-poster.webp"
}
```

## Component Map

### `App.tsx`

Owns top-level state:

- `screen`: `feed | erhai | snow | food`
- `isSheetOpen`
- `activeIndex`
- `selectedChips`
- `textConstraint`
- `isInputOpen`

Navigation rules:

- Feed + Zhiyin home are shown when `screen === "feed"`.
- Detail sheets are shown when `screen` is an explore topic.
- Detail sheet back returns to feed state with `isSheetOpen=true`, which shows the Zhiyin home sheet again.

### `DouyinFeedScreen.tsx`

Renders the Douyin-like feed:

- status bar
- top channel row
- right interaction rail
- bottom copy
- Zhiyin entry
- comment bar
- background media via `MediaView`

### `ZhiyinSheet.tsx`

Renders the Zhiyin home half-sheet:

- sheet handle
- close button
- warm paper card
- brand row
- understood copy
- recommendation row with refresh button placeholder
- `InspirationCarousel`

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
- video: `<video muted autoPlay loop playsInline>`

Business components should keep using `MediaView`.

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

- Feed still looks like a Douyin sub-feature context.
- Zhiyin home opens and fits without needing scroll for normal content.
- Direction cards navigate to the correct topic.
- Erhai/Snow/Food sheets have the same compact window size.
- Detail media cards can scroll horizontally.
- Dot clicks switch detail cards.
- Back from detail returns to the Zhiyin home sheet.

## Known Non-P0 Items

- Real video assets are not yet connected.
- Old stacked result-card CSS may remain but is not in the main flow.
- Real AI model integration is not part of the current demo.
- Real analytics tracking is not implemented.
