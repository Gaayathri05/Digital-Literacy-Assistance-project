/* ═══════════════════════════════════════════════════════
   FAQSection.jsx
   Accordion FAQ + Offline chatbot with keyword matching.
   Works 100% offline — no internet/API needed.
   Place in: src/components/scholarship/FAQSection.jsx
═══════════════════════════════════════════════════════ */
import { useState, useRef, useEffect } from "react";
import { SCHOLARSHIP_FAQ, getOfflineResponse } from "./scholarshipData.js";

const CSS = `
.faq-wrap { font-family: 'Hind', 'Poppins', sans-serif; }

/* Section title */
.faq-section-title { font-family: 'Poppins', sans-serif; font-size: 20px; font-weight: 800; color: #0D47A1; margin-bottom: 6px; display: flex; align-items: center; gap: 10px; }
.faq-section-sub { font-size: 14px; color: #64748B; margin-bottom: 20px; }

/* Tag filter */
.faq-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 22px; }
.faq-tag {
  padding: 5px 16px; border-radius: 20px; font-size: 12px; font-weight: 700;
  cursor: pointer; border: 2px solid transparent; transition: all 0.2s;
  font-family: 'Hind', sans-serif;
}
.faq-tag.active { background: #1565C0; color: #fff; border-color: #1565C0; }
.faq-tag.inactive { background: #fff; color: #64748B; border-color: #E2EAF4; }
.faq-tag.inactive:hover { border-color: #1565C0; color: #1565C0; }

/* FAQ accordion */
.faq-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 40px; }
.faq-item { background: #fff; border-radius: 14px; border: 2px solid #E2EAF4; overflow: hidden; transition: border-color 0.2s; }
.faq-item:hover { border-color: #BFDBFE; }
.faq-item.open { border-color: #1565C0; }
.faq-q {
  padding: 16px 20px; display: flex; align-items: center; justify-content: space-between;
  gap: 14px; cursor: pointer; user-select: none;
}
.faq-q-text { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: #1E293B; line-height: 1.4; flex: 1; }
.faq-item.open .faq-q-text { color: #1565C0; }
.faq-chevron {
  width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; transition: all 0.25s; background: #F0F4FF; color: #1565C0;
}
.faq-item.open .faq-chevron { background: #1565C0; color: #fff; transform: rotate(180deg); }
.faq-a {
  padding: 0 20px 18px; font-size: 13.5px; color: #334155;
  line-height: 1.75; font-weight: 500; white-space: pre-line;
  animation: faqOpen 0.25s ease;
}
@keyframes faqOpen { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
.faq-tag-badge {
  font-size: 10px; font-weight: 700; padding: 2px 10px; border-radius: 10px;
  background: #EEF4FF; color: #1565C0; border: 1px solid #BFDBFE;
  flex-shrink: 0;
}

/* ── OFFLINE CHATBOT ── */
.faq-chat-box { background: #fff; border: 2px solid #E2EAF4; border-radius: 20px; overflow: hidden; }
.faq-chat-header {
  background: linear-gradient(95deg,#1565C0,#1E88E5);
  padding: 16px 20px; display: flex; align-items: center; gap: 12px;
}
.faq-chat-av { width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.faq-chat-hname { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 800; color: #fff; }
.faq-chat-hstatus { font-size: 11px; color: rgba(255,255,255,0.8); display: flex; align-items: center; gap: 5px; margin-top: 2px; }
.faq-online-dot { width: 6px; height: 6px; background: #A7F3D0; border-radius: 50%; animation: faqPulse 2s ease-in-out infinite; }
@keyframes faqPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.faq-offline-badge { margin-left: auto; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.28); color: #fff; border-radius: 14px; padding: 4px 12px; font-size: 11px; font-weight: 700; }

.faq-messages { height: 340px; overflow-y: auto; padding: 18px 16px; display: flex; flex-direction: column; gap: 14px; background: #F8FAFF; }
.faq-msg { display: flex; align-items: flex-end; gap: 9px; animation: faqMsgIn 0.3s ease; }
@keyframes faqMsgIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
.faq-msg.user { flex-direction: row-reverse; }
.faq-msg-av { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
.faq-bot-av { background: linear-gradient(135deg,#1565C0,#42A5F5); box-shadow: 0 2px 8px rgba(21,101,192,0.25); }
.faq-user-av { background: linear-gradient(135deg,#FF8F00,#FFC107); }
.faq-bubble { max-width: 78%; padding: 11px 15px; border-radius: 16px; font-size: 13.5px; line-height: 1.7; white-space: pre-line; }
.faq-msg.bot .faq-bubble { background: #fff; border-bottom-left-radius: 4px; color: #1E293B; border: 1px solid #DBEAFE; }
.faq-msg.user .faq-bubble { background: linear-gradient(135deg,#1565C0,#1976D2); border-bottom-right-radius: 4px; color: #fff; }

/* Quick questions */
.faq-quick-qs { padding: 12px 16px 0; display: flex; flex-wrap: wrap; gap: 7px; background: #F8FAFF; }
.faq-quick-btn { background: #fff; border: 1.5px solid #BFDBFE; color: #1565C0; border-radius: 18px; padding: 6px 14px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'Hind', sans-serif; transition: all 0.2s; }
.faq-quick-btn:hover { background: #EEF4FF; border-color: #1565C0; }

/* Chat input */
.faq-chat-input-bar { padding: 12px 14px; display: flex; gap: 9px; align-items: center; border-top: 1px solid #EEF2FF; background: #fff; }
.faq-chat-input { flex: 1; border: 1.5px solid #CBD5E1; border-radius: 22px; padding: 10px 18px; font-size: 13.5px; font-family: 'Hind', sans-serif; outline: none; background: #F8FAFC; transition: all 0.2s; }
.faq-chat-input:focus { border-color: #1565C0; background: #fff; box-shadow: 0 0 0 3px rgba(21,101,192,0.1); }
.faq-send-btn { width: 40px; height: 40px; border-radius: 50%; border: none; background: linear-gradient(135deg,#1565C0,#1E88E5); color: #fff; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
.faq-send-btn:hover { transform: scale(1.1); box-shadow: 0 4px 12px rgba(21,101,192,0.35); }
`;

const QUICK_QS = [
  "What is OTR?",
  "What documents needed?",
  "How to register?",
  "Last date to apply?",
  "Forgot OTR number?",
  "How to check status?",
];

const TAGS = ["All", "Registration", "Documents", "Deadlines", "Application", "Institute", "Payment"];

export default function FAQSection() {
  const [openIdx,   setOpenIdx]   = useState(null);
  const [tagFilter, setTagFilter] = useState("All");
  const [messages,  setMessages]  = useState([
    { from:"bot", text:"Vanakkam! 👋 I'm your NSP Scholarship Assistant.\n\nAsk me anything about the scholarship process — I work offline too! 📱\n\nTry asking: 'What is OTR?' or 'What documents do I need?'" }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const handleSend = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput("");
    setMessages(p => [...p, { from:"user", text: msg }]);
    // slight delay for natural feel
    setTimeout(() => {
      const reply = getOfflineResponse(msg);
      setMessages(p => [...p, { from:"bot", text: reply }]);
    }, 600);
  };

  const filteredFAQ = tagFilter === "All"
    ? SCHOLARSHIP_FAQ
    : SCHOLARSHIP_FAQ.filter(f => f.tag === tagFilter);

  return (
    <div className="faq-wrap">
      <style>{CSS}</style>

      {/* FAQ Accordion */}
      <div className="faq-section-title">❓ Frequently Asked Questions</div>
      <div className="faq-section-sub">Common questions about NSP scholarship application — click any question to see the answer.</div>

      <div className="faq-tags">
        {TAGS.map(t => (
          <button key={t} className={`faq-tag ${tagFilter===t?"active":"inactive"}`} onClick={()=>setTagFilter(t)}>{t}</button>
        ))}
      </div>

      <div className="faq-list">
        {filteredFAQ.map((faq, i) => (
          <div key={i} className={`faq-item ${openIdx===i?"open":""}`}>
            <div className="faq-q" onClick={()=>setOpenIdx(openIdx===i?null:i)}>
              <div className="faq-q-text">{faq.q}</div>
              <span className="faq-tag-badge">{faq.tag}</span>
              <div className="faq-chevron">▼</div>
            </div>
            {openIdx === i && (
              <div className="faq-a">{faq.a}</div>
            )}
          </div>
        ))}
      </div>

      {/* Offline Chatbot */}
      <div className="faq-section-title" style={{marginBottom:6}}>🤖 Ask the Assistant</div>
      <div className="faq-section-sub" style={{marginBottom:20}}>
        Ask any scholarship question in your own words — works offline too! No internet needed.
      </div>

      <div className="faq-chat-box">
        <div className="faq-chat-header">
          <div className="faq-chat-av">🤖</div>
          <div>
            <div className="faq-chat-hname">NSP Scholarship Assistant</div>
            <div className="faq-chat-hstatus"><span className="faq-online-dot"/>Always Available</div>
          </div>
          <div className="faq-offline-badge">📱 Works Offline</div>
        </div>

        {/* Quick question buttons */}
        <div className="faq-quick-qs">
          {QUICK_QS.map((q,i) => (
            <button key={i} className="faq-quick-btn" onClick={() => handleSend(q)}>
              {q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="faq-messages">
          {messages.map((m, i) => (
            <div key={i} className={`faq-msg ${m.from}`}>
              <div className={`faq-msg-av ${m.from==="bot"?"faq-bot-av":"faq-user-av"}`}>
                {m.from==="bot" ? "🤖" : "👤"}
              </div>
              <div className="faq-bubble">{m.text}</div>
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>

        {/* Input */}
        <div className="faq-chat-input-bar">
          <input
            className="faq-chat-input"
            placeholder="Type your question here…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key==="Enter" && handleSend()}
          />
          <button className="faq-send-btn" onClick={() => handleSend()}>➤</button>
        </div>
      </div>
    </div>
  );
}