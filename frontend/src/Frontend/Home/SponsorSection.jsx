import * as React from "react";

export function SponsorSection() {
  const styles = {
    section: { padding: "16px", marginTop: 32, width: "100%", maxWidth: 1350, background: "#fff", borderRadius: 24, boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", boxSizing: "border-box", alignSelf: "center" },
    row: { display: "flex", gap: 16, flexWrap: "wrap" },
    leftCol: { flex: "0 0 18%", minWidth: 160 },
    leftInner: { display: "flex", flexDirection: "column", alignItems: "flex-start" },
    adBox: { display: "flex", alignItems: "center", justifyContent: "center", padding: 12, marginTop: 8, borderRadius: 24, border: "5px solid #84A44D", width: 140, height: 140, boxSizing: "border-box" },
    adImg: { width: 127, height: "auto", objectFit: "contain" },
    leftText: { marginTop: 12, fontSize: 18, letterSpacing: 2 },
    rightCol: { flex: "1 1 70%", minWidth: 260 },
    sponsorRow: { display: "flex", gap: 16, alignItems: "flex-start" },
    sponsorTitle: { fontSize: 32, color: "#000", textDecoration: "underline", margin: 0 },
    sponsorEvent: { marginTop: 12, fontSize: 20 },
    aboutBox: { display: "flex", flexDirection: "column", padding: 16, marginTop: 24, backgroundColor: "rgba(250, 204, 21, 0.8)", paddingBottom: 64, fontSize: 20 },
  };

  return (
    <section style={styles.section}>
      <div style={styles.row}>
        <div style={styles.leftCol}>
          <div style={styles.leftInner}>
            <h4 style={{ fontSize: 20, color: "#000", margin: 0 }}>Sponsor AD</h4>
            <div style={styles.adBox}>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/b6a90ffd903072fd00e41bcad002e4e5c6ed858c?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
                alt="Sponsor logo"
                style={styles.adImg}
              />
            </div>
            <p style={styles.leftText}>Photo or Logo</p>
          </div>
        </div>

        <div style={styles.rightCol}>
          <div>
            <div style={styles.sponsorRow}>
              <h4 style={styles.sponsorTitle}>Sponsor Name</h4>
              <p style={styles.sponsorEvent}>Event Sponsored</p>
            </div>

            <div style={styles.aboutBox}>
              <p style={{ margin: 0 }}>About Sponsor</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
