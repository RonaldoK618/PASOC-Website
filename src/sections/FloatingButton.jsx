import * as React from "react";

export function FloatingButton() {
  const styles = {
    button: {
      position: "fixed",
      bottom: 32,
      right: 32,
      alignSelf: "flex-start",
      marginTop: 8,
      fontSize: 28,
      fontWeight: 600,
      textAlign: "center",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      zIndex: 50,
    },
    bigCircle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 55,
      height: 55,
      borderRadius: 9999,
      background: "#84A44D",
      border: "5px solid #525252",
      color: "#f8fafc",
    },
    text: {
      color: "#f8fafc",
      fontSize: 22,
      margin: 0,
    },
  };

  return (
    <button style={styles.button} aria-label="More info">
      <div style={styles.bigCircle}>
        <span style={styles.text}>?</span>
      </div>
    </button>
  );
}
