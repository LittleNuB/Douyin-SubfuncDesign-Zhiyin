# Zhiyin Web Demo UI Reference

Updated: 2026-05-16

## UI Goal

Zhiyin should feel like a native AI layer inside Douyin's feed. It should not look like a separate web app, travel guide, search tool, or chatbot.

Priority:

1. Keep the Douyin video feed as the main scene.
2. Make Zhiyin feel like it naturally grows from the feed.
3. Use half-sheet / panel grammar.
4. Keep all detail pages compact and media-led.
5. Treat saved results as collectible inspiration cards, not itinerary documents.

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
- top search-led entry
- guide-page navigation

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
6. recommendation row with refresh button placeholder
7. three direction cards
8. tuning chips
9. one-thought input

Latest decision:

- The duplicate insight/evidence text box below the direction cards has been removed.
- The home sheet should show all normal content in one screen.
- It should not require vertical scroll for the demo path.

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

Hierarchy:

1. 灵感袋
2. 缩尺灵感卡: 慢下来也能出片
3. Child directions inside that card:
   - 去洱海边慢下来
   - 拍一组雪山人生照
   - 把晚上留给本地味道

Do not call the first layer "云南灵感袋". Yunnan is the current scenario, not the product container.

### Mini Inspiration Card

The first layer of 灵感袋 should show a collectible mini card:

- title: 慢下来也能出片
- metadata: 3 个打开方式 / 已收集 9 条 / 新补进 +1
- cover: stacked thumbnails or a compact collage
- chips: 洱海边 / 雪山照 / 本地味

The mini card should feel like an object the user collected. Avoid a plain list row.

### Card Detail

After tapping the mini card, show the three child directions.

Each child direction should be compact:

- title
- one-line summary
- optional update badge
- small media thumbnail

The "去洱海边慢下来" child direction can show "新补进 +1" after Video 3 is added.

The detail should not become a travel guide page. It should show what is inside the saved inspiration card.

### Update Feedback

When the user taps "+ 加入" on a later feed video, show lightweight feedback:

```text
已加入「慢下来也能出片」
知音把这条内容补进了灵感卡。
```

Then offer:

- 查看灵感袋
- 继续刷视频

This feedback should be a half-sheet or compact card, not a full page.

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
- 灵感袋 mini card uses the parent "慢下来也能出片"
- the three child directions are visible only after opening that mini card
- `npm run build` passes

## 2026-05-16 UI Progress Notes

Latest UI decisions:

- The saved inspiration mini card uses a collectible-card layout: top cover collage, centered title/meta/chips/progress, and no text/image overlap.
- The mini card remains a single parent card; child directions are not shown as top-level saved cards.
- Child direction cards in the detail are clickable and use a subtle arrow affordance.
- The lightweight action panel keeps the action low pressure, including `周末先去找个低配代餐`.
- Detail media cards show small source badges. Default is `来自你的收藏`; individual cards can show `你点赞过`, `你转发过`, or `你评论过`.
- The Zhiyin feed entry typography was tightened to keep `你收藏的云南，有 3 种打开方式` visible without changing the original pill layout.
- Video 5 gives the demo a later-feed moment for reopening the saved 灵感袋 card.
