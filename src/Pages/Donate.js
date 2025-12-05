"use client";
import * as React from "react";
import DonationForm from "../UI/Donations/DonationForm";


function Donate() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f4' }}>
        <h1 style={{ textDecoration: "underline", color: "#556B2F", textAlign: "center"}}>Donate</h1>
        <DonationForm />
    </div>
  );
}

export default Donate;