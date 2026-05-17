# Douyin-subfunc-Zhiyin

知音 Web Demo 是一个 Vite + React + TypeScript 原型，用来展示抖音信息流里的 AI 内容整理子功能。

这个 demo 表达的产品想法是：

> 知音不是第二个收藏夹，而是一张会生长、会提醒、会把兴趣轻轻推向行动的灵感卡。

## Routes

- `/`：纯 demo 入口。只显示可手动操作的手机信息流，不显示路演指标面板。
- `/intro`：产品介绍与路演入口。按一个典型目标用户“小林”的完整旅程组织，并用左侧步骤同步驱动右侧手机 demo。

## Current Demo Flow

1. 浏览一个抖音风格的竖向视频 feed。
2. Video 1 是普通浏览内容。
3. Video 2 出现知音入口。
4. 打开知音后，看到半屏 warm paper 灵感卡：`慢下来也能出片`。
5. 灵感卡提供三个打开方式：洱海边、雪山照、本地味。
6. 用户把父级灵感卡收进 `灵感袋`。
7. 继续浏览后，Video 3 和 Video 4 可以补进同一张灵感卡。
8. Video 5 是后续无关浏览时刻，用户仍可从 feed 打开灵感袋。
9. 灵感袋直接展示合并版父级卡、三个方向行、调节 chips 和轻行动 strip。
10. `/intro` 的演示控制区提供背景音开关，默认关闭，点击后以低音量循环播放本地伴奏素材。

## Product Intro Flow

`/intro` 用 16 个小步骤拆解完整路演：

1. 小林的人设：对云南旅行感兴趣，但还没放假、还没开始做攻略。
2. 已积累行为：点赞、收藏、评论、转发、常看等云南兴趣信号。
3. 临近暑假刷到 Video 1。
4. 收藏 Video 1。
5. 刷到 Video 2，知音入口出现。
6. 打开知音，生成专属灵感卡。
7. 查看灵感卡里的打开方式和来源线索。
8. 收进灵感袋。
9. 第二天刷到 Video 3。
10. 补进 Video 3。
11. 刷到 Video 4 并补进。
12. 刷到无关 Video 5，但灵感仍在。
13. 打开灵感袋。
14. 设置周末小行动提醒 mock 状态。
15. 展示未来迭代方向：暑假前的轻提醒。
16. 总结知音定位、适用范围、核心价值和当前 MVP 边界。

`/intro` 的同步演示使用状态快照，不调用真实 AI、真实提醒或外部服务。

## Run Locally

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Open:

```text
http://127.0.0.1:5173
http://127.0.0.1:5173/intro
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
