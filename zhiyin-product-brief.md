# Zhiyin Product Brief

Updated: 2026-05-17

## One-Line Product Definition

Zhiyin is an AI content-organizing layer inside the Douyin feed. When a user is triggered by a piece of content, Zhiyin reorganizes the user's past favorites, likes, watch signals, and shares into a few lightweight ways to open the moment.

It does not answer "show me more Yunnan videos." It answers "what does my saved Yunnan content already say about the way I want to go?"

## Demo Scenario

Current fixed scenario:

- User is browsing a Douyin-style feed.
- The trigger content is an Erhai / Dali sunset scene.
- The user's interest history includes cafes, Erhai sunsets, snow mountain photo spots, ethnic-style outfits, local food, and avoid-pit content.
- Zhiyin turns those signals into three direction cards.

The three current directions:

- Go slow by Erhai.
- Take a snow mountain life photo set.
- Keep the evening for local food.

## Product Opportunity

Douyin already captures many intent signals, but those signals are fragmented:

- favorites
- likes
- long watches
- shares
- similar content interaction

Zhiyin's opportunity is to organize those fragments right when the user is emotionally triggered by related feed content.

In travel-like scenarios, the user may not want a full plan yet. They may only need a first way to open the idea.

The next product loop extends this from one-time organization to continued collection:

- Zhiyin first organizes scattered signals into one parent inspiration card.
- The user saves that card into 灵感袋.
- Later related feed videos can be added into the same card.
- The saved card updates over time and can be reopened.

## Target User

The first demo target is a user who:

- saves travel and lifestyle content but has not organized it
- is inspired by destination content in the feed
- prefers being guided by lightweight suggestions rather than active search
- wants to choose a mood or direction before planning details

This user is earlier than "I booked a trip and need an itinerary." They are at "I kind of want to go."

## Core Experience Principles

### Be Understood Before Being Guided

Zhiyin first shows that it understands the user's taste:

- cafes
- Erhai sunset
- snow mountain spots
- ethnic-style outfits
- local food

Then it offers directions.

### Start From Organized Suggestions

The user should not start from a blank search box. Zhiyin starts with three organized directions, then allows lightweight tuning:

- tap a direction card
- tap chips
- add one short thought

### Stay Inside Douyin

Zhiyin should feel like an intelligent content layer growing from the Douyin feed, not a new app. It should not have full-page navigation, a strategy-tool layout, or chatbot flow.

### Let Interest Become A Collectible Inspiration Card

The saved unit should be a mini inspiration card, not a list item or a travel plan.

For the current demo, the saved parent card is:

> 慢下来也能出片

It contains three child directions:

- 去洱海边慢下来
- 拍一组雪山人生照
- 把晚上留给本地味道

The child directions should be visible only after opening the saved card. They should not be shown as separate top-level cards in 灵感袋.

## Current Demo Flow

1. User browses a vertical Douyin-like feed.
2. The first video behaves like a normal feed video.
3. The second video shows a Zhiyin entry pill in the feed content layer.
4. User opens Zhiyin.
5. Zhiyin home sheet shows the understood copy and the parent inspiration card **慢下来也能出片**.
6. The parent card has three in-place opening tabs and source clues that switch the current image.
7. User saves the card, then can view it in the merged 灵感袋 half-sheet.
8. The merged 灵感袋 directly reveals the three child directions:
   - Erhai
   - Snow mountain
   - Local food
9. Existing compact detail sheets remain available by tapping each direction row.
10. Videos 3 and 4 show lightweight prompts for adding related content into the saved inspiration card.
11. Adding later content uses a compact toast and updates the merged 灵感袋 card, highlighting the relevant child direction.

## Current Demo Loop: 灵感袋

The approved next flow is:

1. User opens Zhiyin from the second video.
2. Zhiyin presents the parent inspiration card idea: **慢下来也能出片**.
3. User chooses the first direction as the demo path.
4. Zhiyin asks whether to save **慢下来也能出片** into 灵感袋.
5. User saves it.
6. User continues browsing the feed.
7. Video 3 or 4 prompts:

   > 这条可以补进你的「慢下来也能出片」

8. User taps "+ 加入".
9. Zhiyin shows that the saved card has updated.
10. User opens 灵感袋 and sees the merged expanded card:

    > 慢下来也能出片

11. User sees the three child directions directly, plus tuning chips and a bottom "变成一次小行动" strip.

This loop should express:

> 灵感袋不是收藏夹，而是一组会生长的灵感卡。

## Commercial Value

Commercial continuation should be delayed and contextual.

Current commercial-like extension surfaces:

- Erhai: cafes, cycling, restaurants, stays
- Snow mountain: photo spots, outfits, templates
- Food: restaurants, night market, local snacks

The demo should not hard-sell hotels, tickets, or group-buy offers on the home sheet. The value comes after the user chooses a direction.

## What The Product Is Not

Zhiyin is not:

- a travel guide page
- a search engine
- a chatbot
- a booking or e-commerce page
- a map route planner
- a Day 1 / Day 2 itinerary generator

## Success Metrics For Demo Storytelling

The metrics panel is for pitch storytelling only. It can show:

- Zhiyin entry click rate
- five-second understanding rate
- direction-card entry rate
- chip usage rate
- card save rate
- commercial continuation click rate
- complete demo path duration

No real tracking is required for the current demo.

## Current Product Risk

Main risks:

- Too much text makes it feel like a guide.
- Too much input makes it feel like a chatbot.
- Too much search makes it feel like a tool.
- Too much commercial UI makes it feel like an ad.
- Full-width detail panels make it feel less like a Douyin sub-feature.
- A generic "云南灵感袋" could feel like a separate travel product instead of a reusable Zhiyin container.
- Showing the three child directions as top-level saved cards would blur the hierarchy.

Current mitigation:

- Home sheet fits in one screen.
- Duplicate insight/evidence box is removed.
- Direction cards are the primary action.
- Detail sheets are compact, inset, media-led, and half-screen.
- 灵感袋 will use one parent mini card for "慢下来也能出片"; the three child directions only appear after the card is opened.

## 2026-05-16 Demo Status

The current prototype now completes the intended product loop:

- Zhiyin organizes scattered Yunnan signals into the parent card `慢下来也能出片`.
- The user saves that parent card into 灵感袋.
- Later feed videos can update the same card instead of creating more top-level saved items.
- The saved card can be reopened from a later browsing moment and expanded into three child directions.
- Each child direction can continue into a compact media-led detail sheet.
- The card can move toward a lightweight action through a mock reminder state.
- The current implementation merges the 灵感袋 home and card detail into one half-sheet because the demo has only one saved parent card.

The product boundary remains unchanged:

- no real AI
- no real reminder integration
- no map
- no complete itinerary
- no chatbot
- no commercial conversion page
