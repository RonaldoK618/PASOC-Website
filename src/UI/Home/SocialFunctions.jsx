import * as React from "react";

interface SocialFunctionItemProps {
  number: string;
  description: string;
}

function SocialFunctionItem({ number, description }: SocialFunctionItemProps) {
  const styles = {
    root: { width: "100%", maxWidth: 976, color: "#27272a" },
    row: { display: "flex-row", gap: 16, alignItems: "flex-start", padding: "8px 12px 18px", borderBottom: "3px solid #27272a", borderRadius: 12 },
    badge: { display: "flex", alignItems: "center", justifyContent: "center", padding: 8, background: "#facc15", borderRadius: "9999px", border: "1px solid #27272a", width: 50, height: 50, boxSizing: "border-box" },
    desc: { flex: "1 1 100%", alignSelf: "center", minWidth: 200 },
  };

  return (
    <div style={styles.root}>
      <div style={styles.row}>
        <div style={styles.badge}>
          <span>{number}</span>
        </div>
        <div style={styles.desc}>{description}</div>
      </div>
    </div>
  );
}

export function SocialFunctions() {
  const styles = {
    section: { display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", marginLeft: "auto", marginRight: "auto", maxWidth: 1350 },
    intro: { fontSize: 20, color: "#000" },
    heading: { marginTop: 28, marginLeft: 8, fontSize: 28, color: "#556B2F", textDecoration: "underline", fontFamily: "'Instrument Serif', serif", },
    contentRow: { display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", marginTop: 16, width: "100%", maxWidth: 750 },
    leftCol: { flex: "1 1 60%", minWidth: 280, fontSize: 20 },
    spacer: { marginTop: 48 },
    infoBox: { padding: "12px", marginTop: 28, marginLeft: "auto", marginRight: "auto", borderBottom: "3px solid #000", borderRadius: 8, width: "100%", maxWidth: 1350, fontSize: 20, color: "#000" },
  };

  return (
    <section style={styles.section}>
      <p style={styles.intro}>
        Take a glimpse of what Pangasinenses here in Calgary have been doing,
        joining forces in reaching out to the less fortunate as well as
        embodied the strong family spirit through these functions.
      </p>

      <h3 style={styles.heading}>Our Three Social Functions</h3>

      <div style={styles.contentRow}>
        <div style={styles.leftCol}>
          <SocialFunctionItem number="1" description="Summer Picnic tentatively scheduled during the first Saturday of Stampede" />
          <div style={styles.spacer}>
            <SocialFunctionItem number="2" description="Annual Camping normally scheduled on any week-end in August" />
          </div>
          <div style={styles.spacer}>
            <SocialFunctionItem number="3" description="The Dinner and Dance Christmas Celebration every December" />
          </div>
        </div>
      </div>

      <div style={styles.infoBox}>
        <p>
          This is also the portal of of the daring ones. PASOC has
          successfully dared to venture where others have failed to tread.
          This is the organization where leaders are groomed, trained, honed
          and tested. Three past and present Presidents of this prestigious
          organization became President of CAFFA, the umbrella group of the
          many different Filipino associations in the city. They are: Albeo
          Baquiran (1996-97), Gregorio Lacuata (2002-03) and Francisco
          Siapno (2004-05). It just proved that PASOC produces quality
          leaders.What's the secret behind this success? Come and see our
          site, and you will see that it is engraved at an early age in the
          hearts of the youngsters.
        </p>
      </div>
    </section>
  );
}
