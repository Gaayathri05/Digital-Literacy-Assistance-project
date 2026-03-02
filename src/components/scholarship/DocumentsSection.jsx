/* ═══════════════════════════════════════════════════════
   DocumentsSection.jsx
   Shows required documents with category grouping,
   required/optional badges, and document tips.
   Place in: src/components/scholarship/DocumentsSection.jsx
═══════════════════════════════════════════════════════ */
import { useState } from "react";
import { REQUIRED_DOCUMENTS, ELIGIBILITY } from "./scholarshipData.js";

const CSS = `
.ds-wrap { font-family: 'Hind', 'Poppins', sans-serif; }

/* Section title */
.ds-section-title {
  font-family: 'Poppins', sans-serif; font-size: 20px; font-weight: 800;
  color: #0D47A1; margin-bottom: 6px;
  display: flex; align-items: center; gap: 10px;
}
.ds-section-sub { font-size: 14px; color: #64748B; margin-bottom: 24px; font-weight: 500; }

/* Documents grid */
.ds-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 18px; margin-bottom: 40px; }

/* Document category card */
.ds-cat-card {
  background: #fff; border-radius: 16px; overflow: hidden;
  border: 2px solid #E2EAF4;
  box-shadow: 0 2px 12px rgba(13,71,161,0.06);
  transition: all 0.22s ease;
}
.ds-cat-card:hover { border-color: #1565C0; box-shadow: 0 8px 24px rgba(13,71,161,0.12); transform: translateY(-3px); }
.ds-cat-header {
  padding: 16px 18px; display: flex; align-items: center; gap: 12px;
}
.ds-cat-icon { font-size: 24px; }
.ds-cat-name { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; }
.ds-doc-list { padding: 0 18px 16px; display: flex; flex-direction: column; gap: 8px; }
.ds-doc-item {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 10px 12px; border-radius: 10px; background: #F8FAFF;
  border: 1px solid #E2EAF4;
}
.ds-doc-name { font-size: 13.5px; font-weight: 600; color: #1E293B; margin-bottom: 3px; }
.ds-doc-note { font-size: 12px; color: #64748B; line-height: 1.5; }
.ds-badge-required {
  flex-shrink: 0; background: #FEE2E2; color: #DC2626;
  border-radius: 6px; padding: 2px 8px; font-size: 10px; font-weight: 800;
  border: 1px solid #FECACA; white-space: nowrap;
}
.ds-badge-optional {
  flex-shrink: 0; background: #ECFDF5; color: #16A34A;
  border-radius: 6px; padding: 2px 8px; font-size: 10px; font-weight: 800;
  border: 1px solid #BBF7D0; white-space: nowrap;
}

/* Checklist CTA */
.ds-checklist-box {
  background: linear-gradient(135deg,#EEF4FF,#F0F7FF);
  border: 2px solid #BFDBFE; border-radius: 18px;
  padding: 24px 22px; margin-bottom: 40px;
}
.ds-cl-title { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 800; color: #0D47A1; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.ds-cl-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); gap: 10px; }
.ds-cl-item {
  display: flex; align-items: center; gap: 10px;
  background: #fff; border-radius: 10px; padding: 10px 14px;
  border: 1.5px solid #BFDBFE; font-size: 13px; font-weight: 600; color: #1E293B;
  cursor: pointer; transition: all 0.2s;
}
.ds-cl-item:hover { border-color: #1565C0; background: #EEF4FF; }
.ds-cl-item.checked { border-color: #16A34A; background: #F0FDF4; }
.ds-cl-checkbox { width: 20px; height: 20px; border-radius: 5px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; transition: all 0.2s; }
.ds-cl-checkbox.unchecked { border: 2px solid #CBD5E1; background: #fff; }
.ds-cl-checkbox.checked { border: none; background: #16A34A; color: #fff; }

/* Eligibility section */
.ds-elig-title { font-family: 'Poppins', sans-serif; font-size: 20px; font-weight: 800; color: #0D47A1; margin-bottom: 6px; display: flex; align-items: center; gap: 10px; }
.ds-elig-sub { font-size: 14px; color: #64748B; margin-bottom: 24px; }
.ds-elig-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 16px; }
.ds-elig-card {
  background: #fff; border-radius: 16px; padding: 20px 18px;
  border: 2px solid #E2EAF4; box-shadow: 0 2px 10px rgba(13,71,161,0.05);
  transition: all 0.2s;
}
.ds-elig-card:hover { box-shadow: 0 8px 22px rgba(13,71,161,0.1); transform: translateY(-3px); }
.ds-elig-icon-wrap { width: 48px; height: 48px; border-radius: 13px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 14px; }
.ds-elig-name { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 800; margin-bottom: 12px; }
.ds-elig-points { display: flex; flex-direction: column; gap: 7px; }
.ds-elig-point { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: #334155; line-height: 1.55; }
.ds-elig-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; margin-top: 7px; }
`;

export default function DocumentsSection() {
  const allDocs = REQUIRED_DOCUMENTS.flatMap(cat => cat.docs.map(d => d.name));
  const [checked, setChecked] = useState({});

  const toggle = (name) => setChecked(p => ({ ...p, [name]: !p[name] }));
  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="ds-wrap">
      <style>{CSS}</style>

      {/* Documents section */}
      <div className="ds-section-title">📄 Required Documents</div>
      <div className="ds-section-sub">Gather these documents before starting your NSP application. Having everything ready will make the process smooth.</div>

      <div className="ds-grid">
        {REQUIRED_DOCUMENTS.map((cat, ci) => (
          <div key={ci} className="ds-cat-card">
            <div className="ds-cat-header" style={{background:cat.bg, borderBottom:`2px solid ${cat.bg}`}}>
              <span className="ds-cat-icon">{cat.icon}</span>
              <div className="ds-cat-name" style={{color:cat.color}}>{cat.category}</div>
            </div>
            <div className="ds-doc-list">
              {cat.docs.map((doc, di) => (
                <div key={di} className="ds-doc-item">
                  <div style={{flex:1}}>
                    <div className="ds-doc-name">{doc.name}</div>
                    <div className="ds-doc-note">{doc.note}</div>
                  </div>
                  <span className={doc.required ? "ds-badge-required" : "ds-badge-optional"}>
                    {doc.required ? "Required" : "If applicable"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive checklist */}
      <div className="ds-checklist-box">
        <div className="ds-cl-title">
          ✅ Document Checklist
          <span style={{marginLeft:"auto",background:"#1565C0",color:"#fff",borderRadius:20,padding:"3px 12px",fontSize:12}}>
            {doneCount}/{allDocs.length} Ready
          </span>
        </div>
        <div style={{height:6,background:"#BFDBFE",borderRadius:10,marginBottom:16,overflow:"hidden"}}>
          <div style={{height:"100%",background:"#1565C0",borderRadius:10,width:`${(doneCount/allDocs.length)*100}%`,transition:"width 0.4s ease"}}/>
        </div>
        <div className="ds-cl-grid">
          {allDocs.map((doc, i) => (
            <div
              key={i}
              className={`ds-cl-item ${checked[doc]?"checked":""}`}
              onClick={() => toggle(doc)}
            >
              <div className={`ds-cl-checkbox ${checked[doc]?"checked":"unchecked"}`}>
                {checked[doc] && "✓"}
              </div>
              <span>{doc}</span>
            </div>
          ))}
        </div>
        {doneCount === allDocs.length && (
          <div style={{marginTop:16,background:"#F0FDF4",border:"2px solid #BBF7D0",borderRadius:10,padding:"12px 16px",textAlign:"center",fontSize:14,fontWeight:700,color:"#166534"}}>
            🎉 All documents ready! You can now start your application.
          </div>
        )}
      </div>

      {/* Eligibility section */}
      <div className="ds-elig-title">✅ Eligibility Criteria</div>
      <div className="ds-elig-sub">Check if you qualify for NSP scholarships before applying.</div>
      <div className="ds-elig-grid">
        {ELIGIBILITY.map((e, ei) => (
          <div key={ei} className="ds-elig-card">
            <div className="ds-elig-icon-wrap" style={{background:e.bg}}>
              <span>{e.icon}</span>
            </div>
            <div className="ds-elig-name" style={{color:e.color}}>{e.title}</div>
            <div className="ds-elig-points">
              {e.points.map((p, pi) => (
                <div key={pi} className="ds-elig-point" style={{color:e.color}}>
                  <span className="ds-elig-dot"/>
                  <span style={{color:"#334155"}}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}