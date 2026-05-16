# Zhiyin Inspiration Bag Development Plan

Updated: 2026-05-16

Status: Implemented in the current local demo.

## Goal

Add the next demo loop for Zhiyin without changing the core positioning:

> Zhiyin is a Douyin in-feed AI layer. It does not generate a full travel guide. It turns scattered user interest into a lightweight inspiration card that can be saved, revisited, and gradually updated.

The new loop should make the product feel complete:

1. Zhiyin generates the main inspiration card: **慢下来也能出片**.
2. The user saves that card into the **灵感袋**.
3. Later feed videos can be added into that same card.
4. The saved card updates, and the user can reopen it from the 灵感袋.

## Product Hierarchy

Use this hierarchy:

1. **灵感袋**
   - Generic container for saved Zhiyin inspiration cards.
   - Do not call it "云南灵感袋"; Yunnan is the current scenario, not the product container.

2. **缩尺灵感卡**
   - The saved unit in the 灵感袋.
   - Current demo has one main card: **慢下来也能出片**.
   - This card is the AI-organized inspiration result.

3. **子内容 / 打开方式**
   - Only visible after opening the saved inspiration card.
   - Current three child directions:
     - 去洱海边慢下来
     - 拍一组雪山人生照
     - 把晚上留给本地味道

Important: **慢下来也能出片** is the parent card. The three directions are not separate top-level inspiration cards.

## Implemented Demo Flow

### 1. Existing Feed Flow

Keep the current vertical Douyin-style feed:

- Video 1: normal feed video, no Zhiyin entry.
- Video 2: shows the Zhiyin entry.
- Video 3 and 4: show the lightweight "补进灵感" prompt.

Do not remove:

- vertical swipe / wheel navigation
- looped feed
- video autoplay / loop
- right action rail
- Douyin-style bottom tab bar

### 2. First Zhiyin Open

On Video 2, the user taps the Zhiyin entry.

Keep the existing Zhiyin home sheet:

- understood copy
- "慢下来也能出片"
- three direction cards
- chips
- one-thought input

### 3. Save Main Inspiration Card

Change the primary click behavior for the first demo path:

- When the user taps the first direction card, do not immediately make the detail page the end of the flow.
- Show a save-confirmation half-sheet or compact card:

```text
已为你整理出「慢下来也能出片」
要收进灵感袋吗？
```

Primary button:

```text
收进灵感袋
```

Secondary action:

```text
先看看详情
```

The secondary action can keep opening the existing `CafeExploreSheet` for Erhai.

### 4. Save Success

After tapping "收进灵感袋", show a success state:

```text
已收进灵感袋
之后刷到相关内容，知音会继续帮你补进去。
```

Actions:

- 继续刷视频
- 查看灵感袋

"继续刷视频" closes the sheet and returns to the feed.

### 5. Add Later Video Into The Saved Card

On Video 3 or 4, the existing lightweight prompt should stay:

```text
这条可以补进你的「慢下来也能出片」
```

Button:

```text
+ 加入
```

After tapping it, show an update feedback sheet:

```text
已加入「慢下来也能出片」
知音把这条内容补进了灵感卡。
```

For the current demo, if Video 3 is added, the update can say:

- 日落氛围 +1
- 咖啡馆内容 +1
- 低强度停留 +1

If Video 4 is added, the update can say:

- 大理氛围 +1
- 情绪片段 +1
- 旅行转场灵感 +1

Actions:

- 查看灵感袋
- 继续刷视频

### 6. Inspiration Bag Sheet

The 灵感袋 first layer should show saved inspiration cards as collectible mini cards.

For this demo, show one saved card:

```text
慢下来也能出片
3 个打开方式
已收集 9 条 · 新补进 +1
```

Mini-card visual requirements:

- Looks like a smaller version of the Zhiyin inspiration card.
- Has a cover collage or stacked thumbnails.
- Shows three small chips:
  - 洱海边
  - 雪山照
  - 本地味
- Shows an updated badge after adding Video 3 or 4.
- Should feel like a collected object, not a settings row.

### 7. Inspiration Card Detail

Clicking the mini card opens the card detail layer:

Title:

```text
慢下来也能出片
```

Subtitle:

```text
来自你刷过、收藏过和刚刚补进的云南内容。
```

Show the three child directions:

1. 去洱海边慢下来
   - Summary: 窗边咖啡、日落、少走路
   - If Video 3 was added, mark this as "新补进 +1".

2. 拍一组雪山人生照
   - Summary: 机位、穿搭、上午光线

3. 把晚上留给本地味道
   - Summary: 菌子火锅、小街、夜市

This detail layer should not be a full itinerary page. It should be a compact overview of what is inside the saved inspiration card.

### 8. Lightweight Adjustment

Inside the card detail, include a small tuning row:

- 更慢一点
- 少走路
- 更出片

When a chip is tapped, show a lightweight updated line:

```text
已按「少走路」重新整理：咖啡、日落和住宿会更靠近同一片区。
```

No complex editing, no full planner, no map.

## State Model Proposal

Add only lightweight local state in `App.tsx`:

```ts
type Overlay =
  | "none"
  | "zhiyinHome"
  | "saveConfirm"
  | "saveSuccess"
  | "addSuccess"
  | "inspirationBag"
  | "inspirationCardDetail"
  | ExploreTopic;
```

Suggested state fields:

- `isInspirationSaved: boolean`
- `addedFeedIds: string[]`
- `lastAddedFeedId?: string`
- `selectedBagChip?: "slower" | "lessWalking" | "photoFirst"`

Keep this local and mock-only.

## Component Plan

Implemented components:

- `InspirationSaveSheet.tsx`
  - save confirmation and save success states
  - add-success feedback after later feed videos are added

- `InspirationBagSheet.tsx`
  - first layer: 灵感袋 with mini inspiration card
  - second layer: card detail with the three child directions under "慢下来也能出片"
  - lightweight tuning row for 更慢一点 / 少走路 / 更出片

Reuse existing components/patterns:

- `MediaView` for covers and thumbnails
- `direction-card` visual language for child direction cards
- existing half-sheet sizing and warm paper styling

Keep existing:

- `CafeExploreSheet` for optional Erhai/Snow/Food details
- `ZhiyinSheet` as the first AI organization surface
- `ZhiyinFollowupPrompt` for Video 3 and 4 feed prompts

## Data Plan

Add mock data in `src/data/mockData.ts`:

```ts
export const inspirationBagCard = {
  id: "slow-photo",
  title: "慢下来也能出片",
  savedCount: 9,
  childDirections: [
    { id: "erhai", title: "去洱海边慢下来", summary: "窗边咖啡、日落、少走路" },
    { id: "snow", title: "拍一组雪山人生照", summary: "机位、穿搭、上午光线" },
    { id: "food", title: "把晚上留给本地味道", summary: "菌子火锅、小街、夜市" }
  ]
};
```

The saved count and update badge can be computed from `addedFeedIds`.

## Visual Rules

Do:

- Keep all new surfaces as half-sheets or inset sheets.
- Make the mini card feel collectible.
- Use "灵感卡" language instead of "攻略".
- Show update badges such as "新补进 +1".
- Make the three child directions visible only after opening the mini card.

Do not:

- Add a full "我的" page.
- Add route planning, maps, Day 1 / Day 2.
- Add a full editor.
- Add a generic list-style collection page.
- Rename the top-level container to "云南灵感袋".

## Acceptance Checklist

Before marking this loop complete:

- Video 2 Zhiyin entry still opens the existing home sheet.
- Saving "慢下来也能出片" puts one mini card into 灵感袋.
- The mini card contains the three child directions only after click/open.
- Video 3/4 "+ 加入" updates the saved mini card.
- The updated state is visible in 灵感袋.
- Existing Erhai/Snow/Food detail sheets still work if used.
- `npm run build` passes.
- Browser check has no console errors.

## 2026-05-16 Current Status

Status: implemented and locally validated.

Implemented after the first loop:

- A fifth feed video was added so the user can reopen the saved 灵感袋 card from a later browsing moment instead of only looping back to Video 1.
- The mini inspiration card layout was refined to avoid overlap and center the card text/progress.
- The card detail's three child directions now navigate to their corresponding detail sheets.
- The light action copy was lowered in commitment: `周末先去找个低配代餐`.
- Detail cards support individual source labels for collection, like, share, and comment signals.

Latest validation:

```bash
npm run build
```

The build passes.
