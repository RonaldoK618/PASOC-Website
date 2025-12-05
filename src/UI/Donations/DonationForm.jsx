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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Object:", formData);
      alert("Form submitted successfully! Check console for data.");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  const inputStyle = { padding: "8px", fontSize: "16px", width: "100%", boxSizing: "border-box" };

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
    cursor: "pointer",
    border: selected ? "2px solid #556B2F" : "1px solid #ccc",
    backgroundColor: selected ? "#E6F0D4" : "transparent"
  });

  const logoStyle = { width: "40px", height: "auto" };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", backgroundColor: "#f5f5f4", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#556B2F" }}>Enter Your Donation</h2>
      <p>Choose from the pre-selected amount or enter the amount you would like to donate</p>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
        {donationAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, customDonation: amount }))}
            style={{ fontSize: "20px", padding: "12px 20px" }}
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
              onClick={() => handlePaymentMethodChange(id)}
              role="radio"
              aria-checked={selected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
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
                onChange={() => handlePaymentMethodChange(id)}
                style={{ cursor: "pointer" }}
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
        />
        {errors.cellNumber && <span style={{ color: "red" }}>{errors.cellNumber}</span>}
      </div>

      <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "20px", textAlign: "center" }}>
        Total Donation: ${formData.customDonation || 0}.00
      </p>
      <button
        type="submit"
        style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}
      >
        Donate
      </button>
    </form>
  );
}