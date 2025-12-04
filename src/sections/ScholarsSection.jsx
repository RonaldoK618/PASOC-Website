import * as React from "react";
import { ScholarCard } from "./ScholarCard";

export function ScholarsSection() {
  const scholarImageUrl = "https://api.builder.io/api/v1/image/assets/TEMP/6da362f7a787ec4fd6ab0ecc61c5d82a44859d9b?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d";
  const styles = {
    section: { padding: "0 6.75vw" },
    titleBar: {
      display: "flex",
      gap: 16,
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 16px",
      marginTop: 48,
      maxWidth: 333,
      backgroundColor: "#facc15",
      borderRadius: 24,
      fontSize: 20,
      fontWeight: 700,
      color: "#000",
    },
    article: { padding: "16px", paddingTop: 20, paddingBottom: 32, marginTop: 8, borderBottom: "3px solid #000", borderRadius: 24, width: "100%", maxWidth: 1120, marginLeft: "auto", marginRight: "auto" },
    row: { display: "flex", gap: 16, flexWrap: "wrap" },
    mainCol: { flex: "4 1 60%", minWidth: 300 },
    sideCol: { flex: "1 1 25%", minWidth: 200 },
    heading: { fontSize: 28, color: "#84A44D", textDecoration: "underline", margin: 0 },
    paragraph: { marginTop: 14, fontSize: 18, color: "#000" },
    cards: { display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 },
    sideCardWrap: { display: "flex", justifyContent: "flex-end" },
    sideCard: { background: "#fff", padding: 16, width: 214, boxSizing: "border-box" },
    sideImg: { width: "100%", objectFit: "contain" },
    infoBox: { display: "flex", flexDirection: "column", justifyContent: "center", padding: 16, marginTop: 32, borderBottom: "3px solid #000", borderRadius: 12, maxWidth: 1120, marginLeft: "auto", marginRight: "auto", fontSize: 18, color: "#000" },
  };

  return (
    <section style={styles.section}>
      <div style={styles.titleBar}>
        <h3 style={{ margin: 0, textAlign: "center" }}>Scholars</h3>
        <div>&lt; &gt;</div>
      </div>

      <div style={styles.article}>
        <div style={styles.row}>
          <div style={styles.mainCol}>
            <div>
              <h4 style={styles.heading}>2025 Scholarship Awardees</h4>
              <p style={styles.paragraph}>Congrats to Scholar 1, Scholar 2, Scholar 3, Scholar 4, Scholar 5, Scholar 6, Scholar 7</p>
              <div style={styles.cards}>
                <ScholarCard name="Scholar Name" imageUrl={scholarImageUrl} />
                <ScholarCard name="Scholar Name" imageUrl={scholarImageUrl} />
                <ScholarCard name="Scholar Name" imageUrl={scholarImageUrl} />
                <ScholarCard name="Scholar Name" imageUrl={scholarImageUrl} />
                <ScholarCard name="Scholar Name" imageUrl={scholarImageUrl} />
                <ScholarCard name="Scholar Name" imageUrl={scholarImageUrl} />
              </div>
            </div>
          </div>

          <div style={styles.sideCol}>
            <div style={styles.sideCardWrap}>
              <div style={styles.sideCard}>
                <img src={scholarImageUrl} alt="Scholar photo" style={styles.sideImg} />
                <p style={{ textAlign: "center", marginTop: 12 }}>Scholar Name</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.infoBox}>
        <p>
          The Pangasinan Society of Calgary (PASOC) offers scholarship to
          children (General Public) who are now enrolled or are planning to
          enroll in any post secondary school in Calgary.
          <br />
          <br />
          Academic achievement and financial needs are the main criteria of
          this award; however, consideration is given to applicant's
          community involvement, extra-curricular activities, leadership
          skills, character integrity, motivational and personal goals.
        </p>
      </div>
    </section>
  );
}