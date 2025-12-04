import * as React from "react";

export function NewsSection() {
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
    article: {
      padding: "16px",
      paddingTop: 24,
      paddingBottom: 44,
      marginTop: 8,
      borderBottom: "4px solid #000",
      borderRadius: 24,
      width: "100%",
      maxWidth: 1120,
      marginLeft: "auto",
      marginRight: "auto",
    },
    row: { display: "flex", gap: 16, flexWrap: "wrap" },
    content: { flex: 3, minWidth: 260 },
    heading: { fontSize: 28, color: "#84A44D", textDecoration: "underline", margin: 0 },
    paragraph: { marginTop: 12, fontSize: 18, color: "#000", lineHeight: 1.5 },
    imageWrap: { flex: 1, minWidth: 200, display: "flex", justifyContent: "center", alignItems: "flex-start" },
    image: { width: "100%", maxWidth: 335, height: "auto", objectFit: "contain", marginTop: 20 },
  };

  return (
    <section style={styles.section}>
      <div style={styles.titleBar}>
        <h3 style={{ margin: 0, textAlign: "center" }}>Recent News</h3>
        <div aria-hidden="true">&lt; &gt;</div>
      </div>

      <article style={styles.article}>
        <div style={styles.row}>
          <div style={styles.content}>
            <div>
              <h4 style={styles.heading}>2013 - 2014 PRESIDENT'S PROFILE</h4>
              <p style={styles.paragraph}>
                A versatile community leader par excellence and has been
                serving the Filipino-Canadian community for over 25 years.
                He is currently working as a Power Engineer in Calgary, AB.
                Prior to his sojourn to Canada, he worked for Meralco
                Industrial Engineering Services Corporation as a mechanical
                engineer.He is a naturalized Canadian citizen having been
                born in Manaoag, Pangasinan, Philippines. He migrated to
                Canada in 1982. The ex-seminarian was at the Mary Help of
                Christians Seminary in the Philippines. He obtained his
                Bachelor's Degree in Mechanical Engineering also in the
                Philippines.
                <br />
                The outstanding, dynamic professional engineer turned
                community leader is, a mentor and a role model, serving the
                community at-large in Calgary area. His passion to serve
                people actually started since his grade school years. His
                father, the late Judge Jovencio Mejia Bautista impacted his
                life when he became a government official of his hometown.
                His mother, Marietta Sta. Maria Tiong inspired his
                aspirations with her support to the late Judge with love and
                devotion to public service. (Read More...)
              </p>
            </div>
          </div>

          <div style={styles.imageWrap}>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/3f46141b4606b537fc399765054ec99aac08a77f?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
              alt="President profile photo"
              style={styles.image}
            />
          </div>
        </div>
      </article>
    </section>
  );
}
