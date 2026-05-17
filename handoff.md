# Zhiyin Web Demo Handoff

Updated: 2026-05-17

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

- `src/App.tsx`: lightweight route switch. `/` renders the pure phone demo, `/intro` renders the product intro site.
- `src/components/ZhiyinDemoExperience.tsx`: reusable phone demo shell and local state owner for feed, Zhiyin sheet, detail sheets, add-success toast, and inspiration bag.
- `src/components/ProductIntroSite.tsx`: `/intro` product story site with the 16-step synchronized user journey.
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
- `public/assets/feed-video-1.mp4` through `feed-video-5.mp4`: current real feed video assets.
- `src/components/InspirationSaveSheet.tsx`: legacy save confirmation/success surface plus lightweight add-success toast for later feed updates.
- `src/components/InspirationBagSheet.tsx`: merged 灵感袋 surface with the saved parent card, child directions, tuning chips, and lightweight action strip in one half-sheet.
- `zhiyin-inspiration-bag-development-plan.md`: implemented development plan for the 灵感袋 loop.

## Product Intro Site

`/intro` is now the hackathon / pitch entry. It keeps the current demo mechanics, but wraps them in a complete target-user journey instead of a metrics panel.

Current structure:

1. Persona storyboard: Xiaolin, a university student who is interested in Yunnan but has not started planning yet.
2. Accumulated behavior storyboard: likes, favorites, comments, shares, and frequent watches around Yunnan content.
3. Synchronized live demo: a 16-step state machine where each `下一步` advances exactly one right-side phone action.
4. Future iteration storyboard: Zhiyin can continue working before summer vacation with a low-pressure reminder.
5. Product summary storyboard: Zhiyin is a Douyin feed AI content-organizing layer, not an independent travel app.

Important implementation details:

- `/intro` passes a `demoPreset` into `ZhiyinDemoExperience`.
- Presets are used only for roadshow stability. The pure `/` route does not pass a preset and remains manually interactive.
- `DouyinFeedScreen` supports optional controlled active video and favorite state for `/intro`.
- `ZhiyinSheet` supports optional preset tab/source-clue state for the "查看灵感卡内容" step.
- `InspirationBagSheet` supports optional initial reminder state for the "设置周末小行动" step.
- On wide screens, the intro controls are fixed on the left side so the `下一步` button stays visible. On narrow screens, controls dock at the bottom.

## Current UX Flow

1. User browses a vertical Douyin-style video feed with five real video assets.
2. Video 1 is a normal feed video and does not show the Zhiyin entry.
3. Video 2 shows the Zhiyin entry pill.
4. User taps the Zhiyin entry pill.
5. Zhiyin home half-sheet opens with a warm paper card.
6. The home sheet says it understands the user's Yunnan interests.
7. Three direction cards are shown:
   - Go slow by Erhai
   - Take a snow mountain life photo set
   - Keep the evening for local food
8. Current implemented behavior: the home sheet presents the parent card "慢下来也能出片" directly, with three segmented opening tabs.
9. The opening tabs switch content in place. Each right-side source clue switches the left image inside the same card.
10. User can save the parent card into 灵感袋 from the current sheet. The save state stays in place with "继续刷视频" and "查看灵感袋".
11. The merged 灵感袋 opens directly into the saved "慢下来也能出片" card, showing its three child directions without a separate mini-card click.
12. The child directions remain connected to the existing detail sheets:
   - `erhai` -> "Kan Erhai"
   - `snow` -> "Kan Xueshan"
   - `food` -> "Kan Meishi"
13. The detail sheet uses a compact inner window, large horizontal media cards, clickable dots, and a bottom-pinned "opening method" line.
14. The top-left back button on a detail sheet returns to the Zhiyin home sheet.
15. Videos 3 and 4 show a lightweight "补进灵感" prompt. Tapping it now shows a compact add-success toast and updates the merged 灵感袋 card.

## Latest UI State

Zhiyin home:

- Warm paper-card style inside the Douyin feed.
- Brand row: Zhiyin + "from your favorites + AI completion".
- Main understood copy remains at the top.
- The first screen now centers on an embedded parent card: "慢下来也能出片".
- The embedded card has three segmented tabs: 洱海边 / 雪山照 / 本地味.
- Each tab has one image and three source clues. Tapping a clue switches the left image in place instead of navigating.
- The bottom action row has a gray "不感兴趣" button and a black "收进灵感袋" button.
- After save, the card stays in place and shows "已收进灵感袋", "继续刷视频", and "查看灵感袋".

Detail sheets:

- `CafeExploreSheet` now handles all three themes, despite the legacy file name.
- Detail windows are inset left/right and height-matched to the Zhiyin home card, not full-width.
- Layout is compact: header, intro, large media strip, dots, bottom-pinned opening method.
- Media cards scale to fill the remaining vertical space and reduce blank area.
- Search icon exists only as a light entry, not the main workflow.

Feed:

- The feed is now a vertical short-video stream with wheel/pointer swipe transitions.
- The feed loops across five videos.
- Feed videos use `MediaAsset` with `type: "video"` and `src` only. The current demo intentionally does not use video posters.
- The right favorite/star action can be tapped and increments the displayed count locally.
- The bottom UI uses a Douyin-style tab bar instead of the previous comment input pill.

Inspiration bag:

- 灵感袋 is a generic container, not "云南灵感袋".
- It saves one parent inspiration card: "慢下来也能出片".
- The 灵感袋 home and card detail are now merged into one expanded half-sheet; there is no separate mini-card layer in the current demo.
- The merged card directly shows three child directions:
  - 去洱海边慢下来
  - 拍一组雪山人生照
  - 把晚上留给本地味道
- Later feed videos update the saved parent card rather than creating new top-level cards.
- The merged card includes lightweight tuning chips: 更慢一点 / 少走路 / 更出片.
- The bottom action strip keeps the "变成一次小行动" exit with mock reminder state only.

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
- `feed-video-5.mp4`

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
6. Check the vertical video feed: first video has no Zhiyin entry, second video has Zhiyin entry, third/fourth videos have follow-up prompts, and fifth video can reopen 灵感袋 after save.
7. Check the 灵感袋 loop: save "慢下来也能出片", open the merged 灵感袋, add Video 3 or 4, and confirm the merged card shows `新补进 +1`.

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

## 2026-05-17 Progress Update

The demo now implements the refined UI direction for the Video 2 Zhiyin home card and the merged 灵感袋 loop:

- `ZhiyinSheet` now shows the parent card "慢下来也能出片" as the main first-screen surface.
- The three opening tabs switch in place, and each right-side source clue switches the left-side image without leaving the card.
- The home save row now includes a gray "不感兴趣" button next to the black "收进灵感袋" button.
- `InspirationSaveSheet` uses a lightweight toast for Video 3/4 add-success feedback instead of a large feedback card.
- `InspirationBagSheet` now merges the 灵感袋 home and card detail into one expanded half-sheet.
- The merged 灵感袋 shows the parent card title, status line, three child direction rows, tuning chips, and the bottom "变成一次小行动" strip.
- The action strip uses mock state only: "设个提醒" changes to "已记下"; no real reminder, calendar, map, or commerce is implemented.
- Latest validation: `npm run build` passes, and browser checks showed no app console errors.

## 2026-05-17 Product Intro Update

The project now includes a separate `/intro` product introduction site for hackathon / pitch use:

- `/` remains the pure interactive phone demo and no longer shows the metrics panel.
- `/intro` presents the complete Xiaolin user journey, then drives the right-side phone demo with a 16-step synchronized state machine.
- `下一步` advances one demo action at a time: Video 1 appears, Video 1 is favorited, Video 2 appears, Zhiyin opens, the card is reviewed, the card is saved, Video 3/4 are added, Video 5 returns to the bag, and the mock reminder state is shown.
- The future iteration page shows a warm-paper reminder concept only. It does not implement real detection, real reminders, maps, planning, chatbot, or commerce.
- The intro navigation was moved to a fixed left-side control on desktop and a bottom dock on mobile so the `下一步` button stays fully visible.
- Latest validation: `npm run build` passes, `/intro` was checked through the synced journey with no console errors, and `/` still loads as the pure demo route.

## 2026-05-17 Final Polish Update

Latest polish before repository sync:

- The product summary page now includes an "applicable scope" block: Zhiyin can organize not only a trip, but also a dinner, a walk, or a small weekend idea.
- Summary positioning now says Zhiyin is not an independent travel app and not a traditional favorites folder.
- Commercial wording is framed as a current MVP boundary: the demo does not expand into maps, full guides, chatbot, or commercial conversion, but this is not a permanent product rejection of commerce.
- User behavior language is now consistently "frequent watches" / `常看`.
- The Zhiyin warm paper card now shrink-wraps its content inside the half-sheet. This removes the large bottom blank area after the save buttons while preserving the 68% sheet region and internal overflow fallback.
- Latest validation: `npm.cmd run build` passes, `/intro` step 2 and step 16 were checked in the browser, and `/intro` steps 6/7/8 no longer show the large warm-paper blank area.

## Suggested Prompt For Next Conversation

```text
Please continue taking over the current workspace project "Zhiyin Web Demo".
First read handoff.md, zhiyin-product-brief.md, zhiyin-web-demo-technical-plan.md, and zhiyin-ui-reference.md.

This is a Douyin AI Hackathon demo. Zhiyin is an AI sub-feature inside the Douyin feed, not a standalone app, travel guide, search tool, or chatbot.
The project is Vite + React + TypeScript and runs at http://127.0.0.1:5173.

Please inspect current code and running state first, then continue implementing my UI comments.
Important rules: keep the Douyin sub-feature feeling; current scenario is Yunnan/Erhai; the home sheet should fit on one screen; the Erhai/Snow/Food detail sheets should stay compact with large media and bottom-pinned opening copy; run npm run build after every change.
```
