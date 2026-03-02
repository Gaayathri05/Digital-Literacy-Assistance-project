/* ═══════════════════════════════════════════════════════
   ScholarshipGuide.jsx
   Interactive step-by-step guide for NSP scholarship.
   Shows highlighted form fields, phase indicators,
   and warnings. Fully offline — no API needed.
   Place in: src/components/scholarship/ScholarshipGuide.jsx
═══════════════════════════════════════════════════════ */
import { useState } from "react";
import { SCHOLARSHIP_STEPS } from "./scholarshipData.js";

const CSS = `
.sg-wrap { font-family: 'Hind', 'Poppins', sans-serif; }

/* Phase tabs */
.sg-phase-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
.sg-phase-tab {
  padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700;
  cursor: pointer; border: 2px solid transparent; transition: all 0.2s;
  font-family: 'Hind', sans-serif;
}
.sg-phase-tab.active { background: #1565C0; color: #fff; border-color: #1565C0; }
.sg-phase-tab.inactive { background: #fff; color: #64748B; border-color: #E2EAF4; }
.sg-phase-tab.inactive:hover { border-color: #1565C0; color: #1565C0; }

/* Progress stepper */
.sg-stepper { display: flex; align-items: center; margin-bottom: 28px; overflow-x: auto; padding-bottom: 6px; }
.sg-step-item { display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 70px; position: relative; }
.sg-step-item:not(:last-child)::after {
  content: ''; position: absolute; top: 18px; left: 55%;
  width: 90%; height: 2px; z-index: 0;
  transition: background 0.3s;
}
.sg-step-circle {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 800; position: relative; z-index: 1;
  transition: all 0.3s; cursor: pointer;
  border: 3px solid transparent;
  font-family: 'Poppins', sans-serif;
}
.sg-step-label { font-size: 10px; font-weight: 600; color: #94A3B8; text-align: center; margin-top: 6px; line-height: 1.3; }
.sg-step-label.active { color: #1565C0; }
.sg-step-label.done { color: #16A34A; }

/* Main step card */
.sg-card {
  background: #fff; border-radius: 20px; overflow: hidden;
  box-shadow: 0 4px 20px rgba(13,71,161,0.1);
  border: 2px solid #E2EAF4;
  animation: sgFadeIn 0.35s ease;
}
@keyframes sgFadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
.sg-card-header {
  padding: 24px 28px 20px;
  display: flex; align-items: flex-start; gap: 18px;
}
.sg-card-icon-wrap {
  width: 60px; height: 60px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.sg-step-num { font-size: 11px; font-weight: 700; color: #94A3B8; letter-spacing: 1px; text-transform: uppercase; }
.sg-step-title { font-family: 'Poppins', sans-serif; font-size: 20px; font-weight: 800; color: #0D47A1; margin: 4px 0 6px; }
.sg-step-subtitle { font-size: 13px; color: #64748B; font-weight: 500; }

/* Phase badge */
.sg-phase-badge {
  display: inline-flex; align-items: center; gap: 5px;
  border-radius: 18px; padding: 3px 12px; font-size: 11px; font-weight: 700;
  margin-left: auto; flex-shrink: 0; align-self: flex-start; margin-top: 4px;
}

.sg-card-body { padding: 0 28px 28px; }

.sg-description { font-size: 14.5px; color: #334155; line-height: 1.75; margin-bottom: 20px; font-weight: 500; }

/* Details list */
.sg-details-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.sg-detail-item {
  display: flex; align-items: flex-start; gap: 12px;
  background: #F8FAFF; border-radius: 10px; padding: 11px 14px;
  border: 1px solid #E2EAF4; font-size: 13.5px; color: #334155;
  line-height: 1.6; font-weight: 500;
  transition: background 0.2s;
}
.sg-detail-item:hover { background: #EEF4FF; }
.sg-detail-num {
  width: 24px; height: 24px; border-radius: 50%;
  background: #1565C0; color: #fff; font-size: 11px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}

/* Warning box */
.sg-warning {
  background: #FFFBEB; border: 2px solid #FEF08A; border-radius: 12px;
  padding: 13px 16px; display: flex; gap: 10px; align-items: flex-start;
  font-size: 13.5px; color: #78350F; line-height: 1.6; font-weight: 600;
  margin-bottom: 20px;
}

/* Highlighted form preview */
.sg-form-preview {
  background: #F8FAFF; border: 2px dashed #BFDBFE;
  border-radius: 14px; padding: 18px;
  margin-bottom: 20px;
}
.sg-form-label-row {
  display: flex; align-items: center; gap: 8px;
  font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
  color: #1565C0; margin-bottom: 14px;
}
.sg-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.sg-field-wrap { display: flex; flex-direction: column; gap: 5px; }
.sg-field-label { font-size: 12px; font-weight: 700; color: #475569; }
.sg-field-input {
  border-radius: 8px; padding: 10px 13px;
  font-size: 13px; font-family: 'Hind', sans-serif;
  transition: all 0.3s; outline: none;
}
.sg-field-input.highlighted {
  border: 2.5px solid #1565C0;
  background: #EEF4FF;
  box-shadow: 0 0 0 4px rgba(21,101,192,0.15);
  animation: sgGlow 1.8s ease-in-out infinite;
}
.sg-field-input.normal { border: 1.5px solid #CBD5E1; background: #fff; }
.sg-field-input.readonly { background: #F1F5F9; color: #94A3B8; cursor: not-allowed; }
@keyframes sgGlow {
  0%,100% { box-shadow: 0 0 0 4px rgba(21,101,192,0.15); }
  50%      { box-shadow: 0 0 0 6px rgba(21,101,192,0.28); }
}
.sg-highlight-note {
  margin-top: 10px; font-size: 12px; color: #1565C0; font-weight: 600;
  display: flex; align-items: center; gap: 6px;
}

/* Nav buttons */
.sg-nav-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.sg-btn-prev {
  background: #fff; border: 2px solid #E2EAF4; color: #475569;
  border-radius: 12px; padding: 12px 24px; font-size: 14px; font-weight: 700;
  font-family: 'Hind', sans-serif; cursor: pointer; transition: all 0.2s;
}
.sg-btn-prev:hover { border-color: #1565C0; color: #1565C0; }
.sg-btn-next {
  flex: 1; background: linear-gradient(135deg,#1565C0,#1E88E5);
  color: #fff; border: none; border-radius: 12px;
  padding: 13px 28px; font-size: 15px; font-weight: 700;
  font-family: 'Poppins', sans-serif; cursor: pointer;
  box-shadow: 0 4px 14px rgba(21,101,192,0.3);
  transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
}
.sg-btn-next:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(21,101,192,0.38); }
.sg-btn-done {
  flex: 1; background: linear-gradient(135deg,#16A34A,#22C55E);
  color: #fff; border: none; border-radius: 12px;
  padding: 13px 28px; font-size: 15px; font-weight: 700;
  font-family: 'Poppins', sans-serif; cursor: pointer;
  box-shadow: 0 4px 14px rgba(22,163,74,0.3);
  transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
}
.sg-btn-done:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(22,163,74,0.38); }

/* Completion banner */
.sg-complete {
  background: linear-gradient(135deg,#F0FDF4,#ECFDF5);
  border: 2px solid #BBF7D0; border-radius: 20px;
  padding: 40px 32px; text-align: center;
  animation: sgFadeIn 0.4s ease;
}
.sg-complete h3 { font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 800; color: #166534; margin: 16px 0 12px; }
.sg-complete p { font-size: 15px; color: #166534; line-height: 1.7; max-width: 500px; margin: 0 auto 24px; }

/* Responsive */
@media(max-width:600px) {
  .sg-card-header { flex-direction: column; gap: 12px; }
  .sg-phase-badge { margin-left: 0; }
  .sg-form-grid { grid-template-columns: 1fr; }
  .sg-card-body { padding: 0 16px 20px; }
  .sg-card-header { padding: 18px 16px 14px; }
}
`;

const PHASES = ["All Steps", "Registration", "eKYC", "Application", "Submission"];

export default function ScholarshipGuide({ onBack }) {
  const [current, setCurrent]   = useState(0);
  const [done,    setDone]      = useState(false);
  const [filter,  setFilter]    = useState("All Steps");

  const steps = filter === "All Steps"
    ? SCHOLARSHIP_STEPS
    : SCHOLARSHIP_STEPS.filter(s => s.phase === filter);

  const step = steps[current];
  const isLast = current === steps.length - 1;

  const next = () => {
    if (isLast) { setDone(true); return; }
    setCurrent(c => c + 1);
  };
  const prev = () => { if (current > 0) setCurrent(c => c - 1); };

  const phaseColors = {
    Registration: { bg:"#EEF4FF", color:"#1565C0" },
    eKYC:         { bg:"#F5F3FF", color:"#7C3AED" },
    Application:  { bg:"#ECFDF5", color:"#059669" },
    Submission:   { bg:"#F0FDF4", color:"#16A34A" },
  };
  const pc = phaseColors[step?.phase] || phaseColors.Registration;

  if (done) {
    return (
      <div className="sg-wrap">
        <style>{CSS}</style>
        <div className="sg-complete">
          <div style={{fontSize:64}}>🎉</div>
          <h3>You've completed the full guide!</h3>
          <p>
            You now know all the steps to apply for a government scholarship on NSP.<br/>
            Remember: Register your OTR first, then apply when the portal opens.<br/>
            <strong>Application deadline is usually October 31 every year.</strong>
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <a
              href="https://scholarships.gov.in"
              target="_blank" rel="noopener noreferrer"
              style={{background:"#FFC107",color:"#1A237E",border:"none",borderRadius:28,padding:"13px 28px",fontSize:15,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer",textDecoration:"none",boxShadow:"0 4px 16px rgba(255,193,7,0.4)"}}
            >
              🌐 Go to Official NSP Website →
            </a>
            <button
              onClick={()=>{setCurrent(0);setDone(false);}}
              style={{background:"#fff",color:"#1565C0",border:"2px solid #1565C0",borderRadius:28,padding:"12px 24px",fontSize:14,fontWeight:700,cursor:"pointer"}}
            >
              🔁 Read Guide Again
            </button>
            <button onClick={onBack}
              style={{background:"#fff",color:"#475569",border:"2px solid #E2EAF4",borderRadius:28,padding:"12px 24px",fontSize:14,fontWeight:700,cursor:"pointer"}}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sg-wrap">
      <style>{CSS}</style>

      {/* Phase filter */}
      <div className="sg-phase-row">
        {PHASES.map(p => (
          <button
            key={p}
            className={`sg-phase-tab ${filter===p?"active":"inactive"}`}
            onClick={() => { setFilter(p); setCurrent(0); setDone(false); }}
          >{p}</button>
        ))}
      </div>

      {/* Stepper */}
      <div className="sg-stepper">
        {steps.map((s, i) => {
          const isDone   = i < current;
          const isActive = i === current;
          return (
            <div key={s.id} className="sg-step-item" style={{}}>
              {/* connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  position:"absolute",top:18,left:"55%",width:"90%",height:2,zIndex:0,
                  background: isDone ? "#16A34A" : isActive ? "linear-gradient(90deg,#1565C0,#BFDBFE)" : "#E2EAF4",
                  transition:"background 0.3s"
                }}/>
              )}
              <div
                className="sg-step-circle"
                onClick={() => setCurrent(i)}
                style={{
                  background: isDone ? "#16A34A" : isActive ? "#1565C0" : "#fff",
                  color: isDone||isActive ? "#fff" : "#94A3B8",
                  borderColor: isDone ? "#16A34A" : isActive ? "#1565C0" : "#E2EAF4",
                  boxShadow: isActive ? "0 4px 12px rgba(21,101,192,0.35)" : "none",
                }}
              >
                {isDone ? "✓" : s.icon}
              </div>
              <div className={`sg-step-label ${isDone?"done":isActive?"active":""}`}>
                Step {s.id}
              </div>
            </div>
          );
        })}
      </div>

      {/* Step card */}
      <div className="sg-card">
        <div className="sg-card-header" style={{borderBottom:`2px solid ${step.border}`,background:`linear-gradient(135deg,${step.bg},#fff)`}}>
          <div className="sg-card-icon-wrap" style={{background:step.bg,border:`2px solid ${step.border}`}}>
            <span style={{fontSize:28}}>{step.icon}</span>
          </div>
          <div style={{flex:1}}>
            <div className="sg-step-num">Step {step.id} of {SCHOLARSHIP_STEPS.length}</div>
            <div className="sg-step-title">{step.title}</div>
            <div className="sg-step-subtitle">{step.subtitle}</div>
          </div>
          <div className="sg-phase-badge" style={{background:pc.bg,color:pc.color,border:`1.5px solid ${step.border}`}}>
            {step.phase}
          </div>
        </div>

        <div className="sg-card-body">
          <p className="sg-description" style={{marginTop:20}}>{step.description}</p>

          {/* Highlighted form preview */}
          {step.formFields && (
            <div className="sg-form-preview">
              <div className="sg-form-label-row">
                <span>💻</span>
                <span>What you will see on the website — highlighted fields need your attention</span>
              </div>
              <div className="sg-form-grid">
                {step.formFields.map((f, fi) => (
                  <div key={fi} className="sg-field-wrap">
                    <div className="sg-field-label">
                      {f.label} {f.highlight && <span style={{color:"#1565C0"}}>← Enter here</span>}
                    </div>
                    <input
                      className={`sg-field-input ${f.highlight?"highlighted":"normal"} ${f.readonly?"readonly":""}`}
                      placeholder={f.placeholder}
                      type={f.type}
                      readOnly
                    />
                  </div>
                ))}
              </div>
              <div className="sg-highlight-note">
                <span style={{background:"#1565C0",color:"#fff",borderRadius:4,padding:"2px 8px",fontSize:11}}>●</span>
                Blue highlighted fields are where you need to enter your details
              </div>
            </div>
          )}

          {/* Detail steps */}
          <ul className="sg-details-list">
            {step.details.map((d, di) => (
              <li key={di} className="sg-detail-item">
                <div className="sg-detail-num">{di+1}</div>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          {/* Warning */}
          {step.warning && (
            <div className="sg-warning">
              <span style={{fontSize:20,flexShrink:0}}>⚠️</span>
              <span>{step.warning}</span>
            </div>
          )}

          {/* Navigation */}
          <div className="sg-nav-row">
            {current > 0 && (
              <button className="sg-btn-prev" onClick={prev}>← Previous</button>
            )}
            {current === 0 && (
              <button className="sg-btn-prev" onClick={onBack}>← Back to Home</button>
            )}
            {isLast
              ? <button className="sg-btn-done" onClick={next}>✅ Complete Guide 🎉</button>
              : <button className="sg-btn-next" onClick={next}>Next Step →</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}