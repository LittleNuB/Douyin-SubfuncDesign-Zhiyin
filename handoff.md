# Zhiyin Web Demo Handoff

Updated: 2026-05-16

## Product Positioning

Zhiyin is a Douyin in-feed AI sub-feature for the AI Hackathon demo. It is not a standalone app, not a travel guide product, not a search tool, and not a chatbot.

Current demo scenario:

- Yunnan
- Dali
- Erhai
- Three follow-up themes: Erhai, snow mountain, local food

Core product grammar:

- Douyin-style video feed remains the primary scene.
- Zhiyin appears as a native black entry pill inside the feed content layer.
- Opening Zhiyin shows a half-screen card.
- The user starts from AI-organized suggestions, then lightly tunes with chips or one short thought.

## Current Implementation

Stack:

- Vite
- React
- TypeScript
- CSS
- lucide-react
- local mock data

Local URL:

```bash
http://127.0.0.1:5173
```

Run:

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Build:

```bash
npm run build
```

The latest build before this handoff passes.

## Key Files

- `src/App.tsx`: top-level screen state and navigation.
- `src/components/DouyinFeedScreen.tsx`: Douyin-style feed.
- `src/components/ZhiyinSheet.tsx`: Zhiyin home half-sheet.
- `src/components/InspirationCarousel.tsx`: three direction cards, chips, one-thought input.
- `src/components/CafeExploreSheet.tsx`: shared detail sheet for `erhai`, `snow`, and `food`.
- `src/components/MediaView.tsx`: image/video renderer.
- `src/data/mockData.ts`: local demo data and asset references.
- `src/lib/orchestration.ts`: local rule-based AI simulation.
- `src/styles.css`: all UI styling.
- `public/assets/*.webp`: current Image2-generated placeholder assets.

## Current UX Flow

1. User sees an Erhai sunset-like Douyin feed item.
2. User taps the Zhiyin entry pill.
3. Zhiyin home half-sheet opens with a warm paper card.
4. The home sheet says it understands the user's Yunnan interests.
5. Three direction cards are shown:
   - Go slow by Erhai
   - Take a snow mountain life photo set
   - Keep the evening for local food
6. Tapping a direction card directly opens the matching detail sheet:
   - `erhai` -> "Kan Erhai"
   - `snow` -> "Kan Xueshan"
   - `food` -> "Kan Meishi"
7. The detail sheet uses a compact inner window, large horizontal media cards, clickable dots, and a bottom-pinned "opening method" line.
8. The top-left back button on a detail sheet returns to the Zhiyin home sheet.
9. Returning to the raw feed should remain a pull-down / close-sheet style action.

## Latest UI State

Zhiyin home:

- Warm paper-card style inside the Douyin feed.
- Brand row: Zhiyin + "from your favorites + AI completion".
- Main understood copy remains at the top.
- Three direction cards are the main visual choice surface.
- The duplicate `active-insight` text/evidence box was removed so the whole home sheet fits in one screen.
- Chips and one-thought input remain, but are visually compact.

Detail sheets:

- `CafeExploreSheet` now handles all three themes, despite the legacy file name.
- Detail windows are inset left/right and height-matched to the Zhiyin home card, not full-width.
- Layout is compact: header, intro, large media strip, dots, bottom-pinned opening method.
- Media cards scale to fill the remaining vertical space and reduce blank area.
- Search icon exists only as a light entry, not the main workflow.

## Current Assets

Assets are in `public/assets/`:

- `erhai-sunset.webp`
- `cafe-window.webp`
- `cafe-street.webp`
- `erhai-cycling.webp`
- `erhai-stay.webp`
- `snow-spot.webp`
- `snow-outfit.webp`
- `snow-mountain.webp`
- `food-restaurant.webp`
- `food-street.webp`
- `night-market.webp`
- `cafe-cat.webp`

Current assets are still stage/demo images. Future video replacement should keep the same `MediaAsset` shape:

```ts
media: {
  type: "video",
  src: "/assets/example.mp4",
  poster: "/assets/example-poster.webp"
}
```

## Hard Constraints

Do not:

- Turn Zhiyin into a standalone app.
- Add full itinerary planning.
- Add Day 1 / Day 2 route plans.
- Add map routing.
- Make search the main workflow.
- Add chatbot bubbles or assistant welcome copy.
- Put commercial CTAs on the first Zhiyin home screen.

Keep:

- Douyin sub-feature feeling.
- Half-sheet interaction.
- Yunnan / Erhai main scenario.
- Direction-card first interaction.
- Lightweight tuning.

## Next Useful Checks

When continuing:

1. Read this file plus the other three docs.
2. Run `git status --short`.
3. Run `npm run build`.
4. Open `http://127.0.0.1:5173`.
5. Check the home sheet and all three detail sheets visually.

## Suggested Prompt For Next Conversation

```text
Please continue taking over the current workspace project "Zhiyin Web Demo".
First read handoff.md, zhiyin-product-brief.md, zhiyin-web-demo-technical-plan.md, and zhiyin-ui-reference.md.

This is a Douyin AI Hackathon demo. Zhiyin is an AI sub-feature inside the Douyin feed, not a standalone app, travel guide, search tool, or chatbot.
The project is Vite + React + TypeScript and runs at http://127.0.0.1:5173.

Please inspect current code and running state first, then continue implementing my UI comments.
Important rules: keep the Douyin sub-feature feeling; current scenario is Yunnan/Erhai; the home sheet should fit on one screen; the Erhai/Snow/Food detail sheets should stay compact with large media and bottom-pinned opening copy; run npm run build after every change.
```
