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
- The next approved loop is persistent inspiration collection: save the parent inspiration card "慢下来也能出片" into 灵感袋, then let later feed videos update that saved card.

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
- `src/components/ZhiyinFollowupPrompt.tsx`: lightweight follow-up prompt for adding later feed videos into the saved inspiration card.
- `src/components/ZhiyinSheet.tsx`: Zhiyin home half-sheet.
- `src/components/InspirationCarousel.tsx`: three direction cards, chips, one-thought input.
- `src/components/CafeExploreSheet.tsx`: shared detail sheet for `erhai`, `snow`, and `food`.
- `src/components/MediaView.tsx`: image/video renderer.
- `src/data/mockData.ts`: local demo data and asset references.
- `src/lib/orchestration.ts`: local rule-based AI simulation.
- `src/styles.css`: all UI styling.
- `public/assets/*.webp`: current Image2-generated placeholder assets.
- `public/assets/feed-video-1.mp4` through `feed-video-4.mp4`: current real feed video assets.
- `src/components/InspirationSaveSheet.tsx`: save confirmation, save success, and add-success feedback.
- `src/components/InspirationBagSheet.tsx`: 灵感袋 with one mini inspiration card and its child-direction detail.
- `zhiyin-inspiration-bag-development-plan.md`: implemented development plan for the 灵感袋 loop.

## Current UX Flow

1. User browses a vertical Douyin-style video feed with four real video assets.
2. Video 1 is a normal feed video and does not show the Zhiyin entry.
3. Video 2 shows the Zhiyin entry pill.
4. User taps the Zhiyin entry pill.
5. Zhiyin home half-sheet opens with a warm paper card.
6. The home sheet says it understands the user's Yunnan interests.
7. Three direction cards are shown:
   - Go slow by Erhai
   - Take a snow mountain life photo set
   - Keep the evening for local food
8. Current implemented behavior: tapping a direction card starts the save flow for the parent card "慢下来也能出片".
9. User can save it into 灵感袋, view the mini inspiration card, and open that card to see the three child directions.
10. The old detail sheets remain available through the save confirmation secondary action "先看看详情":
   - `erhai` -> "Kan Erhai"
   - `snow` -> "Kan Xueshan"
   - `food` -> "Kan Meishi"
11. The detail sheet uses a compact inner window, large horizontal media cards, clickable dots, and a bottom-pinned "opening method" line.
12. The top-left back button on a detail sheet returns to the Zhiyin home sheet.
13. Videos 3 and 4 show a lightweight "补进灵感" prompt. Tapping it opens an update feedback sheet and updates the saved mini inspiration card.

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

Feed:

- The feed is now a vertical short-video stream with wheel/pointer swipe transitions.
- The feed loops across four videos.
- Feed videos use `MediaAsset` with `type: "video"` and `src` only. The current demo intentionally does not use video posters.
- The right favorite/star action can be tapped and increments the displayed count locally.
- The bottom UI uses a Douyin-style tab bar instead of the previous comment input pill.

Inspiration bag:

- 灵感袋 is a generic container, not "云南灵感袋".
- It saves one parent mini inspiration card: "慢下来也能出片".
- Opening that card reveals three child directions:
  - 去洱海边慢下来
  - 拍一组雪山人生照
  - 把晚上留给本地味道
- Later feed videos update the saved parent card rather than creating new top-level cards.
- The detail includes lightweight tuning chips: 更慢一点 / 少走路 / 更出片.

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
- `feed-video-1.mp4`
- `feed-video-2.mp4`
- `feed-video-3.mp4`
- `feed-video-4.mp4`

Current feed assets are real demo videos and do not use poster images. Other topic/detail assets are still stage/demo images. Future video replacement should keep the same `MediaAsset` shape:

```ts
media: {
  type: "video",
  src: "/assets/example.mp4"
}
```

`poster` remains optional in the type for future use, but do not add it to the feed videos unless explicitly requested.

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
- 灵感袋 as a lightweight collection of mini inspiration cards, not a standalone saved-plans app.

## Next Useful Checks

When continuing:

1. Read this file plus the other three docs.
2. Run `git status --short`.
3. Run `npm run build`.
4. Open `http://127.0.0.1:5173`.
5. Check the home sheet and all three detail sheets visually.
6. Check the vertical video feed: first video has no Zhiyin entry, second video has Zhiyin entry, third/fourth videos have follow-up prompts.
7. Check the 灵感袋 loop: save "慢下来也能出片", open the mini card, add Video 3 or 4, and confirm the mini card shows `新补进 +1`.

## 2026-05-16 Progress Update

The demo now implements the MVP loop for "方案 A：灵感卡生命周期":

- The feed has five local videos: Video 1 normal, Video 2 Zhiyin entry, Video 3/4 add-to-inspiration prompts after save, and Video 5 as a later browsing moment with the saved 灵感袋 entry.
- `InspirationSaveSheet` covers save confirmation, save success, and add-success feedback.
- `InspirationBagSheet` shows one collectible mini card for `慢下来也能出片`; the three child directions appear only after opening the card.
- The mini card now uses a separated cover collage and centered text/progress layout to avoid image/text overlap.
- The three child directions in the card detail are clickable and open the existing Erhai/Snow/Food detail sheets.
- The light action exit is implemented with mock reminder copy only; no real system reminder is used.
- Detail media cards now show source badges such as `来自你的收藏`, `你点赞过`, `你转发过`, and `你评论过`.
- `feed-video-5.mp4` has been added to `public/assets/` and does not use a poster.
- Latest validation: `npm run build` passes, and browser checks showed no app console errors.

## Suggested Prompt For Next Conversation

```text
Please continue taking over the current workspace project "Zhiyin Web Demo".
First read handoff.md, zhiyin-product-brief.md, zhiyin-web-demo-technical-plan.md, and zhiyin-ui-reference.md.

This is a Douyin AI Hackathon demo. Zhiyin is an AI sub-feature inside the Douyin feed, not a standalone app, travel guide, search tool, or chatbot.
The project is Vite + React + TypeScript and runs at http://127.0.0.1:5173.

Please inspect current code and running state first, then continue implementing my UI comments.
Important rules: keep the Douyin sub-feature feeling; current scenario is Yunnan/Erhai; the home sheet should fit on one screen; the Erhai/Snow/Food detail sheets should stay compact with large media and bottom-pinned opening copy; run npm run build after every change.
```
