import * as React from "react";

export function HeroSection() {
  const styles = {
    section: { position: "relative", display: "flex", flexDirection: "column", width: "100%", minHeight: 526 },
    bgImage: { objectFit: "cover", position: "absolute", inset: 0, width: "100%", height: "100%" },
    gradientOverlay: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(to right, rgba(132, 164, 77, 5), transparent)", zIndex: 0 },
    overlay: { position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "32px", zIndex: 1 },
    container: { maxWidth: 834 },
    heading: { fontSize: 48, color: "#fff", margin: 0, padding: 8, fontFamily: "'Instrument Serif', serif", paddingLeft: 100 },
    actions: { display: "flex", flexWrap: "wrap", gap: 16, marginTop: 28, maxWidth: 684, fontSize: 20, fontWeight: 600, color: "#000" },
    button: { display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 32px", borderRadius: 24, background: "#f3f4f6", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", cursor: "pointer" },
  };

  return (
    <section style={styles.section}>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/40671902fc11001c38c8e27b20ebb110846d19b4?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
        alt="PASOC community gathering"
        style={styles.bgImage}
      />
      <div style={styles.gradientOverlay}></div>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Welcome to PASOC!</h2>
          <div style={styles.actions}>
            <button style={styles.button}>Become a Member</button>
            <button style={styles.button}>Guest Form</button>
          </div>
        </div>
      </div>
    </section>
  );
}
