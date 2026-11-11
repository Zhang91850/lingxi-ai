
import { useState } from "react";

const models = [
  { name: "DeepSeek", type: "国产大模型", desc: "面向复杂推理、代码生成与智能问答", icon: "D", color: "#56a6ff", bg: "#152b49" },
  { name: "豆包", type: "国产大模型", desc: "日常对话、内容创作与多场景智能助手", icon: "豆", color: "#70d5ff", bg: "#12354a" },
  { name: "通义千问", type: "国产大模型", desc: "文本理解、知识问答与代码开发", icon: "Q", color: "#a88aff", bg: "#2a2050" },
  { name: "GPT", type: "国际大模型", desc: "通用智能、复杂任务与开发辅助", icon: "G", color: "#77d8ae", bg: "#153c32" },
  { name: "Claude", type: "国际大模型", desc: "长文本理解、分析与高质量内容生成", icon: "C", color: "#ffad78", bg: "#46291e" },
  { name: "Gemini", type: "国际大模型", desc: "多模态理解与综合智能任务", icon: "✦", color: "#8bbcff", bg: "#1d2d4b" },
];

const features = [
  { icon: "⌘", title: "统一 API 接口", desc: "通过统一的接入方式调用不同 AI 模型，减少重复开发和接口适配工作。" },
  { icon: "◈", title: "多模型灵活选择", desc: "按任务需要选择国产或国际模型，让不同模型各展所长。" },
  { icon: "▤", title: "用量清晰可查", desc: "规划提供调用记录、Token 用量和费用明细，帮助开发者管理使用成本。" },
  { icon: "◇", title: "密钥与权限管理", desc: "规划提供独立 API Key、模型访问权限和账户管理能力。" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        html, body, #root { min-height: 100%; margin: 0; width: 100%; }
        body {
          display: block;
          min-width: 320px;
          background: #080b14;
          color: #f4f6ff;
          font-family: Inter, "PingFang SC", "Microsoft YaHei", sans-serif;
        }
        a { color: inherit; text-decoration: none; }
        button { font: inherit; }
        .lx-app { min-height: 100vh; overflow: hidden; background: #080b14; }
        .lx-header {
          height: 76px; padding: 0 7%; display: flex; align-items: center;
          justify-content: space-between; border-bottom: 1px solid #ffffff12;
          background: #090d18eF; position: sticky; top: 0; z-index: 10;
          backdrop-filter: blur(18px);
        }
        .lx-brand { display: flex; align-items: center; gap: 11px; font-size: 21px; font-weight: 750; letter-spacing: .5px; }
        .lx-brand-mark {
          width: 39px; height: 39px; display: grid; place-items: center;
          border-radius: 12px; color: white; font-size: 21px; font-weight: 800;
          background: linear-gradient(135deg, #4c8dff, #8959ed);
          box-shadow: 0 5px 25px #695aff55;
        }
        .lx-brand small { display: block; color: #8993ad; font-size: 10px; font-weight: 500; letter-spacing: 2px; margin-top: 2px; }
        .lx-nav { display: flex; align-items: center; gap: 35px; color: #aab2c7; font-size: 14px; }
        .lx-nav a:hover, .lx-text-link:hover { color: #fff; }
        .lx-actions { display: flex; align-items: center; gap: 17px; font-size: 14px; }
        .lx-text-link { color: #c4cbe0; }
        .lx-button {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 12px 21px; border-radius: 10px; font-weight: 650;
          background: linear-gradient(110deg, #477eff, #7957ec);
          color: white; border: 1px solid #ffffff20;
          box-shadow: 0 8px 28px #4b65ff35; transition: .2s;
        }
        .lx-button:hover { transform: translateY(-2px); filter: brightness(1.12); }
        .lx-button.secondary { background: #ffffff09; border: 1px solid #ffffff24; box-shadow: none; color: #e3e8fa; }
        .lx-menu { display: none; color: white; background: none; border: 0; font-size: 25px; cursor: pointer; }
        .lx-hero {
          position: relative; padding: 112px 7% 90px; display: grid;
          grid-template-columns: 1.08fr .92fr; gap: 55px; align-items: center;
          max-width: 1500px; margin: auto;
        }
        .lx-hero:before {
          content: ""; position: absolute; width: 600px; height: 500px;
          right: 3%; top: 0; pointer-events: none;
          background: radial-gradient(ellipse, #5142ba30, transparent 68%);
        }
        .lx-eyebrow {
          display: inline-flex; align-items: center; gap: 9px; padding: 8px 13px;
          border: 1px solid #738cff38; border-radius: 30px;
          color: #b9c5ff; background: #5969dc12; font-size: 12px;
        }
        .lx-dot { width: 7px; height: 7px; border-radius: 50%; background: #70d9ae; box-shadow: 0 0 12px #70d9ae; }
        .lx-hero h1 { font-size: clamp(39px, 5vw, 65px); line-height: 1.2; letter-spacing: -2px; margin: 26px 0 22px; font-weight: 800; }
        .lx-gradient-text { background: linear-gradient(100deg, #82b5ff, #a98bff 55%, #d5a6ff); color: transparent; background-clip: text; }
        .lx-hero-copy { max-width: 650px; color: #a9b2c8; font-size: 16px; line-height: 1.95; }
        .lx-hero-buttons { display: flex; gap: 14px; margin-top: 32px; flex-wrap: wrap; }
        .lx-hero-note { margin-top: 24px; color: #77829c; font-size: 12px; }
        .lx-visual {
          position: relative; min-height: 420px; border: 1px solid #ffffff19;
          border-radius: 24px; padding: 25px; overflow: hidden;
          background: linear-gradient(145deg, #151d35, #101522 65%, #17152b);
          box-shadow: 0 30px 100px #0008, inset 0 1px #ffffff12;
        }
        .lx-visual:before {
          content: ""; position: absolute; width: 350px; height: 350px;
          right: -100px; top: -140px; border-radius: 50%;
          background: #6d5bff30; filter: blur(45px);
        }
        .lx-visual-top { display: flex; justify-content: space-between; align-items: center; color: #aab4ce; font-size: 12px; position: relative; }
        .lx-live { color: #75d7ad; font-size: 11px; }
        .lx-code-card {
          position: relative; margin-top: 30px; padding: 21px;
          border: 1px solid #ffffff18; border-radius: 14px; background: #080d18c9;
        }
        .lx-code-head { display: flex; gap: 6px; margin-bottom: 22px; }
        .lx-code-head i { width: 8px; height: 8px; border-radius: 50%; background: #58647c; }
        .lx-code-line { font: 12px/2.1 ui-monospace, monospace; color: #9faecb; overflow-wrap: anywhere; }
        .lx-code-line b { color: #9f91ff; font-weight: 500; }
        .lx-code-line em { color: #83d7b3; font-style: normal; }
        .lx-model-pills { display: flex; gap: 9px; flex-wrap: wrap; margin-top: 24px; position: relative; }
        .lx-model-pills span { padding: 8px 12px; border-radius: 8px; background: #ffffff0b; border: 1px solid #ffffff13; color: #cbd4eb; font-size: 11px; }
        .lx-section { max-width: 1300px; padding: 78px 7%; margin: auto; }
        .lx-section-head { text-align: center; margin-bottom: 38px; }
        .lx-kicker { color: #9a8bff; font-size: 12px; letter-spacing: 2px; font-weight: 700; }
        .lx-section h2 { font-size: clamp(27px, 3vw, 39px); margin: 13px 0; letter-spacing: -1px; }
        .lx-section-head p { color: #8994ac; font-size: 14px; line-height: 1.8; }
        .lx-model-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .lx-model-card {
          border: 1px solid #ffffff14; background: linear-gradient(145deg, #141b2b, #101522);
          border-radius: 16px; padding: 22px; transition: .2s;
        }
        .lx-model-card:hover { border-color: #8174ed88; transform: translateY(-4px); }
        .lx-model-card-top { display: flex; justify-content: space-between; align-items: center; }
        .lx-model-icon { width: 43px; height: 43px; border-radius: 12px; display: grid; place-items: center; font-size: 19px; font-weight: 800; }
        .lx-status { color: #aab4c9; border: 1px solid #ffffff1b; border-radius: 30px; padding: 5px 9px; font-size: 10px; }
        .lx-model-card h3 { font-size: 18px; margin: 19px 0 7px; }
        .lx-model-card p { color: #929db4; font-size: 12px; line-height: 1.8; min-height: 43px; margin: 0; }
        .lx-model-type { color: #7785a3; font-size: 11px; margin-top: 17px; }
        .lx-feature-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .lx-feature {
          padding: 24px 20px; border: 1px solid #ffffff13; border-radius: 15px;
          background: #111827; min-height: 190px;
        }
        .lx-feature-icon { color: #a99aff; font-size: 25px; }
        .lx-feature h3 { font-size: 15px; margin: 18px 0 9px; }
        .lx-feature p { color: #8d98b0; font-size: 12px; line-height: 1.9; margin: 0; }
        .lx-pricing {
          border: 1px solid #ffffff18; border-radius: 22px; padding: 42px;
          background: radial-gradient(ellipse at top right, #6553ba2b, transparent 55%), #111827;
          display: flex; align-items: center; justify-content: space-between; gap: 30px;
        }
        .lx-pricing h2 { font-size: 29px; margin: 10px 0; }
        .lx-pricing p { color: #9aa5bc; font-size: 13px; line-height: 1.9; max-width: 650px; }
        .lx-pricing-tag { color: #b5aaff; border: 1px solid #8875ff55; border-radius: 10px; padding: 12px 16px; white-space: nowrap; font-size: 13px; }
        .lx-docs {
          display: grid; grid-template-columns: 1fr 1fr; gap: 35px; align-items: center;
          border-top: 1px solid #ffffff12; border-bottom: 1px solid #ffffff12;
        }
        .lx-docs p { color: #9aa5bc; font-size: 14px; line-height: 1.9; }
        .lx-docs-code { padding: 24px; border: 1px solid #ffffff17; border-radius: 14px; background: #050912; color: #b6c2de; font: 12px/2 ui-monospace, monospace; overflow-wrap: anywhere; }
        .lx-footer { padding: 34px 7%; border-top: 1px solid #ffffff12; display: flex; justify-content: space-between; gap: 20px; color: #78839c; font-size: 12px; }
        .lx-footer strong { color: #dce3f5; }
        .lx-footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
        @media (max-width: 900px) {
          .lx-header { padding: 0 5%; }
          .lx-nav { gap: 17px; }
          .lx-hero { grid-template-columns: 1fr; padding-top: 75px; }
          .lx-visual { max-width: 650px; width: 100%; }
          .lx-feature-grid { grid-template-columns: repeat(2, 1fr); }
          .lx-model-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 650px) {
          .lx-header { height: 66px; }
          .lx-menu { display: block; }
          .lx-nav {
            display: none; position: absolute; top: 65px; left: 0; right: 0;
            background: #0d1322; padding: 22px 7%; border-bottom: 1px solid #ffffff18;
            flex-direction: column; align-items: flex-start;
          }
          .lx-nav.open { display: flex; }
          .lx-actions .lx-text-link { display: none; }
          .lx-actions .lx-button { padding: 10px 13px; font-size: 12px; }
          .lx-hero { padding: 65px 6% 55px; gap: 35px; }
          .lx-hero h1 { font-size: 40px; }
          .lx-hero-copy { font-size: 14px; }
          .lx-visual { min-height: 360px; padding: 18px; }
          .lx-section { padding: 58px 6%; }
          .lx-model-grid, .lx-feature-grid { grid-template-columns: 1fr; }
          .lx-pricing { padding: 27px; flex-direction: column; align-items: flex-start; }
          .lx-docs { grid-template-columns: 1fr; gap: 20px; }
          .lx-footer { flex-direction: column; }
        }
      `}</style>

      <div className="lx-app" id="top">
        <header className="lx-header">
          <a href="#top" className="lx-brand" onClick={closeMenu}>
            <span className="lx-brand-mark">灵</span>
            <span>灵犀 AI<small>LINGXI AI PLATFORM</small></span>
          </a>

          <nav className={`lx-nav ${menuOpen ? "open" : ""}`}>
            <a href="#models" onClick={closeMenu}>模型广场</a>
            <a href="#features" onClick={closeMenu}>平台优势</a>
            <a href="#pricing" onClick={closeMenu}>价格说明</a>
            <a href="#docs" onClick={closeMenu}>接入指南</a>
          </nav>

          <div className="lx-actions">
            <a className="lx-text-link" href="#contact">平台介绍</a>
            <a className="lx-button" href="#models">探索模型 ↗</a>
          </div>
          <button className="lx-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开导航">☰</button>
        </header>

        <main>
          <section className="lx-hero">
            <div>
              <div className="lx-eyebrow"><span className="lx-dot" /> 灵犀 AI · 多模型 API 接入平台</div>
              <h1>一个入口<br /><span className="lx-gradient-text">连接你需要的 AI</span></h1>
              <p className="lx-hero-copy">
                面向开发者与团队的 AI 模型接入平台。让国产与国际模型的接入、管理和使用更加简单，
                用统一的入口连接多种 AI 能力，让每一次智能调用都更加高效。
              </p>
              <div className="lx-hero-buttons">
                <a className="lx-button" href="#models">探索支持模型 →</a>
                <a className="lx-button secondary" href="#docs">了解接入方式</a>
              </div>
              <div className="lx-hero-note">平台正在建设中 · 模型渠道与服务能力将逐步开放</div>
            </div>

            <div className="lx-visual">
              <div className="lx-visual-top">
                <span>灵犀 AI · 统一模型入口</span>
                <span className="lx-live">● PLATFORM PREVIEW</span>
              </div>
              <div className="lx-code-card">
                <div className="lx-code-head"><i /><i /><i /></div>
                <div className="lx-code-line"><b>统一接入</b> / 多模型能力</div>
                <div className="lx-code-line">model: <em>your_selected_model</em></div>
                <div className="lx-code-line">provider: <em>Lingxi AI</em></div>
                <div className="lx-code-line">access: <em>one API entry</em></div>
                <div className="lx-code-line">usage: <em>trackable & manageable</em></div>
              </div>
              <div className="lx-model-pills">
                <span>DeepSeek</span><span>豆包</span><span>通义千问</span>
                <span>GPT</span><span>Claude</span><span>Gemini</span>
              </div>
            </div>
          </section>

          <section className="lx-section" id="models">
            <div className="lx-section-head">
              <div className="lx-kicker">MODEL MARKETPLACE</div>
              <h2>你需要的模型能力，一站了解</h2>
              <p>覆盖国产与国际模型方向，具体可用模型以平台实际接入和开放情况为准。</p>
            </div>
            <div className="lx-model-grid">
              {models.map((model) => (
                <article className="lx-model-card" key={model.name}>
                  <div className="lx-model-card-top">
                    <span className="lx-model-icon" style={{ background: model.bg, color: model.color }}>{model.icon}</span>
                    <span className="lx-status">接入规划中</span>
                  </div>
                  <h3>{model.name}</h3>
                  <p>{model.desc}</p>
                  <div className="lx-model-type">{model.type}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="lx-section" id="features">
            <div className="lx-section-head">
              <div className="lx-kicker">WHY LINGXI AI</div>
              <h2>让 AI 接入与管理更简单</h2>
              <p>从统一入口到使用管理，逐步打造清晰、易用的模型服务体验。</p>
            </div>
            <div className="lx-feature-grid">
              {features.map((feature) => (
                <article className="lx-feature" key={feature.title}>
                  <div className="lx-feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="lx-section" id="pricing">
            <div className="lx-pricing">
              <div>
                <div className="lx-kicker">CLEAR & FLEXIBLE</div>
                <h2>价格清晰，使用更安心</h2>
                <p>
                  平台将根据实际接入模型、供应商价格和计费规则制定收费标准。
                  正式开放前，我们会公布模型价格、计费口径和服务说明，不以未经核实的价格误导用户。
                </p>
              </div>
              <div className="lx-pricing-tag">价格与套餐 · 即将公布</div>
            </div>
          </section>

          <section className="lx-section lx-docs" id="docs">
            <div>
              <div className="lx-kicker">DEVELOPER FRIENDLY</div>
              <h2>为开发者准备的统一接入体验</h2>
              <p>
                灵犀 AI 正在规划统一 API 接入、密钥管理和调用记录功能。
                正式接口地址、模型列表及接入文档将在完成测试后公布。
              </p>
              <a className="lx-button" href="#contact">了解平台进展 →</a>
            </div>
            <div className="lx-docs-code">
              <div style={{ color: "#8e9bb7", marginBottom: 12 }}>// 灵犀 AI 接入能力规划</div>
              <div>统一 API 入口</div>
              <div>独立 API Key</div>
              <div>模型权限管理</div>
              <div>Token 用量记录</div>
              <div>账单与调用追踪</div>
              <div style={{ color: "#82d8b1", marginTop: 12 }}>// 完成开发与测试后逐步开放</div>
            </div>
          </section>

          <section className="lx-section" id="contact">
            <div className="lx-section-head">
              <div className="lx-kicker">LINGXI AI</div>
              <h2>让每一次 AI 调用，都更简单</h2>
              <p>灵犀 AI · 专注多模型接入与开发者服务。</p>
            </div>
          </section>
        </main>

        <footer className="lx-footer">
          <div><strong>灵犀 AI</strong> · LINGXI AI PLATFORM<br /><br />连接多模型能力，简化 AI 接入体验。</div>
          <div className="lx-footer-links">
            <a href="#models">模型广场</a>
            <a href="#features">平台优势</a>
            <a href="#pricing">价格说明</a>
            <a href="#docs">接入指南</a>
          </div>
          <div>© 2026 灵犀 AI. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}

export default App;
