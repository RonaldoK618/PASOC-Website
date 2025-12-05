"use client";
import * as React from "react";
import { DonationAmount } from "../UI/Donations/DonationAmount";


function Donate() {
  return (
    <div style={{ padding: '20px' }}>
        <h1>Donate to PASOC</h1>
        <DonationAmount />
    </div>
  );
}

export default Donate;