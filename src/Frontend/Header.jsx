"use client";
import * as React from "react";

export function Header() {
  const [hoveredNav, setHoveredNav] = React.useState(null);

  const styles = {
    header: {
      display: "flex",
      zIndex: 10,
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 24px 0",
      backgroundColor: "#f5f5f4",
      boxShadow: "0px 6px 10px rgba(0,0,0,0.25)",
    },
    container: {
      width: "100%",
      maxWidth: 1920,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
    },
    topRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
    },
    brandRow: {
      display: "flex",
      gap: 16,
      alignItems: "center",
      flex: 1,
      minWidth: 0,
    },
    logo: {
      width: "100%",
      maxWidth: 167,
      height: "auto",
      objectFit: "contain",
    },
    title: {
      fontSize: "2rem",
      margin: 0,
      color: "#000",
    },
    actions: {
      display: "flex",
      gap: 14,
      alignItems: "center",
      color: "#71717a",
    },
    searchBox: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 10px",
      borderRadius: 12,
      border: "2px solid #3f3f46",
      background: "#e5e7eb",
      width: 350,
      cursor: "pointer",
    },
    profile: { 
      width: 40, 
      height: 40, 
      objectFit: "contain", 
      marginRight: 20,
      cursor: "pointer",
      transition: "transform 0.2s ease",
    },
    profileLink: {
      display: "inline-block",
      textDecoration: "none",
    },
    nav: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: 16,
      width: "100%",
      fontSize: 20,
      fontWeight: 700,
      color: "#556B2F",
    },
    navItem: (isHovered) => ({
      whiteSpace: "nowrap",
      flex: "1 1 11.58%",
      padding: "10px 0",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: isHovered ? "#556B2F" : "transparent",
      color: isHovered ? "#FFFFFF" : "#556B2F",
      transition: "all 0.2s ease",
      textDecoration: "none",
      display: "block",
    }),
  };

  const handleDonateClick = (e) => {
    e.preventDefault();
    window.location.href = "/donate";
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    window.location.href = "/login";
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  const handleNavClick = (path) => (e) => {
    e.preventDefault();
    window.location.href = path;
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.topRow}>
          <div style={styles.brandRow}>
            <div style={{ width: "100%", maxWidth: 167 }}>
              <a href="/" onClick={handleLogoClick} style={{ textDecoration: "none" }}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/59857bbe636f97ab4cebcfbc3ad030ee40910eb4?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
                  alt="PASOC Logo"
                  style={styles.logo}
                />
              </a>
            </div>
            <div style={{ marginLeft: 12 }}>
              <h1 style={styles.title}>Pangasinan Society of Calgary</h1>
            </div>
          </div>

          <div style={styles.actions}>
            <div style={styles.searchBox}>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/43c90e6719ee112affadf8787f9265d66ed1c0c1?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
                alt="Search icon"
                style={{ width: 24, height: 24 }}
              />
              <span>Search PASOC</span>
            </div>
            <a 
              href="/login" 
              onClick={handleLoginClick}
              style={styles.profileLink}
              title="Login"
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/a97a9aea0d43bd1371ad3d9d7eba97da549becf9?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
                alt="User profile"
                style={styles.profile}
              />
            </a>
          </div>
        </div>

        <nav style={styles.nav}>
          <a
            href="/"
            onClick={handleHomeClick}
            style={styles.navItem(hoveredNav === "home")}
            onMouseEnter={() => setHoveredNav("home")}
            onMouseLeave={() => setHoveredNav(null)}
          >
            Home
          </a>
          <div
            style={styles.navItem(hoveredNav === "motion")}
            onMouseEnter={() => setHoveredNav("motion")}
            onMouseLeave={() => setHoveredNav(null)}
          >
            PASOC in Motion
          </div>
          <div
            style={styles.navItem(hoveredNav === "news")}
            onMouseEnter={() => setHoveredNav("news")}
            onMouseLeave={() => setHoveredNav(null)}
          >
            News
          </div>
          <div
            style={styles.navItem(hoveredNav === "events")}
            onMouseEnter={() => setHoveredNav("events")}
            onMouseLeave={() => setHoveredNav(null)}
          >
            Events
          </div>
          <div
            style={styles.navItem(hoveredNav === "about")}
            onMouseEnter={() => setHoveredNav("about")}
            onMouseLeave={() => setHoveredNav(null)}
          >
            About Us
          </div>
          <a
            href="/donate"
            onClick={handleDonateClick}
            style={styles.navItem(hoveredNav === "donate")}
            onMouseEnter={() => setHoveredNav("donate")}
            onMouseLeave={() => setHoveredNav(null)}
          >
            Donate
          </a>
        </nav>
      </div>
    </header>
  );
}