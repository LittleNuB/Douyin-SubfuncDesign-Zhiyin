# Zhiyin Web Demo UI Reference

Updated: 2026-05-17

## UI Goal

Zhiyin should feel like a native AI layer inside Douyin's feed. It should not look like a separate web app, travel guide, search tool, or chatbot.

Priority:

1. Keep the Douyin video feed as the main scene.
2. Make Zhiyin feel like it naturally grows from the feed.
3. Use half-sheet / panel grammar.
4. Keep all detail pages compact and media-led.
5. Treat saved results as collectible inspiration cards, not itinerary documents.

## Product Intro Site

`/intro` is the roadshow site, not a marketing landing page.

It should feel like a product story board:

- dark Douyin scene background
- warm paper story panels
- restrained badges and status labels
- left-side journey explanation
- right-side embedded phone demo during live demo steps

The page tells the story of Xiaolin, a university student who is interested in Yunnan travel but has not started planning yet. The intro should show her accumulated behavior signals before it shows the phone demo.

Demo controls:

- `下一步` advances one demo action at a time.
- On desktop, controls are fixed on the left side of the screen and must stay fully visible.
- On mobile, controls dock at the bottom and must not obscure the main content.

Avoid:

- traditional favorites-folder positioning
- commercial CTA language in the current MVP flow
- hotel / booking / route-planning blocks
- long strategy-guide text
- generic SaaS dashboard styling
- a separate app-like navigation system

### Summary Scope Block

The final product summary page should include a restrained scope block after the product definition and before the four value cards.

Content intent:

- Zhiyin is not only for a travel journey.
- It can also organize a dinner, a walk, or a small weekend idea.
- The shared pattern is "content interest -> organized inspiration card -> low-pressure action".

Visual rules:

- Keep the block warm-paper and compact.
- Use three small cards or chips for `一段旅程`, `一次晚餐`, and `一次散步`.
- Do not make the examples feel like new modules, ads, maps, routes, or booking flows.

## Feed Page

Keep:

- vertical video background
- vertical swipe interaction
- status bar
- top channel navigation
- left menu icon
- right interaction rail
- bottom author/copy/location/music/comment layers
- black Zhiyin entry pill near the bottom content layer
- Douyin-style bottom tab bar

Avoid:

- center modal launchers
- large floating CTA buttons
- autoplaying audible music before user interaction
- top search-led entry
- guide-page navigation

## Intro Background Music Toggle

The `/intro` roadshow page can include one restrained background-music control near the previous/next controls.

Rules:

- Default state is off.
- User click starts or pauses the local mp3.
- Keep playback volume low enough for a spoken demo.
- The control should stay near `上一步` / `下一步`, not inside the pure phone demo.
- The pure `/` demo route should not show a background music button.
- Do not add a playlist, volume slider, waveform, or music-player surface.

Current feed rule:

- The first video should not show the Zhiyin entry.
- The second video should show the Zhiyin entry.
- Later videos can show a lighter "补进灵感" prompt.

## Zhiyin Entry

The entry should feel like native content continuation, not an ad.

Current entry intent:

- "Your saved Yunnan has three ways to open"
- "Zhiyin organized it"
- "Open and see"

Visual:

- dark translucent pill
- small Zhiyin mark
- fits in the video content layer

## Zhiyin Home Sheet

Current structure:

1. drag handle
2. close button
3. warm paper card
4. brand row
5. understood copy
6. embedded parent inspiration card: 慢下来也能出片
7. three segmented opening tabs: 洱海边 / 雪山照 / 本地味
8. current tab detail: left image, right title/summary/source clues
9. bottom action row: 不感兴趣 / 收进灵感袋

Latest decision:

- The duplicate insight/evidence text box below the direction cards has been removed.
- The home sheet should show all normal content in one screen.
- It should not require vertical scroll for the demo path.
- Source clues inside the current tab switch the left image in place. They do not open a new page.
- Saving stays in the current card and exposes "继续刷视频" and "查看灵感袋".

Visual direction:

- warm paper / receipt-like card
- restrained Zhiyin branding
- small stamp detail
- subtle gold accent
- no large AI gradient
- no independent app chrome

## Direction Cards

Current three cards:

- Go slow by Erhai
- Take a snow mountain life photo set
- Keep the evening for local food

Behavior:

- Click directly opens the matching detail page.
- The cards are choices, not itinerary steps.

Current behavior:

- For the main demo path, clicking a direction should lead into saving the parent inspiration card "慢下来也能出片".
- Existing detail sheets can remain as secondary exploration.
- The three direction cards are child directions under "慢下来也能出片", not separate top-level saved cards.

Visual:

- horizontal small card group
- image on top
- title and short copy below
- active state is visible but not loud
- compact enough to leave room for chips and one-thought input

## Tuning Chips

Current chip examples:

- slower
- more photogenic
- less walking
- lower budget
- suitable for two people

Principles:

- chips are lightweight tuning, not filters for a search result page
- keep one row horizontal scroll if needed
- do not expand into a full settings panel

## One-Thought Input

This is a short constraint input, not a chat box.

Correct:

- collapsed by default
- opens one short input row
- examples like "with mom" or "not too tiring"

Avoid:

- chatbot bubbles
- assistant greeting
- long textarea
- full-screen search

## Detail Sheets

Current implementation uses `CafeExploreSheet` for:

- Erhai
- Snow mountain
- Food

Despite the component name, these are general topic detail sheets.

Current layout:

- inset window matching Zhiyin home card scale
- compact header
- light search icon only as a weak entry
- short "Zhiyin continues organizing" intro
- large horizontal media cards
- active dots
- bottom-pinned opening method copy

Important recent adjustment:

- Detail sheets are not full-width.
- Detail media should be large and use available vertical space.
- Bottom blank area should be avoided.
- Opening method text should sit at the bottom.

## Topic Content

Erhai:

- cafes
- cycling
- restaurants
- stays

Snow mountain:

- photo spots
- outfits
- same-angle inspiration

Food:

- restaurants
- night market
- local snacks

Keep topic pages as inspiration continuations, not full guides.

## Inspiration Bag

The current implemented collection surface is 灵感袋.

Current hierarchy:

1. 灵感袋
2. Expanded parent inspiration card: 慢下来也能出片
3. Child directions inside that card:
   - 去洱海边慢下来
   - 拍一组雪山人生照
   - 把晚上留给本地味道

Do not call the first layer "云南灵感袋". Yunnan is the current scenario, not the product container.

### Merged Inspiration Bag

The current one-card demo merges the 灵感袋 home and the card detail into one half-sheet.

Opening 灵感袋 should directly show:

- header: 灵感袋 / 来自知音持续补全
- parent title: 慢下来也能出片
- metadata: 3 个打开方式 · 已收集 9 条 · 新补进 +1 when updated
- three compact direction rows
- tuning chips: 更慢一点 / 少走路 / 更出片
- bottom action strip: 变成一次小行动

Do not show a separate mini-card home layer in the current demo. If the product later has multiple saved cards, the mini-card layer can return.

### Direction Rows

Each child direction should be compact:

- title
- one-line summary
- optional update badge
- small media thumbnail
- subtle arrow affordance

The "去洱海边慢下来" child direction can show "新补进 +1" after Video 3 is added.

Clicking a direction row opens the existing compact detail sheet for that topic. The direction rows should not expand into a travel guide page.

### Lightweight Action Strip

The merged 灵感袋 must preserve the product loop from inspiration to a small action:

- title: 变成一次小行动
- copy: 把灵感变成更具体的行动安排
- button: 设个提醒
- after click: button/state changes to 已记下 and shows mock reminder copy

This is a mock state only. Do not call real reminders, calendars, maps, or commerce.

### Update Feedback

When the user taps "+ 加入" on a later feed video, show lightweight feedback:

```text
已加入「慢下来也能出片」
知音把这条内容补进了灵感卡。
```

Then offer:

- 查看灵感袋
- 继续刷视频

This feedback should be a lightweight toast or compact card, not a full page or large half-sheet.

## Color And Texture

Feed:

- image/video background
- dark overlays
- white Douyin-style text
- black translucent entry pill

Zhiyin home:

- warm off-white paper
- subtle gold
- dark text
- soft shadow

Detail sheets:

- warm paper tone matching home card
- media cards as visual focus
- subdued text hierarchy
- avoid heavy blue/dark app panel look

## Typography And Readability

Use the existing app font stack. Keep text concise.

Checks:

- direction titles should not wrap awkwardly
- detail card titles should remain readable over media
- projected demo text should be readable at a glance
- no overlapping UI

## Do Not Build

Do not add:

- Day 1 / Day 2 itinerary blocks
- maps or route planning
- large search results page
- chatbot messages
- e-commerce listing UI
- full-screen independent app navigation
- generic collection manager UI
- separate top-level cards for each child direction

## Visual QA Checklist

Before handing off:

- `/intro` opens the product story site.
- `/intro` can advance through the full 16-step journey.
- each `下一步` creates only one visible demo-state change on the right.
- the active journey node follows the current right-side state.
- the desktop `下一步` control is fully visible on the left side.
- the mobile `下一步` control is fully visible in the bottom dock.
- home sheet fits in one screen
- no duplicate insight/evidence box on the home sheet
- three direction cards are visible and tappable
- chips and one-thought input remain visible
- Erhai/Snow/Food sheets share size and layout
- media cards are large enough and reduce blank space
- opening method sits near the bottom of detail sheets
- first video has no Zhiyin entry
- second video has Zhiyin entry
- later videos have lighter follow-up prompts
- 灵感袋 opens directly into the merged "慢下来也能出片" card
- the three child directions are visible in the merged 灵感袋 sheet
- tuning chips show a short feedback line
- the bottom action strip can switch from "设个提醒" to mock "已记下"
- `npm run build` passes

## 2026-05-16 UI Progress Notes

Latest UI decisions:

- The saved inspiration mini card uses a collectible-card layout: top cover collage, centered title/meta/chips/progress, and no text/image overlap.
- The mini card remains a single parent card; child directions are not shown as top-level saved cards.
- Child direction cards in the detail are clickable and use a subtle arrow affordance.
- The lightweight action panel keeps the action low pressure, including `把灵感变成更具体的行动安排`.
- Detail media cards show small source badges. Default is `来自你的收藏`; individual cards can show `你点赞过`, `你转发过`, or `你评论过`.
- The Zhiyin feed entry typography was tightened to keep `你收藏的云南，有 3 种打开方式` visible without changing the original pill layout.
- Video 5 gives the demo a later-feed moment for reopening the saved 灵感袋 card.

## 2026-05-17 UI Progress Notes

Latest UI decisions:

- Zhiyin home now uses a single embedded parent card with segmented opening tabs.
- Right-side source clues inside the home card switch the left-side image in place.
- The home action row includes a gray `不感兴趣` button and a black `收进灵感袋` button.
- Later feed add-success feedback is now a compact toast.
- 灵感袋 home and card detail are merged into one expanded half-sheet for the current one-card demo.
- The merged 灵感袋 preserves the bottom `变成一次小行动` strip with mock reminder state only.
