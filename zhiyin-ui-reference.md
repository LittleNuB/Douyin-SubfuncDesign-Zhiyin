# Zhiyin Web Demo UI Reference

Updated: 2026-05-16

## UI Goal

Zhiyin should feel like a native AI layer inside Douyin's feed. It should not look like a separate web app, travel guide, search tool, or chatbot.

Priority:

1. Keep the Douyin video feed as the main scene.
2. Make Zhiyin feel like it naturally grows from the feed.
3. Use half-sheet / panel grammar.
4. Keep all detail pages compact and media-led.

## Feed Page

Keep:

- vertical video background
- status bar
- top channel navigation
- left menu icon
- right interaction rail
- bottom author/copy/location/music/comment layers
- black Zhiyin entry pill near the bottom content layer

Avoid:

- center modal launchers
- large floating CTA buttons
- top search-led entry
- guide-page navigation

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

## Visual QA Checklist

Before handing off:

- home sheet fits in one screen
- no duplicate insight/evidence box on the home sheet
- three direction cards are visible and tappable
- chips and one-thought input remain visible
- Erhai/Snow/Food sheets share size and layout
- media cards are large enough and reduce blank space
- opening method sits near the bottom of detail sheets
- `npm run build` passes
