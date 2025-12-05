"use client";
import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { HeroSection } from "./UI/Home/HeroSection";
import { SocialFunctions } from "./UI/Home/SocialFunctions";
import { SponsorSection } from "./UI/Home/SponsorSection";
import { NewsSection } from "./UI/Home/NewsSection";
import { ScholarsSection } from "./UI/Home/ScholarsSection";
import { GallerySection } from "./UI/Home/GallerySection";
import { FloatingButton } from "./UI/FloatingButton";

//pages
import Donate from "./Pages/Donate";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp"; // Import the SignUp component

function Home() {
  return (
    <div style={{ backgroundColor: "#F8F3EF" }}>
      <FloatingButton />
      <div style={{ backgroundColor: "#F8F3EF", display: "flex", flexDirection: "column", marginTop: 4 }}>
        <HeroSection />
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: "20px auto 0",
            width: "100%",
            maxWidth: 1720,
          }}
        >
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

function App() {
  return (
    <Routes>
      {/* Home route */}
      <Route path="/" element={<Home />} />

      {/* Donate page route */}
      <Route path="/Pages/Donate" element={<Donate />} />
      
      {/* Login page route */}
      <Route path="/Pages/Login" element={<Login />} />
      
      {/* SignUp page route */}
      <Route path="/Pages/SignUp" element={<SignUp />} />

      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;