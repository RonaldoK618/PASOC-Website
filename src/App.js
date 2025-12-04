"use client";
import * as React from "react";
import { HeroSection } from "./sections/HeroSection";
import { SocialFunctions } from "./sections/SocialFunctions";
import { SponsorSection } from "./sections/SponsorSection";
import { NewsSection } from "./sections/NewsSection";
import { ScholarsSection } from "./sections/ScholarsSection";
import { GallerySection } from "./sections/GallerySection";
import { FloatingButton } from "./sections/FloatingButton";

function App() {
  return (
    <div style={{ backgroundColor: "#F8F3EF" }}>
      <FloatingButton />
      <div style={{ backgroundColor: "#F8F3EF", display: "flex", flexDirection: "column", marginTop: 4 }}>
        <HeroSection />
        <main className="flex flex-col items-start self-end mt-20 mr-9 w-full max-w-[1746px] max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
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

