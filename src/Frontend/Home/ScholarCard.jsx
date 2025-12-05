import * as React from "react";

interface ScholarCardProps {
  name: string;
  imageUrl: string;
}

export function ScholarCard({ name, imageUrl }: ScholarCardProps) {
  const styles = {
    root: { display: "flex", flexDirection: "column", flex: "auto", padding: "20px", background: "#fff", alignItems: "center" },
    img: { objectFit: "contain", width: 100, height: "auto" },
    name: { marginTop: 12 },
  };

  return (
    <div style={styles.root}>
      <img src={imageUrl} alt={`${name} photo`} style={styles.img} />
      <p style={styles.name}>{name}</p>
    </div>
  );
}
