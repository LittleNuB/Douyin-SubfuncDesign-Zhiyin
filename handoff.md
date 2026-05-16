# 知音 Web Demo 接手交接文档

更新时间：2026-05-16

## 1. 项目背景

本项目是抖音 AI 创变者黑客松 Demo，产品暂命名为“知音”。

知音定位为抖音信息流里的 AI 子功能，不是独立 App、攻略页或聊天机器人。当前主场景是用户在抖音信息流里刷到云南 / 大理 / 洱海相关内容后，系统基于用户收藏、点赞、停留、转发等兴趣信号，把过往碎片内容组织成几个轻量的“出发打开方式”。

当前唯一完整演示场景：

- 云南
- 大理
- 洱海
- 咖啡馆 / 雪山 / 美食延展

## 2. 当前确认方向

以下是最新确认的产品和 UI 决策，后续 Agent 应优先遵守：

- 保留当前代码里的浅色纸张/票据感知音半屏卡，不再要求改回深色玻璃半屏卡。
- 主流程中，点击 3 个方向卡后，直接进入对应的洱海 / 雪山 / 美食延展半屏页。
- 结果卡折叠图不再是必需展示项，按照当前代码执行；相关 CSS 可暂留为历史样式，不作为 P0。
- 当前图片素材仍是阶段素材，后续需要替换为视频素材。
- 知音仍必须保持抖音信息流子功能感，不能做成独立工具、攻略页或聊天机器人。

## 3. 当前文件结构

产品与方案文档：

- `handoff.md`
- `zhiyin-product-brief.md`
- `zhiyin-web-demo-technical-plan.md`
- `zhiyin-ui-reference.md`

工程文件：

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `index.html`
- `src/App.tsx`
- `src/styles.css`
- `src/types.ts`
- `src/data/mockData.ts`
- `src/lib/orchestration.ts`
- `src/components/*`
- `public/assets/*`

## 4. 运行方式

技术栈：

- Vite
- React
- TypeScript
- 普通 CSS
- lucide-react
- 本地 mock 数据

安装依赖：

```bash
npm install
```

启动开发服务：

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

访问地址：

```text
http://127.0.0.1:5173
```

构建检查：

```bash
npm run build
```

## 5. 当前真实状态

### 5.1 抖音式信息流

已实现：

- 手机竖屏模拟器。
- 状态栏、顶部频道栏、左侧菜单、搜索图标。
- 频道：上海 / 关注 / 热点 / 团购 / 商城 / 推荐。
- 右侧互动栏：头像、关注、点赞、评论、收藏、转发、音乐盘。
- 底部作者、日期、视频正文、地点、音乐标签、评论输入栏。
- 知音入口胶囊。
- 背景媒体通过 `MediaView` 渲染，当前使用阶段图片素材。

后续：

- 替换为真实视频素材时，更新 `src/data/mockData.ts` 中的 `media` 字段即可。

### 5.2 知音半屏卡

已实现：

- 当前采用浅色纸张/票据感视觉：`.zhiyin-paper-card`。
- 标题与品牌行：知音 / 来自你的收藏 + AI补全。
- 被理解文案：咖啡馆、雪山机位、民族风穿搭、地道美食等。
- 3 个方向卡：
  - 去洱海边慢下来
  - 拍一组雪山人生照
  - 把晚上留给本地味道
- 点击方向卡会直接进入对应延展半屏页。
- 轻量拨片与“一句想法”输入仍保留。

注意：

- 不要把这里改成独立 App 首页。
- 不要加重搜索、攻略、聊天机器人感。
- 当前浅色半屏卡已经被确认保留。

### 5.3 方向卡与延展半屏页

已实现：

- `ExploreTopic = "erhai" | "snow" | "food"`。
- 洱海页：咖啡、骑行、住宿、街角内容。
- 雪山页：机位、穿搭、同款角度。
- 美食页：菌子火锅、夜市、本地味道。
- 横向卡片使用 `scroll-snap`，主卡居中，两侧露出。
- 背景仍保留上一层信息流画面。

当前主流程：

1. 刷到洱海日落信息流内容。
2. 点击知音入口。
3. 打开知音半屏卡。
4. 点击 3 个方向卡之一。
5. 直接进入对应延展半屏页。

### 5.4 结果卡折叠图

历史状态：

- CSS 中仍保留 `.result-card`、`.stacked-media` 等样式。
- 当前 `InspirationCarousel` 不再渲染结果卡列表。

最新决策：

- 结果卡折叠图不再必须，后续按当前代码继续。

### 5.5 指标面板

桌面端右侧有路演指标面板，手机内不展示。

指标包括：

- 完整演示链路时间
- 知音入口点击率
- 5 秒理解率
- 横滑进入率
- 拨片使用率
- 卡片保存率
- 商业入口点击率

## 6. 关键代码说明

### `src/types.ts`

当前内容模型已迁移到 `media`：

```ts
export type MediaAsset = {
  type: "image" | "video";
  src: string;
  poster?: string;
};
```

`ContentItem` 使用：

```ts
media: MediaAsset;
```

不要再按旧文档使用 `coverUrl`。

### `src/components/MediaView.tsx`

统一渲染图片和视频。

- `media.type === "image"` 时渲染 `<img>`。
- `media.type === "video"` 时渲染 `<video muted autoPlay loop playsInline>`。

后续替换视频素材时优先复用该组件。

### `src/App.tsx`

主状态：

- `screen`: `feed | erhai | snow | food`
- `isSheetOpen`
- `activeIndex`
- `selectedChips`
- `textConstraint`
- `isInputOpen`

负责在信息流、知音半屏卡、延展半屏页之间切换。

### `src/components/InspirationCarousel.tsx`

当前核心交互：

- 展示 3 个方向卡。
- 点击方向卡时调用 `onSelectBundle(index)` 和 `onOpenExplore(topic)`。
- 展示 insight、evidence、拨片、一句想法。
- 不再渲染结果卡折叠图。

### `src/components/CafeExploreSheet.tsx`

当前实际是三个主题延展页，不只是咖啡馆页。

- `erhai`
- `snow`
- `food`

文件名暂未重命名，避免无必要改动。

### `src/data/mockData.ts`

mock 数据包含：

- `triggerContent`
- `contentItems`
- `userSignal`
- `defaultChips`
- `baseBundles`

当前素材引用都在 `media.src`。

### `src/lib/orchestration.ts`

AI 编排模拟函数：

- `generateBundles`
- `applyTuning`

当前使用规则函数模拟，不接真实 AI。

### `src/styles.css`

主要样式集中在这里。当前重点 class：

- `.phone-frame`
- `.feed-screen`
- `.zhiyin-entry`
- `.zhiyin-sheet`
- `.zhiyin-paper-card`
- `.direction-card`
- `.chip-row`
- `.idea-input`
- `.cafe-sheet`
- `.cafe-card-strip`
- `.metrics-panel`

## 7. 素材状态

当前 `public/assets/` 下为阶段图片素材：

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

当前没有真实视频素材。

后续替换视频建议：

```ts
media: {
  type: "video",
  src: "/assets/example.mp4",
  poster: "/assets/example-poster.webp"
}
```

## 8. Git 状态说明

最新接手同步后，项目已做基线提交。后续 Agent 应先查看：

```bash
git status --short --branch
git log --oneline -5
```

不要删除已有文档或代码。若遇到用户或其它 Agent 的未提交改动，必须保留并协同处理。

## 9. 质量检查

每次改动后至少运行：

```bash
npm run build
```

当前同步时构建状态：通过。

## 10. 后续建议

优先级建议：

1. 准备并接入真实视频素材，保持 `MediaView` 数据结构。
2. 用真实素材重新检查文字可读性、遮罩、亮度和焦点。
3. 如果要增强延展页，可继续沿当前半屏页逻辑扩展，而不是做完整攻略页。
4. 如果结果卡折叠图长期不用，可在后续清理 CSS，但不建议在路演前做无收益重构。
