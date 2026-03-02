/* ═══════════════════════════════════════════════════════
   ScholarshipService.jsx
   Main orchestrator component for the Scholarship service.
   Handles tab navigation between:
     Home | Step Guide | Documents & Eligibility | FAQ & Chat
   
   HOW TO USE IN App.jsx:
   1. Import: import ScholarshipService from './components/scholarship/ScholarshipService';
   2. In your startService function, when service.id === "scholarship",
      render <ScholarshipService onBack={() => setScreen("services")} />
      instead of the regular chat screen.

   Place in: src/components/scholarship/ScholarshipService.jsx
═══════════════════════════════════════════════════════ */
import { useState } from "react";
import ScholarshipHome    from "./ScholarshipHome.jsx";
import ScholarshipGuide   from "./ScholarshipGuide.jsx";
import DocumentsSection   from "./DocumentsSection.jsx";
import FAQSection         from "./FAQSection.jsx";

const CSS = `
.ss-shell { font-family: 'Hind', 'Poppins', sans-serif; background: #F0F4FF; min-height: 100vh; }

/* Top bar */
.ss-topbar {
  background: linear-gradient(95deg,#0A3880 0%,#1565C0 55%,#1E88E5 100%);
  padding: 14px 28px; display: flex; align-items: center; gap: 14px;
  box-shadow: 0 3px 14px rgba(13,71,161,0.3);
}
.ss-back-btn {
  background: rgba(255,255,255,0.14); border: 1.5px solid rgba(255,255,255,0.28);
  color: #fff; border-radius: 22px; padding: 7px 18px; font-size: 13px;
  font-family: 'Hind', sans-serif; font-weight: 700; cursor: pointer;
  transition: background 0.2s; display: flex; align-items: center; gap: 6px;
}
.ss-back-btn:hover { background: rgba(255,255,255,0.25); }
.ss-topbar-title { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 800; color: #fff; }
.ss-topbar-sub { font-size: 11px; color: rgba(255,255,255,0.75); margin-top: 1px; }
.ss-nsp-link {
  margin-left: auto; display: flex; align-items: center; gap: 7px;
  background: #FFC107; color: #1A237E; border-radius: 22px;
  padding: 7px 18px; font-size: 13px; font-weight: 800;
  font-family: 'Poppins', sans-serif; text-decoration: none;
  transition: all 0.2s; white-space: nowrap;
}
.ss-nsp-link:hover { background: #FFB300; }

/* Tab nav */
.ss-tabnav {
  background: #fff; border-bottom: 2px solid #E2EAF4;
  padding: 0 28px; display: flex; gap: 0; overflow-x: auto;
}
.ss-tab {
  padding: 14px 20px; font-size: 14px; font-weight: 700;
  cursor: pointer; border-bottom: 3px solid transparent;
  transition: all 0.2s; white-space: nowrap; color: #64748B;
  font-family: 'Hind', sans-serif; background: none; border-top: none; border-left: none; border-right: none;
  display: flex; align-items: center; gap: 7px;
}
.ss-tab:hover { color: #1565C0; background: #F8FAFF; }
.ss-tab.active { color: #1565C0; border-bottom-color: #1565C0; background: #F8FAFF; }

/* Content */
.ss-content { max-width: 1100px; margin: 0 auto; padding: 28px 24px 60px; }

/* Responsive */
@media(max-width:700px) {
  .ss-topbar { padding: 12px 14px; flex-wrap: wrap; gap: 10px; }
  .ss-nsp-link { display: none; }
  .ss-content { padding: 16px 12px 48px; }
  .ss-tabnav { padding: 0 10px; }
  .ss-tab { padding: 12px 12px; font-size: 13px; }
}
`;

const TABS = [
  { id:"home",    label:"🏠 Overview",          short:"Home"      },
  { id:"guide",   label:"📋 Step-by-Step Guide", short:"Guide"     },
  { id:"docs",    label:"📄 Documents & Eligibility", short:"Documents" },
  { id:"faq",     label:"❓ FAQ & Assistant",    short:"FAQ"       },
];

export default function ScholarshipService({ onBack }) {
  const [tab, setTab] = useState("home");

  return (
    <div className="ss-shell">
      <style>{CSS}</style>

      {/* Top bar */}
      <div className="ss-topbar">
        <button className="ss-back-btn" onClick={onBack}>
          ← Back
        </button>
        <div>
          <div className="ss-topbar-title">🎓 Scholarship Guidance</div>
          <div className="ss-topbar-sub">National Scholarship Portal (NSP) — AY 2025-26</div>
        </div>
        <a
          href="https://scholarships.gov.in"
          target="_blank" rel="noopener noreferrer"
          className="ss-nsp-link"
        >
          🌐 Official NSP →
        </a>
      </div>

      {/* Tab navigation */}
      <div className="ss-tabnav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`ss-tab ${tab===t.id?"active":""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="ss-content">
        {tab === "home" && (
          <ScholarshipHome
            onStartGuide={() => setTab("guide")}
            onShowFAQ={() => setTab("faq")}
          />
        )}
        {tab === "guide" && (
          <ScholarshipGuide onBack={() => setTab("home")} />
        )}
        {tab === "docs" && (
          <DocumentsSection />
        )}
        {tab === "faq" && (
          <FAQSection />
        )}
      </div>
    </div>
  );
}