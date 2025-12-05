import * as React from "react";

interface GalleryImageProps {
  src: string;
  alt: string;
  title: string;
  date: string;
  aspectRatio: string;
}

function GalleryImage({ src, alt, title, date, aspectRatio }: GalleryImageProps) {
  const styles = {
    root: { display: "flex", flexDirection: "column" },
    img: { objectFit: "contain", width: "100%", boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", marginTop: 10 },
    meta: { display: "flex", flexDirection: "column", marginTop: 12, fontSize: 20, color: "#000", textAlign: "center" },
    date: { marginTop: 12 },
  };

  return (
    <div style={styles.root}>
      <img src={src} alt={alt} style={styles.img} />
      <div style={styles.meta}>
        <p>{title}</p>
        <p style={styles.date}>{date}</p>
      </div>
    </div>
  );
}

export function GallerySection() {
  const styles = {
    section: { padding: "0 6.75vw", maxWidth: 1350, marginLeft: "auto", marginRight: "auto" },
    heading: { marginTop: 48, marginLeft: 12, fontSize: 28, color: "#556B2F", textDecoration: "underline", fontFamily: "'Instrument Serif', serif", },
    wrapper: { padding: "16px", marginTop: 16, width: "100%", borderRadius: 24, borderBottom: "3px solid #000", backgroundColor: "#84A44D", maxWidth: 1350, marginLeft: "auto", marginRight: "auto" },
    row: { display: "flex", gap: 16, flexWrap: "wrap" },
    col: { flex: "1 1 30%", minWidth: 220 },
  };

  return (
    <section style={styles.section}>
      <h3 style={styles.heading}>Click here to view the Gallery</h3>
      <div style={styles.wrapper}>
        <div style={styles.row}>
          <div style={styles.col}>
            <GalleryImage
              src="https://api.builder.io/api/v1/image/assets/TEMP/74f8595833948997ac27fac9cbea4be3b857a31d?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
              alt="ZUMBA FRIDAY event"
              title="ZUMBA FRIDAY!"
              date="Jan 24, 2025"
              aspectRatio="aspect-[1.46]"
            />
          </div>
          <div style={styles.col}>
            <GalleryImage
              src="https://api.builder.io/api/v1/image/assets/TEMP/286d30f5302870c2585ffbd218ad49710d60141f?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
              alt="Picnic event from 2012"
              title="Picnic"
              date="2012"
              aspectRatio="aspect-[1.33]"
            />
          </div>
          <div style={styles.col}>
            <GalleryImage
              src="https://api.builder.io/api/v1/image/assets/TEMP/db5cafbfa8f5042351ffe8a51a8dbbd091e92a7c?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
              alt="Youth Basketball Tournament from 2008"
              title="Youth Basketball Tournament"
              date="2008"
              aspectRatio="aspect-[1.51]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}