import { useState } from "react";

function ProgressDots(props) {
  var total = props.total;
  var current = props.current;
  var onDotClick = props.onDotClick;
  var dots = [];
  for (var i = 0; i < total; i++) {
    (function(idx) {
      dots.push(
        <div
          key={idx}
          onClick={function() { onDotClick(idx); }}
          style={{
            width: idx === current ? 28 : 10,
            height: 10,
            borderRadius: 5,
            background: idx < current ? "#38a169" : idx === current ? "#1a3a5c" : "#e2e8f0",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          title={"Step " + (idx + 1)}
        />
      );
    })(i);
  }
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", marginBottom: 32 }}>
      {dots}
    </div>
  );
}

function Lightbox(props) {
  if (!props.src) return null;
  return (
    <div
      onClick={props.onClose}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999, cursor: "zoom-out",
        padding: 20
      }}
    >
      <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
        <img
          src={props.src}
          alt={props.alt || ""}
          style={{
            maxWidth: "90vw",
            maxHeight: "85vh",
            borderRadius: 12,
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)"
          }}
        />
        <div style={{
          position: "absolute", top: -40, right: 0,
          color: "#fff", fontSize: 14, fontWeight: 600, opacity: 0.7
        }}>
          Click anywhere to close
        </div>
      </div>
    </div>
  );
}

function ScreenImage(props) {
  return (
    <div
      onClick={function() { props.onOpen(props.src, props.alt); }}
      style={{
        position: "relative", borderRadius: 10, overflow: "hidden",
        border: "1px solid #e2e8f0", cursor: "zoom-in",
        marginBottom: props.mb || 0
      }}
    >
      <img
        src={props.src}
        alt={props.alt}
        style={{ width: "100%", display: "block" }}
      />
      <div style={{
        position: "absolute", bottom: 8, right: 8,
        background: "rgba(0,0,0,0.6)", color: "#fff",
        fontSize: 11, fontWeight: 600, padding: "4px 10px",
        borderRadius: 6, display: "flex", alignItems: "center", gap: 4
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Click to enlarge
      </div>
    </div>
  );
}

function StepCard(props) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      padding: "32px 28px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      maxWidth: 480,
      width: "100%",
      minHeight: 320,
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
        {"Step " + props.stepNum + " of " + props.totalSteps}
      </div>
      <h2 style={{ margin: "0 0 12px 0", fontSize: 22, fontWeight: 700, color: "#1a202c", lineHeight: 1.3 }}>
        {props.title}
      </h2>
      <p style={{ margin: "0 0 20px 0", fontSize: 15, color: "#4a5568", lineHeight: 1.7, flex: 1 }}>
        {props.description}
      </p>
      {props.children}
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        {props.onBack && (
          <button
            onClick={props.onBack}
            style={{
              padding: "14px 24px", borderRadius: 12, border: "2px solid #e2e8f0",
              background: "#fff", color: "#4a5568", fontSize: 15, fontWeight: 600,
              cursor: "pointer", flex: 1
            }}
          >
            Back
          </button>
        )}
        <button
          onClick={props.onNext}
          style={{
            padding: "14px 24px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg, #1a3a5c, #2d6ca6)",
            color: "#fff", fontSize: 15, fontWeight: 700,
            cursor: "pointer", flex: 1,
            boxShadow: "0 4px 14px rgba(26,58,92,0.25)"
          }}
        >
          {props.nextLabel || "Next"}
        </button>
      </div>
    </div>
  );
}

export default function KlaviyoAccess() {
  var stepState = useState(0);
  var step = stepState[0];
  var setStep = stepState[1];

  var copiedState = useState(false);
  var copied = copiedState[0];
  var setCopied = copiedState[1];

  var lightboxState = useState(null);
  var lightboxImg = lightboxState[0];
  var setLightboxImg = lightboxState[1];

  var email = "LPEmailAudit@logicalposition.com";
  var totalSteps = 6;

  function goNext() { setStep(step + 1); }
  function goBack() { setStep(step - 1); }

  function copyEmail() {
    try { navigator.clipboard.writeText(email); } catch (e) {}
    setCopied(true);
    setTimeout(function () { setCopied(false); }, 2500);
  }

  function openLightbox(src, alt) {
    setLightboxImg({ src: src, alt: alt });
  }

  function closeLightbox() {
    setLightboxImg(null);
  }

  if (step >= totalSteps) {
    return (
      <div style={{ minHeight: "100vh", background: "#f7fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center", background: "#fff", borderRadius: 16, padding: "48px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, #38a169, #2f855a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px", color: "#fff"
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 style={{ margin: "0 0 12px 0", fontSize: 26, fontWeight: 700, color: "#1a202c" }}>
            You are all set!
          </h2>
          <p style={{ margin: "0 0 8px 0", fontSize: 16, color: "#4a5568", lineHeight: 1.7 }}>
            Thank you for granting access. We have been notified and will accept the invitation shortly.
          </p>
          <p style={{ margin: 0, fontSize: 14, color: "#a0aec0", lineHeight: 1.6 }}>
            You do not need to do anything else. If you have questions, contact your Logical Position representative.
          </p>
        </div>
        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <img src="https://www.logicalposition.com/img/logos/lp-logo-white-horizontal.svg" alt="Logical Position" style={{ height: 18, filter: "brightness(0)" }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7fafc", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>

      {lightboxImg && (
        <Lightbox src={lightboxImg.src} alt={lightboxImg.alt} onClose={closeLightbox} />
      )}

      <div style={{ width: "100%", background: "linear-gradient(135deg, #1a3a5c 0%, #2d6ca6 100%)", padding: "28px 20px 36px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <img src="https://www.logicalposition.com/img/logos/lp-logo-white-horizontal.svg" alt="Logical Position" style={{ height: 28 }} />
        </div>
        <h1 style={{ margin: "0 0 8px 0", fontSize: 24, fontWeight: 800, color: "#fff" }}>
          Grant Klaviyo Access
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
          Follow the steps below to share view-only access with our team.
        </p>
      </div>

      <div style={{ padding: "32px 20px 40px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ProgressDots total={totalSteps} current={step} onDotClick={setStep} />

        {step === 0 && (
          <StepCard stepNum={1} totalSteps={totalSteps} title="Log in to Klaviyo" description="Open a new tab and sign in with the account credentials for the Klaviyo account you would like to share with us." onNext={goNext} nextLabel="I am logged in">
            <a href="https://www.klaviyo.com/login" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 20px", borderRadius: 10, background: "#111", color: "#fff",
              fontSize: 14, fontWeight: 600, textDecoration: "none", marginBottom: 16
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Open klaviyo.com
            </a>
            <div style={{ padding: "14px 16px", background: "#f0f7ff", borderRadius: 10, borderLeft: "3px solid #2d6ca6", fontSize: 13, color: "#2d5f8a", lineHeight: 1.6 }}>
              <strong>Note:</strong> You need to be an Owner or Admin on the Klaviyo account to add users. If you are unsure, proceed to the next step and you will find out.
            </div>
          </StepCard>
        )}

        {step === 1 && (
          <StepCard stepNum={2} totalSteps={totalSteps} title="Open your account Settings" description="Click your account name in the bottom-left corner of the Klaviyo dashboard. Then click Settings from the menu that appears." onBack={goBack} onNext={goNext} nextLabel="Done">
            <ScreenImage src="/images/klaviyo-homepage.png" alt="Klaviyo Homepage - click Settings in bottom-left" onOpen={openLightbox} />
          </StepCard>
        )}

        {step === 2 && (
          <StepCard stepNum={3} totalSteps={totalSteps} title="Click Users in the sidebar" description="On the Settings page, find Users in the left sidebar and click it. This will show you the list of current users on the account." onBack={goBack} onNext={goNext} nextLabel="I see the Users page">
            <ScreenImage src="/images/step3-users.png" alt="Click Users in sidebar" onOpen={openLightbox} mb={12} />
            <div style={{ padding: "14px 16px", background: "#f0f7ff", borderRadius: 10, borderLeft: "3px solid #2d6ca6", fontSize: 13, color: "#2d5f8a", lineHeight: 1.6 }}>
              <strong>Do not see Users?</strong> You may not have Admin or Owner access. Please forward this link to the person who originally created your Klaviyo account.
            </div>
          </StepCard>
        )}

        {step === 3 && (
          <StepCard stepNum={4} totalSteps={totalSteps} title="Click Add User" description="On the Users page, you will see an Add User button. Click it to open the invitation form." onBack={goBack} onNext={goNext} nextLabel="The form is open">
            <ScreenImage src="/images/step4-add-user.png" alt="Click Add User button" onOpen={openLightbox} />
          </StepCard>
        )}

        {step === 4 && (
          <StepCard stepNum={5} totalSteps={totalSteps} title="Enter our details" description="Copy the email address below and paste it into the email field. Then select the Analyst role from the role dropdown." onBack={goBack} onNext={goNext} nextLabel="Details entered">
            <div
              onClick={copyEmail}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                background: copied ? "#f0fff4" : "#f7fafc",
                border: copied ? "2px solid #38a169" : "2px solid #e2e8f0",
                borderRadius: 10, padding: "14px 16px", cursor: "pointer",
                marginBottom: 10, transition: "all 0.2s"
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>Email address</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1a202c", fontFamily: "monospace", wordBreak: "break-all" }}>{email}</div>
              </div>
              <div style={{
                padding: "8px 16px", borderRadius: 8, border: "none",
                background: copied ? "#38a169" : "#2d6ca6", color: "#fff",
                fontSize: 13, fontWeight: 600, whiteSpace: "nowrap"
              }}>
                {copied ? "Copied!" : "Copy"}
              </div>
            </div>
            <div style={{
              display: "flex", alignItems: "center",
              background: "#f7fafc", border: "2px solid #e2e8f0",
              borderRadius: 10, padding: "14px 16px"
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#a0aec0", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>Role to select</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1a202c" }}>Analyst</div>
              </div>
              <div style={{ padding: "5px 12px", borderRadius: 6, background: "#ebf8ff", color: "#2d6ca6", fontSize: 12, fontWeight: 700 }}>
                View-only
              </div>
            </div>
          </StepCard>
        )}

        {step === 5 && (
          <StepCard stepNum={6} totalSteps={totalSteps} title="Send the invitation" description="Click Send Invitation in Klaviyo. We will receive the invite on our end and accept it right away. You are done!" onBack={goBack} onNext={goNext} nextLabel="I have sent the invitation">
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 140, padding: "14px 16px", background: "#f0fff4", borderRadius: 10, textAlign: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 4 }}>
                  <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="#38a169" strokeWidth="2" />
                  <path d="M9 12l2 2 4-4" stroke="#38a169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#276749" }}>View-only access</div>
                <div style={{ fontSize: 11, color: "#68d391" }}>We cannot make changes</div>
              </div>
              <div style={{ flex: 1, minWidth: 140, padding: "14px 16px", background: "#f0f7ff", borderRadius: 10, textAlign: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 4 }}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" stroke="#2d6ca6" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" stroke="#2d6ca6" strokeWidth="2" />
                </svg>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#2d5f8a" }}>You stay in control</div>
                <div style={{ fontSize: 11, color: "#90cdf4" }}>Remove us anytime</div>
              </div>
            </div>
          </StepCard>
        )}

        <div style={{ marginTop: 40, textAlign: "center", color: "#a0aec0", fontSize: 12 }}>
          <p style={{ margin: "0 0 4px 0" }}>Questions? Contact your Logical Position representative.</p>
          <p style={{ margin: 0 }}>Powered by Logical Position</p>
        </div>
      </div>
    </div>
  );
}
