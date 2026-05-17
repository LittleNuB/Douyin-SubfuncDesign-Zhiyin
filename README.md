# Douyin-subfunc-Zhiyin

知音 Web Demo is a Vite + React + TypeScript prototype for a Douyin in-feed AI sub-feature.

The demo expresses one product idea:

> 知音不是第二个收藏夹，而是一张会生长、会提醒、会走向行动的灵感卡。

## Current Demo Flow

1. Browse a Douyin-style vertical video feed.
2. Video 1 is normal browsing.
3. Video 2 shows the Zhiyin entry.
4. Open Zhiyin to see the parent inspiration card `慢下来也能出片` and three opening directions.
5. Save the parent card into `灵感袋`.
6. Continue browsing; Video 3 and Video 4 can be added into the saved card.
7. Video 5 gives a later browsing moment where the saved `灵感袋` entry can be reopened.
8. Open the merged inspiration bag to see the saved card, its three child directions, tuning chips, and the lightweight action exit.

## Run Locally

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Open:

```text
http://127.0.0.1:5173
```

Build:

```bash
npm run build
```

## Scope

This is a local mock demo only.

It intentionally does not include:

- real AI calls
- real reminders
- maps
- full itinerary planning
- chatbot UI
- commercial conversion pages

All state is local React state and mock data.
