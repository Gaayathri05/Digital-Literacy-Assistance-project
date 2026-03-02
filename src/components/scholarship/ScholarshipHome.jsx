/* ═══════════════════════════════════════════════════════
   ScholarshipHome.jsx
   Landing overview for the Scholarship service.
   Shows: what is NSP, OTR explained, quick entry points.
   Place in: src/components/scholarship/ScholarshipHome.jsx
═══════════════════════════════════════════════════════ */
import { useState } from "react";

const CSS = `
.sh-wrap { font-family: 'Hind', 'Poppins', sans-serif; }

/* Hero banner */
.sh-hero {
  background: linear-gradient(130deg, #0A3880 0%, #1565C0 55%, #1E88E5 100%);
  border-radius: 20px; padding: 36px 32px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px; position: relative; overflow: hidden; margin-bottom: 28px;
}
.sh-hero::before {
  content: ''; position: absolute; right: -60px; top: -60px;
  width: 260px; height: 260px;
  background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
  border-radius: 50%;
}
.sh-hero-left { position: relative; z-index: 1; flex: 1; }
.sh-hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28);
  color: #fff; border-radius: 20px; padding: 5px 14px;
  font-size: 12px; font-weight: 600; margin-bottom: 14px;
}
.sh-hero-badge .dot { width: 7px; height: 7px; background: #A7F3D0; border-radius: 50%; animation: shPulse 2s ease-in-out infinite; }
@keyframes shPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.sh-hero h2 { font-family: 'Poppins', sans-serif; font-size: clamp(18px,2.5vw,28px); font-weight: 800; color: #fff; line-height: 1.25; margin-bottom: 10px; }
.sh-hero h2 span { color: #FFC107; }
.sh-hero p { font-size: 14px; color: rgba(255,255,255,0.82); line-height: 1.65; margin-bottom: 22px; max-width: 440px; }
.sh-hero-emoji { font-size: 80px; position: relative; z-index: 1; animation: shFloat 3.5s ease-in-out infinite; flex-shrink: 0; filter: drop-shadow(0 8px 20px rgba(0,0,0,0.2)); }
@keyframes shFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

/* CTA buttons */
.sh-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
.sh-btn-primary {
  background: #FFC107; color: #1A237E; border: none; border-radius: 28px;
  padding: 12px 28px; font-size: 15px; font-weight: 800;
  font-family: 'Poppins', sans-serif; cursor: pointer;
  box-shadow: 0 4px 16px rgba(255,193,7,0.4);
  transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
}
.sh-btn-primary:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 8px 24px rgba(255,193,7,0.5); }
.sh-btn-outline {
  background: rgba(255,255,255,0.14); color: #fff;
  border: 2px solid rgba(255,255,255,0.3); border-radius: 28px;
  padding: 11px 24px; font-size: 14px; font-weight: 700;
  font-family: 'Hind', sans-serif; cursor: pointer;
  transition: background 0.2s; text-decoration: none; display: inline-flex; align-items: center;
}
.sh-btn-outline:hover { background: rgba(255,255,255,0.25); }

/* Info cards grid */
.sh-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap: 16px; margin-bottom: 28px; }
.sh-info-card {
  background: #fff; border-radius: 16px; padding: 22px 18px;
  border: 2px solid #E2EAF4; box-shadow: 0 2px 12px rgba(13,71,161,0.06);
  transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
  cursor: default;
}
.sh-info-card:hover { border-color: #1565C0; transform: translateY(-4px); box-shadow: 0 10px 28px rgba(13,71,161,0.13); }
.sh-card-icon { font-size: 32px; margin-bottom: 12px; display: block; }
.sh-card-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: #0D47A1; margin-bottom: 7px; }
.sh-card-desc { font-size: 13px; color: #64748B; line-height: 1.6; }

/* OTR explain box */
.sh-otr-box {
  background: linear-gradient(135deg, #EEF4FF, #F0F7FF);
  border: 2px solid #BFDBFE; border-radius: 18px; padding: 24px 22px;
  margin-bottom: 28px; display: flex; gap: 20px; align-items: flex-start;
}
.sh-otr-icon { font-size: 44px; flex-shrink: 0; margin-top: 4px; }
.sh-otr-title { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 800; color: #0D47A1; margin-bottom: 8px; }
.sh-otr-desc { font-size: 13.5px; color: #334155; line-height: 1.7; }
.sh-otr-desc strong { color: #1565C0; font-weight: 700; }
.sh-otr-tag {
  display: inline-flex; align-items: center; gap: 6px;
  background: #1565C0; color: #fff; border-radius: 20px;
  padding: 4px 14px; font-size: 12px; font-weight: 700; margin-top: 12px;
}

/* Year badge */
.sh-year-banner {
  background: #FFFBEB; border: 2px solid #FEF08A; border-radius: 14px;
  padding: 14px 18px; display: flex; align-items: center; gap: 12px;
  margin-bottom: 28px; font-size: 14px; color: #78350F; font-weight: 600;
}

/* Responsive */
@media(max-width:700px) {
  .sh-hero { flex-direction: column; text-align: center; }
  .sh-hero-emoji { font-size: 56px; }
  .sh-cta-row { justify-content: center; }
  .sh-otr-box { flex-direction: column; }
}
`;

export default function ScholarshipHome({ onStartGuide, onShowFAQ }) {
  return (
    <div className="sh-wrap">
      <style>{CSS}</style>

      {/* Year Alert */}
      <div className="sh-year-banner">
        <span style={{fontSize:20}}>📢</span>
        <span>Portal is open for <strong>Academic Year 2025-26</strong> — Students can now register to get their OTR numbers and apply for scholarships.</span>
      </div>

      {/* Hero */}
      <div className="sh-hero">
        <div className="sh-hero-left">
          <div className="sh-hero-badge">
            <span className="dot"/>
            National Scholarship Portal • scholarships.gov.in
          </div>
          <h2>Apply for Government<br/><span>Scholarship Easily!</span></h2>
          <p>We guide you through every step of the NSP scholarship process — from registration to final submission. Simple, clear, and beginner-friendly.</p>
          <div className="sh-cta-row">
            <button className="sh-btn-primary" onClick={onStartGuide}>
              📋 Start Step-by-Step Guide →
            </button>
            <a
              href="https://scholarships.gov.in"
              target="_blank" rel="noopener noreferrer"
              className="sh-btn-outline"
            >
              🌐 Official Website
            </a>
          </div>
        </div>
        <div className="sh-hero-emoji">🎓</div>
      </div>

      {/* OTR Explanation */}
      <div className="sh-otr-box">
        <span className="sh-otr-icon">🔢</span>
        <div>
          <div className="sh-otr-title">What is OTR? (Important to know first!)</div>
          <div className="sh-otr-desc">
            <strong>OTR = One Time Registration</strong> — It is a unique <strong>14-digit number</strong> issued based on your Aadhaar. <br/>
            You register <strong>ONCE</strong> and use the same OTR number for your entire academic career to apply for scholarships.<br/><br/>
            OTR is <strong>mandatory</strong> for all NSP scholarship applications. Registration is <strong>100% FREE</strong>.
          </div>
          <div className="sh-otr-tag">✅ Required for all NSP scholarships</div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="sh-cards-grid">
        {[
          { icon:"🆓", title:"Completely Free", desc:"Registration and application on NSP is 100% free. Never pay any agent or middleman." },
          { icon:"📱", title:"Mobile Required", desc:"Your Aadhaar-linked mobile number is needed for OTP verification during registration." },
          { icon:"🪪", title:"Aadhaar Mandatory", desc:"Aadhaar card is needed for face authentication to generate your OTR number." },
          { icon:"🏫", title:"Institute Approval", desc:"After applying, your school or college must approve your application online before deadline." },
          { icon:"🏦", title:"Bank Account Needed", desc:"Scholarship money is sent to your bank account via DBT. Account must be in student's name." },
          { icon:"📅", title:"Check Deadlines", desc:"Fresh application deadline is usually October 31. Always check scholarships.gov.in for updates." },
        ].map((c,i) => (
          <div key={i} className="sh-info-card">
            <span className="sh-card-icon">{c.icon}</span>
            <div className="sh-card-title">{c.title}</div>
            <div className="sh-card-desc">{c.desc}</div>
          </div>
        ))}
      </div>

      {/* Bottom actions */}
      <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
        <button
          onClick={onStartGuide}
          style={{flex:1,minWidth:200,background:"linear-gradient(135deg,#1565C0,#1E88E5)",color:"#fff",border:"none",borderRadius:14,padding:"16px 24px",fontSize:15,fontWeight:700,fontFamily:"'Poppins',sans-serif",cursor:"pointer",boxShadow:"0 4px 16px rgba(21,101,192,0.3)",transition:"all 0.2s"}}
        >
          📋 View Step-by-Step Guide
        </button>
        <button
          onClick={onShowFAQ}
          style={{flex:1,minWidth:200,background:"#fff",color:"#1565C0",border:"2px solid #1565C0",borderRadius:14,padding:"15px 24px",fontSize:15,fontWeight:700,fontFamily:"'Poppins',sans-serif",cursor:"pointer",transition:"all 0.2s"}}
        >
          ❓ Frequently Asked Questions
        </button>
      </div>
    </div>
  );
}