import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bookmark,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Compass,
  Heart,
  MessageCircle,
  PackagePlus,
  Play,
  Repeat2,
  Send,
  Sparkles,
  Star,
  UserRound,
  Video,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ZhiyinDemoExperience, type ZhiyinDemoPreset } from "./ZhiyinDemoExperience";

type VisualMode = "persona" | "signals" | "demo" | "future" | "summary";

type JourneyStep = {
  phase: string;
  time: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  action: string;
  visualMode: VisualMode;
  icon: LucideIcon;
  activeNodeIndex: number;
  completedNodeIndex: number;
  demoPreset?: ZhiyinDemoPreset;
};

const journeyNodes = [
  {
    title: "临近暑假：普通刷到云南内容",
    next: "承接：小林先收藏 Video 1，留下新的兴趣信号",
  },
  {
    title: "兴趣重合：知音入口自然出现",
    next: "承接：刷到 Video 2，打开知音看专属灵感卡",
  },
  {
    title: "被理解：碎片兴趣整理成灵感卡",
    next: "承接：查看打开方式和来源线索，确认知音懂她",
  },
  {
    title: "先收好：灵感卡进入灵感袋",
    next: "承接：收进灵感袋后继续刷视频，等待后续补全",
  },
  {
    title: "第二天：相关内容继续补进同一张卡",
    next: "承接：Video 3 / Video 4 分别补进同一张卡",
  },
  {
    title: "无关视频后：灵感仍然还在",
    next: "承接：Video 5 后重新打开灵感袋，并设置周末小行动提醒",
  },
];

const journeySteps: JourneyStep[] = [
  {
    phase: "01",
    time: "0-8s",
    eyebrow: "目标用户",
    title: "小林：想去云南，但还没真的开始计划",
    body: "她是大学生，经常刷到大理、洱海、雪山内容。因为还没放假，也缺少对云南旅行的了解，她只是把喜欢的内容先留在抖音里。",
    bullets: ["云南兴趣持续存在", "没有足够时间做计划", "需要从灵感开始，而不是从攻略开始"],
    action: "旅程节点：兴趣还没有变成计划，但已经开始在内容流里留下痕迹。",
    visualMode: "persona",
    icon: UserRound,
    activeNodeIndex: -1,
    completedNodeIndex: -1,
  },
  {
    phase: "02",
    time: "8-15s",
    eyebrow: "过往行为",
    title: "她已经留下很多云南线索",
    body: "点赞、收藏、评论、转发和长看已经表达了她的兴趣，但这些内容仍然散落在不同视频里，没有成为一个能继续生长的灵感。",
    bullets: ["收藏洱海日落和雪山机位", "点赞窗边咖啡、本地美食", "评论民族风穿搭，转发避坑内容"],
    action: "旅程节点：暑假临近，过去积累的云南兴趣重新被内容流唤起。",
    visualMode: "signals",
    icon: Heart,
    activeNodeIndex: -1,
    completedNodeIndex: -1,
  },
  {
    phase: "03",
    time: "15-20s",
    eyebrow: "Demo 开始",
    title: "临近暑假，她刷到一条云南视频",
    body: "右侧先停在 Video 1。这里还是普通抖音浏览，没有任何知音入口打扰。",
    bullets: ["Video 1：普通浏览", "知音入口暂不出现", "兴趣仍然只是内容流里的一个瞬间"],
    action: "旅程节点：小林只是正常刷到云南内容，产品还不急着介入。",
    visualMode: "demo",
    icon: Video,
    activeNodeIndex: 0,
    completedNodeIndex: -1,
    demoPreset: { activeVideoIndex: 0 },
  },
  {
    phase: "04",
    time: "20-24s",
    eyebrow: "收藏信号",
    title: "她点了收藏，留下新的兴趣信号",
    body: "同一条 Video 1 上，星标收藏点亮。这个动作说明云南兴趣从“看过”变成了“想留着”。",
    bullets: ["Video 1 保持不变", "右侧收藏星标点亮", "新的兴趣信号被积累"],
    action: "旅程节点：收藏完成后，这个节点才变成已发生。",
    visualMode: "demo",
    icon: Star,
    activeNodeIndex: 1,
    completedNodeIndex: 0,
    demoPreset: { activeVideoIndex: 0, favoritedIds: ["trigger-erhai"] },
  },
  {
    phase: "05",
    time: "24-30s",
    eyebrow: "兴趣重合",
    title: "下一条相关视频里，知音入口出现",
    body: "右侧切到 Video 2。因为内容和小林长期的云南兴趣重合，黑色知音入口自然出现在内容层里。",
    bullets: ["切到 Video 2", "知音入口出现", "入口仍属于抖音刷视频场景"],
    action: "旅程节点：不是每条视频都出现入口，只有兴趣重合时才出现。",
    visualMode: "demo",
    icon: Sparkles,
    activeNodeIndex: 1,
    completedNodeIndex: 0,
    demoPreset: { activeVideoIndex: 1, favoritedIds: ["trigger-erhai"] },
  },
  {
    phase: "06",
    time: "30-38s",
    eyebrow: "打开知音",
    title: "知音生成专属灵感卡",
    body: "右侧自动打开半屏卡，展示“我知道你喜欢的云南”和「慢下来也能出片」。它不是搜索结果，而是整理出的灵感卡。",
    bullets: ["打开 ZhiyinSheet", "展示懂你的云南兴趣", "生成「慢下来也能出片」"],
    action: "旅程节点：知音先证明理解她，再给出组织好的打开方式。",
    visualMode: "demo",
    icon: PackagePlus,
    activeNodeIndex: 2,
    completedNodeIndex: 1,
    demoPreset: { activeVideoIndex: 1, favoritedIds: ["trigger-erhai"], isSheetOpen: true, isInspirationSaved: false },
  },
  {
    phase: "07",
    time: "38-45s",
    eyebrow: "查看线索",
    title: "她查看不同打开方式和来源线索",
    body: "半屏卡保持打开，并切到雪山照中的来源线索，表达这张卡可以从不同方向继续展开。",
    bullets: ["切到另一个打开方式", "来源线索切换图片", "确认灵感来自过去的行为"],
    action: "旅程节点：她不是在看攻略，而是在确认知音有没有真的懂她。",
    visualMode: "demo",
    icon: Compass,
    activeNodeIndex: 2,
    completedNodeIndex: 1,
    demoPreset: {
      activeVideoIndex: 1,
      favoritedIds: ["trigger-erhai"],
      isSheetOpen: true,
      isInspirationSaved: false,
      zhiyinOpeningIndex: 1,
      zhiyinClueIndex: 1,
    },
  },
  {
    phase: "08",
    time: "45-52s",
    eyebrow: "收进灵感袋",
    title: "她把灵感卡收进灵感袋",
    body: "半屏卡仍停留在当前视频上，但状态变成“已收进灵感袋”。之后相关内容会继续补进同一张卡。",
    bullets: ["点击收进灵感袋后的状态", "显示继续刷视频 / 查看灵感袋", "灵感卡成为可持续补全的对象"],
    action: "旅程节点：保存完成后，灵感卡进入灵感袋，等待后续内容补全。",
    visualMode: "demo",
    icon: CheckCircle2,
    activeNodeIndex: 4,
    completedNodeIndex: 3,
    demoPreset: {
      activeVideoIndex: 1,
      favoritedIds: ["trigger-erhai"],
      isSheetOpen: true,
      isInspirationSaved: true,
      zhiyinOpeningIndex: 1,
      zhiyinClueIndex: 1,
    },
  },
  {
    phase: "09",
    time: "52-58s",
    eyebrow: "第二天",
    title: "第二天，她刷到 Video 3",
    body: "右侧切到 Video 3。因为灵感卡已经保存，相关视频下方出现“补进灵感”的轻提示。",
    bullets: ["切到 Video 3", "已保存状态生效", "出现“+ 加入”提示"],
    action: "旅程节点：相关内容再次出现时，不新建收藏，而是补进同一张卡。",
    visualMode: "demo",
    icon: Repeat2,
    activeNodeIndex: 4,
    completedNodeIndex: 3,
    demoPreset: {
      activeVideoIndex: 2,
      favoritedIds: ["trigger-erhai"],
      isInspirationSaved: true,
      addedFeedIds: [],
    },
  },
  {
    phase: "10",
    time: "58-64s",
    eyebrow: "补进 Video 3",
    title: "Video 3 被补进同一张灵感卡",
    body: "右侧出现轻量 toast，说明这条内容已经补进「慢下来也能出片」。",
    bullets: ["显示补进成功 toast", "新补进 +1", "仍然是同一张灵感卡"],
    action: "旅程节点：第一次补进完成后，第二天的积累开始发生。",
    visualMode: "demo",
    icon: CheckCircle2,
    activeNodeIndex: 4,
    completedNodeIndex: 3,
    demoPreset: {
      activeVideoIndex: 2,
      favoritedIds: ["trigger-erhai"],
      isInspirationSaved: true,
      addedFeedIds: ["followup-dali-cafe"],
      lastAddedFeedId: "followup-dali-cafe",
      overlay: "addSuccess",
    },
  },
  {
    phase: "11",
    time: "64-70s",
    eyebrow: "继续补全",
    title: "Video 4 也补进同一张卡",
    body: "右侧切到 Video 4，并显示新的补进成功 toast。灵感卡不是一次性结果，而是在内容流里继续生长。",
    bullets: ["切到 Video 4", "再次显示补进成功", "新补进累计到 +2"],
    action: "旅程节点：Video 3 / Video 4 都进入同一张卡，相关内容被持续归并。",
    visualMode: "demo",
    icon: Repeat2,
    activeNodeIndex: 5,
    completedNodeIndex: 4,
    demoPreset: {
      activeVideoIndex: 3,
      favoritedIds: ["trigger-erhai"],
      isInspirationSaved: true,
      addedFeedIds: ["followup-dali-cafe", "feed-erhai-cycling"],
      lastAddedFeedId: "feed-erhai-cycling",
      overlay: "addSuccess",
    },
  },
  {
    phase: "12",
    time: "70-76s",
    eyebrow: "无关视频",
    title: "刷到无关 Video 5，灵感仍然还在",
    body: "右侧切到 Video 5。内容已经无关，但灵感袋入口仍然在 feed 里，说明之前的灵感没有随着视频流切走。",
    bullets: ["切到 Video 5", "视频内容无关", "灵感袋入口仍可被找回"],
    action: "旅程节点：feed 变了，灵感没有丢。",
    visualMode: "demo",
    icon: Video,
    activeNodeIndex: 5,
    completedNodeIndex: 4,
    demoPreset: {
      activeVideoIndex: 4,
      favoritedIds: ["trigger-erhai"],
      isInspirationSaved: true,
      addedFeedIds: ["followup-dali-cafe", "feed-erhai-cycling"],
    },
  },
  {
    phase: "13",
    time: "76-82s",
    eyebrow: "打开灵感袋",
    title: "她重新打开灵感袋",
    body: "右侧打开合并版灵感袋，展示 `新补进 +2`、三个方向行、chips 和小行动区。",
    bullets: ["打开灵感袋", "展示新补进 +2", "三个方向仍在同一张灵感卡里"],
    action: "旅程节点：无关视频后，灵感仍能被重新找回。",
    visualMode: "demo",
    icon: Bookmark,
    activeNodeIndex: 5,
    completedNodeIndex: 4,
    demoPreset: {
      activeVideoIndex: 4,
      favoritedIds: ["trigger-erhai"],
      isInspirationSaved: true,
      addedFeedIds: ["followup-dali-cafe", "feed-erhai-cycling"],
      overlay: "inspirationBag",
    },
  },
  {
    phase: "14",
    time: "82-88s",
    eyebrow: "轻行动",
    title: "她设置了一个周末小行动提醒",
    body: "灵感袋内的小行动状态变成 mock “已记下”。知音没有把她推到完整攻略，只把灵感轻轻推近一次行动。",
    bullets: ["灵感袋保持打开", "提醒状态为“已记下”", "从灵感走向低压力动作"],
    action: "旅程节点：小行动完成后，这条旅程闭环才真正完整。",
    visualMode: "demo",
    icon: Bell,
    activeNodeIndex: 5,
    completedNodeIndex: 5,
    demoPreset: {
      activeVideoIndex: 4,
      favoritedIds: ["trigger-erhai"],
      isInspirationSaved: true,
      addedFeedIds: ["followup-dali-cafe", "feed-erhai-cycling"],
      overlay: "inspirationBag",
      initialReminderSet: true,
    },
  },
  {
    phase: "15",
    time: "88-98s",
    eyebrow: "未来迭代",
    title: "知音会在合适的时间，把灵感重新递回来",
    body: "当云南兴趣持续升温、暑假窗口临近、灵感卡已经足够完整时，知音可以用低打扰方式提醒小林。",
    bullets: ["检测云南相关内容频率升高", "识别暑假时间窗口更合适", "用轻提醒连接灵感和行动"],
    action: "旅程节点：未来的知音不是催促出发，而是在合适时刻递回已经成熟的灵感。",
    visualMode: "future",
    icon: CalendarDays,
    activeNodeIndex: -1,
    completedNodeIndex: 5,
  },
  {
    phase: "16",
    time: "98-105s",
    eyebrow: "产品总结",
    title: "知音是抖音刷视频场景里的 AI 内容整理层",
    body: "它不是独立旅行 App，不是攻略、地图、chatbot 或商业转化页。它把用户已经表达过的兴趣，整理成一张会生长、可回到行动的灵感卡。",
    bullets: ["懂你：理解收藏、点赞、观看、分享", "整理：把碎片变成灵感卡", "补全：后续内容继续进入同一张卡", "轻行动：从灵感走向低压力动作"],
    action: "旅程节点：知音始终留在抖音内容流里，负责把兴趣整理、补全，并轻轻推向行动。",
    visualMode: "summary",
    icon: Sparkles,
    activeNodeIndex: -1,
    completedNodeIndex: 5,
  },
];

const behaviorCards: Array<{ label: string; title: string; copy: string; icon: LucideIcon }> = [
  { label: "收藏", title: "洱海日落", copy: "想留到以后慢慢看", icon: Bookmark },
  { label: "点赞", title: "窗边咖啡", copy: "喜欢不赶路的节奏", icon: Heart },
  { label: "评论", title: "民族风穿搭", copy: "问过适合什么颜色", icon: MessageCircle },
  { label: "转发", title: "本地美食", copy: "发给同学说想试试", icon: Send },
  { label: "长看", title: "云南避坑", copy: "还缺少旅行经验", icon: Clock3 },
];

const summaryCards = [
  { title: "懂你", copy: "从收藏、点赞、观看、分享里理解兴趣。", icon: Heart },
  { title: "整理", copy: "把碎片内容变成一张会生长的灵感卡。", icon: PackagePlus },
  { title: "补全", copy: "后续刷到相关内容，继续补进同一张卡。", icon: Repeat2 },
  { title: "轻行动", copy: "不急着做攻略，只把灵感推进到一次小动作。", icon: CheckCircle2 },
];

export function ProductIntroSite() {
  const [activeJourneyStepIndex, setActiveJourneyStepIndex] = useState(0);
  const activeStep = journeySteps[activeJourneyStepIndex];
  const showDemo = activeStep.visualMode === "demo";
  const StepIcon = activeStep.icon;

  const progressLabel = useMemo(
    () => `步骤 ${activeJourneyStepIndex + 1} / ${journeySteps.length}`,
    [activeJourneyStepIndex],
  );

  const goToStep = (index: number) => {
    setActiveJourneyStepIndex(Math.max(0, Math.min(journeySteps.length - 1, index)));
  };

  return (
    <main className={`intro-site ${showDemo ? "intro-site--demo" : ""}`}>
      <header className="intro-topbar">
        <a className="intro-brand" href="/" aria-label="打开纯 demo">
          <span>知音</span>
          Web Demo
        </a>
        <div className="intro-topbar__meta">
          <span>{activeStep.time}</span>
          <strong>{progressLabel}</strong>
        </div>
      </header>

      <section className="intro-stage" aria-label="知音产品介绍">
        <aside className="intro-story-panel">
          <div className="intro-scene-kicker">
            <span>{activeStep.phase}</span>
            {activeStep.eyebrow}
          </div>

          <div className="intro-scene-title">
            <StepIcon size={26} />
            <h1>{activeStep.title}</h1>
          </div>

          <p className="intro-scene-body">{activeStep.body}</p>

          <div className="intro-bullet-list">
            {activeStep.bullets.map((bullet) => (
              <div key={bullet}>
                <CheckCircle2 size={15} />
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          <div className="intro-action-note">
            <Play size={16} />
            <span>{activeStep.action}</span>
          </div>

          {showDemo && (
            <div className="intro-demo-script" aria-label="用户旅程节点">
              <strong>80-90 秒用户旅程</strong>
              {journeyNodes.map((step, index) => {
                const stepStateClass =
                  index === activeStep.activeNodeIndex
                    ? "intro-demo-script__step intro-demo-script__step--current"
                    : index <= activeStep.completedNodeIndex
                      ? "intro-demo-script__step intro-demo-script__step--complete"
                      : "intro-demo-script__step";
                return (
                  <span className={stepStateClass} key={step.title}>
                    <b>{step.title}</b>
                    <small>{step.next}</small>
                  </span>
                );
              })}
            </div>
          )}

        </aside>

        <div className="intro-visual-panel">
          {showDemo ? (
            <div className="intro-phone-wrap">
              <div className="intro-phone-caption">
                <span>小林的内容流场景</span>
                下一步每次只推进右侧一个演示动作
              </div>
              <ZhiyinDemoExperience demoPreset={activeStep.demoPreset} />
            </div>
          ) : (
            <IntroStoryVisual visualMode={activeStep.visualMode} />
          )}
        </div>
      </section>

      <nav className="intro-controls" aria-label="介绍页导航">
        <button type="button" onClick={() => goToStep(activeJourneyStepIndex - 1)} disabled={activeJourneyStepIndex === 0}>
          <ArrowLeft size={16} />
          上一步
        </button>
        <button type="button" onClick={() => goToStep(activeJourneyStepIndex + 1)} disabled={activeJourneyStepIndex === journeySteps.length - 1}>
          下一步
          <ArrowRight size={16} />
        </button>
      </nav>
    </main>
  );
}

function IntroStoryVisual({ visualMode }: { visualMode: VisualMode }) {
  if (visualMode === "persona") {
    return (
      <div className="intro-persona-card">
        <div className="intro-persona-card__avatar">
          <UserRound size={42} />
        </div>
        <div>
          <span>大学生 · 暑假前</span>
          <strong>小林</strong>
          <p>想去云南，但还停留在“我好像会喜欢”的阶段。</p>
        </div>
        <div className="intro-persona-tags">
          <em>大理</em>
          <em>洱海</em>
          <em>雪山机位</em>
          <em>民族风穿搭</em>
          <em>本地味道</em>
        </div>
      </div>
    );
  }

  if (visualMode === "signals") {
    return (
      <div className="intro-signal-board">
        <div className="intro-board-heading">
          <Sparkles size={18} />
          已积累的行为信号
        </div>
        {behaviorCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="intro-signal-card" key={card.label}>
              <Icon size={18} />
              <span>{card.label}</span>
              <strong>{card.title}</strong>
              <p>{card.copy}</p>
            </article>
          );
        })}
      </div>
    );
  }

  if (visualMode === "future") {
    return (
      <div className="intro-future-board">
        <div className="intro-future-timeline">
          {[
            ["现在", "整理出「慢下来也能出片」"],
            ["第二天", "大理咖啡馆和转场内容继续补进"],
            ["暑假前", "兴趣升温，时间窗口也变得合适"],
          ].map(([time, copy]) => (
            <div className="intro-future-line" key={time}>
              <span>{time}</span>
              <p>{copy}</p>
            </div>
          ))}
        </div>
        <div className="intro-reminder-card">
          <div className="intro-reminder-card__mark">
            <Bell size={20} />
            知音轻提醒
          </div>
          <h2>你的云南灵感，快攒成一次出发了</h2>
          <p>最近你又补进了洱海日落、窗边咖啡和雪山机位。暑假快到了，要不要先把「慢下来也能出片」变成一个周末小计划？</p>
          <div>
            <button type="button">先看灵感卡</button>
            <button type="button">先记到暑假前</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="intro-summary-board">
      <div className="intro-summary-definition">
        <Compass size={26} />
        <span>产品定位</span>
        <h2>抖音刷视频场景里的 AI 内容整理层</h2>
        <p>不是独立旅行 App；不做地图、完整攻略、chatbot 或商业转化。</p>
      </div>
      <div className="intro-summary-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="intro-summary-card" key={card.title}>
              <Icon size={18} />
              <strong>{card.title}</strong>
              <p>{card.copy}</p>
            </article>
          );
        })}
      </div>
      <a className="intro-open-demo" href="/">
        打开纯 demo 入口
        <ArrowRight size={16} />
      </a>
    </div>
  );
}
