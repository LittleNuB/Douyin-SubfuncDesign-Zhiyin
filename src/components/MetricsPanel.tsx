import { Activity, BarChart3, MousePointerClick, Sparkles } from "lucide-react";

const metrics = [
  { label: "知音入口点击率", value: "18.6%", delta: "+6.2%" },
  { label: "5 秒理解率", value: "82%", delta: "+14%" },
  { label: "横滑进入率", value: "41%", delta: "+9%" },
  { label: "拨片使用率", value: "37%", delta: "+11%" },
  { label: "卡片保存率", value: "24%", delta: "+7%" },
  { label: "商业入口点击率", value: "9.8%", delta: "+3.1%" },
];

export function MetricsPanel() {
  return (
    <aside className="metrics-panel" aria-label="路演指标面板">
      <div className="metrics-kicker">
        <Sparkles size={16} />
        路演指标面板
      </div>
      <h1>知音 Web Demo</h1>
      <p>从“刷到”推进到“懂你、轻调、行动”的信息流子功能。</p>

      <div className="metric-hero">
        <div>
          <span>完整演示链路</span>
          <strong>52 秒</strong>
        </div>
        <Activity size={34} />
      </div>

      <div className="metric-grid">
        {metrics.map((metric) => (
          <div className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <em>{metric.delta}</em>
          </div>
        ))}
      </div>

      <div className="demo-script">
        <div>
          <MousePointerClick size={18} />
          演示路径
        </div>
        <ol>
          <li>刷到洱海日落视频</li>
          <li>打开知音半屏卡</li>
          <li>横滑查看 3 个组合</li>
          <li>点“少走路”并加一句想法</li>
          <li>自然出现咖啡馆承接</li>
        </ol>
      </div>

      <div className="metric-footer">
        <BarChart3 size={16} />
        Demo 数据为模拟指标，用于说明产品闭环。
      </div>
    </aside>
  );
}
