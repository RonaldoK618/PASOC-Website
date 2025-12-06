import { useState } from "react";

export default function DonationForm() {
  const donationAmounts = [5, 10, 20, 50, 100, 150];

  const paymentMethods = [
    { id: "paypal", label: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
    { id: "visa", label: "Visa", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" },
    { id: "mastercard", label: "MasterCard", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" },
    { id: "amex", label: "American Express", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" },
    { id: "interac", label: "Interac", logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Interac_Brand_2021.png" }
  ];

  const [formData, setFormData] = useState({
    customDonation: "",
    firstname: "",
    lastname: "",
    email: "",
    nameOnCard: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    billingFirstName: "",
    billingLastName: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    country: "",
    cellNumber: "",
    paymentMethod: "paypal"
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePaymentMethodChange = (id) => {
    setFormData((prev) => ({ ...prev, paymentMethod: id }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.nameOnCard) newErrors.nameOnCard = "Name on card is required";

    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.expDate) {
      newErrors.expDate = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expDate)) {
      newErrors.expDate = "Format must be MM/YY";
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    if (!formData.province) newErrors.province = "Province is required";
    if (!formData.country) newErrors.country = "Country is required";

    if (!formData.cellNumber) {
      newErrors.cellNumber = "Cell number is required";
    } else if (!/^\d{10}$/.test(formData.cellNumber.replace(/\D/g, ""))) {
      newErrors.cellNumber = "Cell number must be 10 digits";
    }

    if (!formData.billingFirstName) newErrors.billingFirstName = "Billing first name is required";
    if (!formData.billingLastName) newErrors.billingLastName = "Billing last name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     console.log("Form Data Object:", formData);
  //     alert("Form submitted successfully! Check console for data.");
  //   } else {
  //     alert("Please fix the errors before submitting.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      setMessage("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    setMessage("");

    // Prepare data for backend (minimal fields for donation)
    const donationData = {
      amount: parseFloat(formData.customDonation) || 0,
      payment_method: formData.paymentMethod,
      notes: `Donation from ${formData.firstname} ${formData.lastname}. Email: ${formData.email}`,
      is_recurring: false,
      // Include user info for guest donations
      donor_info: {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.cellNumber,
        address: `${formData.address}, ${formData.city}, ${formData.province}, ${formData.country}, ${formData.postalCode}`
      }
    };

    console.log("Sending to backend:", donationData);

    try {
      // Send to Flask backend
      const response = await fetch('http://localhost:5000/api/donations/create-guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Thank you for your donation! Your contribution has been recorded.");
        console.log("Donation submitted successfully:", result);
        
        // Optional: Clear form after successful submission
        // setFormData({
        //   customDonation: "",
        //   firstname: "",
        //   lastname: "",
        //   email: "",
        //   nameOnCard: "",
        //   cardNumber: "",
        //   expDate: "",
        //   cvv: "",
        //   billingFirstName: "",
        //   billingLastName: "",
        //   address: "",
        //   city: "",
        //   postalCode: "",
        //   province: "",
        //   country: "",
        //   cellNumber: "",
        //   paymentMethod: "paypal"
        // });
      } else {
        setMessage(result.error || "Donation failed. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please check if the server is running.");
      console.error("Donation error:", error);
    } finally {
      setLoading(false);
    }
  };


  const inputStyle = { 
    padding: "8px", 
    fontSize: "16px", 
    width: "100%", 
    boxSizing: "border-box",
    opacity: loading ? 0.7 : 1,
    pointerEvents: loading ? 'none' : 'auto'
  };

  const rowStyle = { display: "flex", gap: "10px", marginTop: "12px" };
  const halfStyle = { flex: 1, minWidth: 0 };

  const paymentMethodContainer = {
    marginTop: "30px",
    padding: "10px",
    border: "1px solid #556B2F",
    borderRadius: "8px",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto"
  };

  const paymentOptionStyle = (selected) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: loading ? 'not-allowed' : 'pointer',
    border: selected ? "2px solid #556B2F" : "1px solid #ccc",
    backgroundColor: selected ? "#E6F0D4" : "transparent",
    opacity: loading ? 0.7 : 1,
    pointerEvents: loading ? 'none' : 'auto'
  });

  const logoStyle = { width: "40px", height: "auto" };

  const buttonStyle = {
    fontSize: "20px", 
    padding: "12px 20px",
    backgroundColor: "#6B9B3A",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    opacity: loading ? 0.7 : 1,
    pointerEvents: loading ? 'none' : 'auto'
  };

  const submitButtonStyle = {
    marginTop: "10px", 
    padding: "10px 20px", 
    fontSize: "16px",
    backgroundColor: loading ? "#7A8F58" : "#4A6F28",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.7 : 1,
    pointerEvents: loading ? 'none' : 'auto',
    width: "100%"
  };

  const messageStyle = {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    textAlign: "center",
    backgroundColor: message.includes("Thank") ? "#D1FAE5" : "#FEE2E2",
    color: message.includes("Thank") ? "#065F46" : "#DC2626",
    border: message.includes("Thank") ? "1px solid #A7F3D0" : "1px solid #FCA5A5"
  };

return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#556B2F" }}>Enter Your Donation</h2>
      <p>Choose from the pre-selected amount or enter the amount you would like to donate</p>

      {/* Message Display */}
      {message && (
        <div style={messageStyle}>
          {message}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
        {donationAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, customDonation: amount }))}
            style={buttonStyle}
            disabled={loading}
          >
            ${amount}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
        <label htmlFor="customDonation">Custom Amount: $</label>
        <input
          id="customDonation"
          type="number"
          min={1}
          style={inputStyle}
          value={formData.customDonation}
          onChange={handleChange}
          placeholder="0"
          disabled={loading}
          required
        />
        <p>.00</p>
      </div>

      <h2 style={{ color: "#556B2F", marginTop: "30px" }}>Payment Method</h2>
      <div style={paymentMethodContainer} role="radiogroup" aria-label="Payment Method">
        {paymentMethods.map(({ id, label, logo }) => {
          const selected = formData.paymentMethod === id;
          return (
            <div
              key={id}
              style={paymentOptionStyle(selected)}
              onClick={() => !loading && handlePaymentMethodChange(id)}
              role="radio"
              aria-checked={selected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (!loading && (e.key === " " || e.key === "Enter")) {
                  e.preventDefault();
                  handlePaymentMethodChange(id);
                }
              }}
            >
              <input
                type="radio"
                id={id}
                name="paymentMethod"
                checked={selected}
                onChange={() => !loading && handlePaymentMethodChange(id)}
                style={{ cursor: "pointer" }}
                disabled={loading}
              />
              <label htmlFor={id} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
                <img src={logo} alt={label} style={logoStyle} /> {label}
              </label>
            </div>
          );
        })}
      </div>

      <h2 style={{ color: "#556B2F", marginTop: "30px" }}>Enter Your Information</h2>
      <div>
        <p>Name</p>
        <div style={rowStyle}>
          <div style={halfStyle}>
            <input
              id="firstname"
              type="text"
              style={inputStyle}
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
              disabled={loading}
              required
            />
            {errors.firstname && <span style={{ color: "red" }}>{errors.firstname}</span>}
          </div>
          <div style={halfStyle}>
            <input
              id="lastname"
              type="text"
              style={inputStyle}
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              disabled={loading}
              required
            />
            {errors.lastname && <span style={{ color: "red" }}>{errors.lastname}</span>}
          </div>
        </div>

        <p>Email</p>
        <input
          id="email"
          type="email"
          style={inputStyle}
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          disabled={loading}
          required
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </div>

      <h2 style={{ color: "#556B2F", marginTop: "30px" }}>Card Detail</h2>
      <div>
        <p>Name On Card</p>
        <input
          id="nameOnCard"
          type="text"
          style={inputStyle}
          value={formData.nameOnCard}
          onChange={handleChange}
          placeholder="Name"
          disabled={loading}
          required
        />
        {errors.nameOnCard && <span style={{ color: "red" }}>{errors.nameOnCard}</span>}

        <p>Card Number</p>
        <input
          id="cardNumber"
          type="text"
          style={inputStyle}
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="xxxx xxxx xxxx xxxx"
          disabled={loading}
          required
        />
        {errors.cardNumber && <span style={{ color: "red" }}>{errors.cardNumber}</span>}

        <div style={rowStyle}>
          <div style={{ ...halfStyle, display: "flex", flexDirection: "column" }}>
            <label htmlFor="expDate">Expiry Date</label>
            <input
              id="expDate"
              type="text"
              style={inputStyle}
              value={formData.expDate}
              onChange={handleChange}
              placeholder="MM/YY"
              disabled={loading}
              required
            />
            {errors.expDate && <span style={{ color: "red" }}>{errors.expDate}</span>}
          </div>
          <div style={{ ...halfStyle, display: "flex", flexDirection: "column" }}>
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              type="text"
              style={inputStyle}
              value={formData.cvv}
              onChange={handleChange}
              placeholder="XXX"
              disabled={loading}
              required
            />
            {errors.cvv && <span style={{ color: "red" }}>{errors.cvv}</span>}
          </div>
        </div>
      </div>

      <h2 style={{ color: "#556B2F", marginTop: "30px" }}>Billing Address</h2>
      <div>
        <p>Name</p>
        <div style={rowStyle}>
          <div style={halfStyle}>
            <input
              id="billingFirstName"
              type="text"
              style={inputStyle}
              value={formData.billingFirstName}
              onChange={handleChange}
              placeholder="First Name"
              disabled={loading}
              required
            />
            {errors.billingFirstName && <span style={{ color: "red" }}>{errors.billingFirstName}</span>}
          </div>
          <div style={halfStyle}>
            <input
              id="billingLastName"
              type="text"
              style={inputStyle}
              value={formData.billingLastName}
              onChange={handleChange}
              placeholder="Last Name"
              disabled={loading}
              required
            />
            {errors.billingLastName && <span style={{ color: "red" }}>{errors.billingLastName}</span>}
          </div>
        </div>

        <p>Address</p>
        <input
          id="address"
          type="text"
          style={inputStyle}
          value={formData.address}
          onChange={handleChange}
          placeholder="Street Address"
          disabled={loading}
          required
        />
        {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}

        <div style={rowStyle}>
          <div style={halfStyle}>
            <input
              id="city"
              type="text"
              style={inputStyle}
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              disabled={loading}
              required
            />
            {errors.city && <span style={{ color: "red" }}>{errors.city}</span>}
          </div>
          <div style={halfStyle}>
            <input
              id="postalCode"
              type="text"
              style={inputStyle}
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              disabled={loading}
              required
            />
            {errors.postalCode && <span style={{ color: "red" }}>{errors.postalCode}</span>}
          </div>
        </div>

        <div style={rowStyle}>
          <div style={halfStyle}>
            <input
              id="province"
              type="text"
              style={inputStyle}
              value={formData.province}
              onChange={handleChange}
              placeholder="Province"
              disabled={loading}
              required
            />
            {errors.province && <span style={{ color: "red" }}>{errors.province}</span>}
          </div>
          <div style={halfStyle}>
            <input
              id="country"
              type="text"
              style={inputStyle}
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              disabled={loading}
              required
            />
            {errors.country && <span style={{ color: "red" }}>{errors.country}</span>}
          </div>
        </div>

        <p>Cell Number</p>
        <input
          id="cellNumber"
          type="text"
          style={inputStyle}
          value={formData.cellNumber}
          onChange={handleChange}
          placeholder="1234567890"
          disabled={loading}
          required
        />
        {errors.cellNumber && <span style={{ color: "red" }}>{errors.cellNumber}</span>}
      </div>

      <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "20px", textAlign: "center" }}>
        Total Donation: ${formData.customDonation || 0}.00
      </p>
      <button
        type="submit"
        style={submitButtonStyle}
        disabled={loading || !formData.customDonation}
      >
        {loading ? "Processing..." : "Donate"}
      </button>
    </form>
  );
}