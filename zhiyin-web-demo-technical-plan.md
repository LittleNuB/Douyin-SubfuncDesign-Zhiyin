# 知音 Web Demo 技术方案

更新时间：2026-05-16

## 1. 项目目标

本 Demo 用于抖音 AI 创变者黑客松路演，目标是展示“知音”作为抖音信息流子功能的核心体验。

知音不是独立 AI 助手、旅行攻略工具或聊天机器人，而是嵌入抖音视频信息流中的 AI 内容组织层。当用户刷到云南 / 大理 / 洱海相关内容时，系统基于用户收藏、点赞、停留、转发等兴趣信号，生成几个轻量的“出发打开方式”，并允许用户通过方向卡、拨片和一句短约束轻量参与调整。

最新实现以当前代码为准：

- 保留浅色纸张/票据感半屏卡。
- 点击 3 个方向卡后直接进入洱海 / 雪山 / 美食延展半屏页。
- 结果卡折叠图不再是 P0 必需功能。
- 当前素材是阶段图片，后续替换为视频。

## 2. 技术选型

- 前端框架：Vite + React + TypeScript
- 样式：普通 CSS
- 图标：lucide-react
- 数据：本地 mock 数据
- AI 能力：Demo 阶段使用规则函数模拟
- 部署：本地运行或静态部署

项目不依赖真实推荐系统、真实抖音数据或后端服务，路演稳定性优先。

## 3. 运行与构建

安装依赖：

```bash
npm install
```

开发服务：

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

构建：

```bash
npm run build
```

当前同步时 `npm run build` 已通过。

## 4. 页面与组件结构

### `PhoneFrame`

手机容器，包含竖屏比例、圆角、底部 home indicator。

### `DouyinFeedScreen`

抖音式信息流页面：

- 背景媒体
- 状态栏
- 顶部频道栏
- 右侧互动栏
- 底部作者、正文、地点、音乐信息
- 评论输入栏
- 知音入口

背景媒体通过 `MediaView` 渲染。

### `ZhiyinEntry`

嵌入视频底部信息区的知音入口。

当前文案：

- 你收藏的云南，有 3 种打开方式
- 知音已整理好
- 打开看看

### `ZhiyinSheet`

知音半屏卡容器。

当前视觉为浅色纸张/票据感卡片，不再要求深色玻璃风格。它展示：

- 知音品牌行
- 被理解文案
- 3 个方向卡
- insight / evidence
- 轻量拨片
- 一句想法输入

### `InspirationCarousel`

知音核心交互。

当前行为：

- 展示 3 个方向卡。
- 点击方向卡时切换 active bundle，并直接打开对应延展页。
- 展示当前组合的 insight 和 evidence。
- 支持拨片选择。
- 支持“一句想法”短约束输入。

注意：

- 当前不再渲染结果卡折叠图。
- 结果卡相关 CSS 可暂留，但不是主流程。

### `CafeExploreSheet`

虽然文件名仍是 Cafe，但当前组件承载三个延展主题：

```ts
export type ExploreTopic = "erhai" | "snow" | "food";
```

对应页面：

- `erhai`：洱海、咖啡、骑行、住宿。
- `snow`：雪山机位、穿搭、同款角度。
- `food`：菌子火锅、夜市、本地味道。

### `MetricsPanel`

桌面端路演指标面板，不进入手机界面内部。

## 5. 数据模型

当前数据模型以 `media` 为准，不再使用旧的 `coverUrl`。

```ts
export type MediaAsset = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

export type ContentItem = {
  id: string;
  title: string;
  category: ContentCategory;
  source: ContentSource;
  media: MediaAsset;
  creator?: string;
};
```

后续替换视频素材时示例：

```ts
media: {
  type: "video",
  src: "/assets/erhai-sunset.mp4",
  poster: "/assets/erhai-sunset-poster.webp"
}
```

`MediaView` 已支持图片和视频，无需在业务组件里分别写 `<img>` / `<video>`。

## 6. AI 编排接口

Demo 阶段使用 mock + 规则函数模拟。

```ts
function generateBundles(
  userSignal: UserSignal,
  triggerContent: ContentItem
): InspirationBundle[];

function applyTuning(
  bundle: InspirationBundle,
  selectedChips: TuningChip[],
  textConstraint?: string
): InspirationBundle;
```

### `generateBundles`

当前直接返回 `baseBundles`。

### `applyTuning`

根据用户拨片和一句想法轻量调整：

- insight 文案
- cards 标题或副标题

当前它不接真实大模型。

## 7. 主流程

1. 用户进入抖音式视频信息流。
2. 当前内容是洱海 / 大理日落。
3. 底部出现知音入口。
4. 用户点击“打开看看”。
5. 知音半屏卡展开。
6. 用户看到 3 个方向卡：
   - 去洱海边慢下来
   - 拍一组雪山人生照
   - 把晚上留给本地味道
7. 用户点击某个方向卡。
8. 直接进入对应延展半屏页。
9. 可返回知音首页或回到信息流。

## 8. 商业承接设计

商业承接要自然，不能在首屏硬卖。

当前代码里的延展页承担轻量商业/行动承接的雏形：

- 洱海：咖啡、骑行、住宿
- 雪山：机位、穿搭、同款角度
- 美食：餐厅、夜市、本地小吃

后续如果加入真实商业入口，应跟随用户选择的方向出现，而不是做成电商导购页。

## 9. 素材方案

当前 `public/assets/` 使用阶段 `.webp` 图片。

后续视频替换原则：

- 视频放入 `public/assets/`。
- 优先更新 `src/data/mockData.ts` 的 `media` 字段。
- 继续复用 `MediaView`。
- 替换后需要重新检查遮罩、亮度、文字可读性和卡片焦点。

## 10. 测试方案

### UI 检查

- 手机竖屏布局不溢出。
- 信息流仍像抖音内功能，而不是独立 App。
- 知音半屏卡保留当前浅色纸张/票据风格。
- 方向卡点击后进入正确延展页。
- 延展页横滑主卡居中，两侧露出。

### 交互检查

- 点击知音入口后半屏卡正常展开。
- 关闭后回到视频信息流。
- 点击 3 个方向卡分别进入 `erhai` / `snow` / `food`。
- 拨片能更新当前 insight。
- “加一句想法”可展开输入。

### 构建检查

```bash
npm run build
```

## 11. 实施优先级

### P0

- 抖音式信息流主界面。
- 知音入口。
- 当前浅色知音半屏卡。
- 3 个方向卡。
- 方向卡直达延展半屏页。
- 拨片和一句想法。
- 构建稳定通过。

### P1

- 替换真实视频素材。
- 根据视频重新调遮罩和文字可读性。
- 增强延展页行动入口。
- 增加更自然的转场反馈。

### P2

- 多条视频信息流。
- 多场景扩展。
- 接入真实大模型文案生成。
- 清理不再使用的历史样式。

## 12. 关键约束

- 不做独立 App。
- 不做完整攻略页。
- 不做聊天机器人。
- 不让用户主动搜索太多。
- 系统先理解用户，再让用户轻量校准。
- 当前半屏卡颜色和直达延展页流程按既有代码保留。
