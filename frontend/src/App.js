"use client";
import * as React from "react";
import { HeroSection } from "./Frontend/Home/HeroSection";
import { SocialFunctions } from "./Frontend/Home/SocialFunctions";
import { SponsorSection } from "./Frontend/Home/SponsorSection";
import { NewsSection } from "./Frontend/Home/NewsSection";
import { ScholarsSection } from "./Frontend/Home/ScholarsSection";
import { GallerySection } from "./Frontend/Home/GallerySection";
import { FloatingButton } from "./Frontend/FloatingButton";
import './App.css';


function App() {
  return (
    <div style={{ backgroundColor: "#F8F3EF" }}>
      <FloatingButton />
      <div style={{ backgroundColor: "#F8F3EF", display: "flex", flexDirection: "column", marginTop: 4 }}>
        <HeroSection />
        <main style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          margin: "20px auto 0",
          width: "100%",
          maxWidth: 1720
        }}>
          <SocialFunctions />
          <SponsorSection />
          <NewsSection />
          <ScholarsSection />
          <GallerySection />
        </main>
      </div>
    </div>
  );
}

export default App;

