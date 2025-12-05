interface DonationPrompts {
  amount: number;
}

function DonationButtons({ amount }: DonationPrompts) {
  return (
    <button
      style={{
        margin: '4px',
        padding: '8px 16px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
      aria-label={`Donate $${amount}`}
    >
      ${amount}
    </button>
  );
}

export function DonationAmount() {
  const donationAmounts = [25, 50, 100, 250, 500, 1000];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Enter Your Donation</h2>
      <p>
        Choose from the pre-selected amount or enter the amount you would like to donate
      </p>

      {/* Pre-selected donation buttons */}
      <div>
        {donationAmounts.map((amount) => (
          <DonationButtons key={amount} amount={amount} />
        ))}
      </div>

      {/* Custom donation input */}
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="custom-donation">
          Custom Amount: $
        </label>
        <input
          id="custom-donation"
          type="number"
          min={1}
          style={{ marginLeft: '8px', padding: '4px', fontSize: '16px', width: '100px' }}
          placeholder="Enter amount"
        />
      </div>
    </div>
  );
}
