"use client";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, membersAPI } from '../services/api';

function SignUp() {
  const [hasChildren, setHasChildren] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [numChildren, setNumChildren] = useState(0);
  const [adultsCount, setAdultsCount] = useState(1);
  const [dependantsCount, setDependantsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Form data states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    birthday: "",
    street: "",
    city: "",
    postalCode: "",
    cellNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Child data array
  const [childrenData, setChildrenData] = useState([]);

  // SINGLE handleAddChild function
  const handleAddChild = () => {
    setChildrenData([
      ...childrenData,
      { firstName: "", lastName: "", preferredName: "", birthday: "" }
    ]);
    setNumChildren(numChildren + 1);
  };

  const handleChildChange = (index, field, value) => {
    const updatedChildren = [...childrenData];
    updatedChildren[index][field] = value;
    setChildrenData(updatedChildren);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    // Calculate total
    const totalAmount = (adultsCount * 5.00) + (dependantsCount * 2.50);

    try {
      // Step 1: Register user
      const registerResult = await authAPI.register({
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        full_name: `${formData.firstName} ${formData.lastName}`.trim()
      });

      // Store token from registration
      localStorage.setItem('token', registerResult.token);
      localStorage.setItem('user', JSON.stringify(registerResult.user));

      // Step 2: Complete registration with additional details
      const registrationData = {
        preferredName: formData.preferredName,
        birthday: formData.birthday,
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        cellNumber: formData.cellNumber,
        hasChildren: hasChildren,
        emailNotifications: emailNotifications,
        payment: {
          adultsCount: adultsCount,
          youthCount: dependantsCount,
          totalAmount: totalAmount,
          paymentMethod: paymentMethod
        },
        children: childrenData
      };

      const completeResult = await membersAPI.completeRegistration(registrationData);

      setSuccess("Registration successful! You can now make donations.");
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/donate');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total
  const totalAmount = (adultsCount * 5.00) + (dependantsCount * 2.50);

  const styles = {
    container: {
      backgroundColor: "#F8F3EF",
      minHeight: "130vh",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    },
    main: {
      maxWidth: "800px",
      width: "100%",
      margin: "0 auto"
    },
    titleSection: {
      textAlign: "center",
      marginBottom: "30px"
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#556B2F",
      textDecoration: "underline",
      marginBottom: "10px"
    },
    subtitle: {
      fontSize: "18px",
      color: "#000000",
      marginBottom: "5px"
    },
    formSection: {
      backgroundColor: "#FFFFFF",
      padding: "25px",
      marginBottom: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },
    sectionTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#000000",
      marginBottom: "20px"
    },
    label: {
      display: "block",
      color: "#000000",
      marginBottom: "8px",
      fontSize: "16px"
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #CCCCCC",
      borderRadius: "4px",
      fontSize: "16px",
      marginBottom: "15px"
    },
    twoColumnGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "15px"
    },
    radioContainer: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      justifyContent: "center",
      marginTop: "10px"
    },
    radioLabel: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      color: "#000000"
    },
    radioCircle: {
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      border: "2px solid #000000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    radioInnerCircle: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: "#000000"
    },
    privacyBox: {
      backgroundColor: "#F5F5F5",
      padding: "15px",
      marginBottom: "20px",
      borderRadius: "4px"
    },
    privacyText: {
      fontSize: "14px",
      color: "#000000",
      lineHeight: "1.5"
    },
    paymentRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
      paddingBottom: "15px",
      borderBottom: "1px solid #DDDDDD"
    },
    select: {
      padding: "8px 12px",
      border: "1px solid #CCCCCC",
      borderRadius: "4px",
      backgroundColor: "#FFFFFF",
      fontSize: "16px"
    },
    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px",
      paddingTop: "15px",
      borderTop: "2px solid #DDDDDD",
      fontWeight: "bold",
      fontSize: "18px"
    },
    paymentMethodRow: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px",
      cursor: "pointer"
    },
    paymentMethodRadio: {
      marginRight: "10px"
    },
    submitButton: {
      backgroundColor: loading ? "#7A8F58" : "#4A6F28",
      color: "#FFFFFF",
      padding: "12px 30px",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "4px",
      cursor: loading ? "not-allowed" : "pointer",
      margin: "20px auto",
      display: "block",
      opacity: loading ? 0.7 : 1
    },
    loginLink: {
      textAlign: "center",
      marginTop: "20px",
      color: "#000000",
      fontSize: "16px"
    },
    loginText: {
      color: "#4A6F28",
      textDecoration: "none",
      fontWeight: "bold"
    },
    footer: {
      textAlign: "center",
      marginTop: "30px",
      color: "#000000",
      fontSize: "14px",
      lineHeight: "1.5"
    },
    addChildButton: {
      width: "100%",
      backgroundColor: "#4A6F28",
      color: "#FFFFFF",
      padding: "12px",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "20px"
    },
    childSection: {
      marginBottom: "25px",
      paddingBottom: "20px",
      borderBottom: "1px solid #DDDDDD"
    },
    childTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#000000",
      marginBottom: "15px"
    },
    messageBox: {
      padding: "15px",
      margin: "20px 0",
      borderRadius: "4px",
      textAlign: "center",
      fontSize: "16px"
    },
    errorBox: {
      backgroundColor: "#FEE2E2",
      color: "#DC2626",
      border: "1px solid #FCA5A5"
    },
    successBox: {
      backgroundColor: "#D1FAE5",
      color: "#065F46",
      border: "1px solid #A7F3D0"
    }
  };

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        {/* Title Section */}
        <div style={styles.titleSection}>
          <h2 style={styles.title}>MEMBERSHIP REGISTRATION</h2>
          <p style={styles.subtitle}>One time membership fee of: Adult: $5.00 Youth: $2.50</p>
        </div>

        {/* Messages */}
        {error && (
          <div style={{ ...styles.messageBox, ...styles.errorBox }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ ...styles.messageBox, ...styles.successBox }}>
            {success}
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Member Information Section */}
          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Member Information</h3>

            <div style={styles.twoColumnGrid}>
              <div>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label style={styles.label}>&nbsp;</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label style={styles.label}>Preferred Name</label>
              <input
                type="text"
                name="preferredName"
                placeholder="if applicable"
                value={formData.preferredName}
                onChange={handleInputChange}
                style={styles.input}
                disabled={loading}
              />
            </div>

            <div>
              <label style={styles.label}>Birthday</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                style={styles.input}
                disabled={loading}
              />
            </div>

            {/* Address Section */}
            <div>
              <label style={styles.label}>Address</label>
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleInputChange}
                style={styles.input}
                required
                disabled={loading}
              />
              <div style={styles.twoColumnGrid}>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  disabled={loading}
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Contact Info */}
            <div style={styles.twoColumnGrid}>
              <div>
                <label style={styles.label}>Cell Number</label>
                <input
                  type="tel"
                  name="cellNumber"
                  placeholder="xxx-xxx-xxxx"
                  value={formData.cellNumber}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="yourname@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Fields */}
            <div style={styles.twoColumnGrid}>
              <div>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  minLength="8"
                  disabled={loading}
                />
                <small style={{ color: "#666", fontSize: "12px" }}>
                  Minimum 8 characters
                </small>
              </div>
              <div>
                <label style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Children Section */}
          <div style={styles.formSection}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={styles.sectionTitle}>Do you have children?</h3>
              <div style={styles.radioContainer}>
                <label style={styles.radioLabel}>
                  <div style={{...styles.radioCircle, borderColor: hasChildren ? "#000000" : "#CCCCCC"}}>
                    {hasChildren && <div style={styles.radioInnerCircle}></div>}
                  </div>
                  <span>Yes</span>
                  <input
                    type="radio"
                    name="hasChildren"
                    value="yes"
                    checked={hasChildren}
                    onChange={() => setHasChildren(true)}
                    style={{ display: "none" }}
                    disabled={loading}
                  />
                </label>
                <label style={styles.radioLabel}>
                  <div style={{...styles.radioCircle, borderColor: !hasChildren ? "#000000" : "#CCCCCC"}}>
                    {!hasChildren && <div style={styles.radioInnerCircle}></div>}
                  </div>
                  <span>No</span>
                  <input
                    type="radio"
                    name="hasChildren"
                    value="no"
                    checked={!hasChildren}
                    onChange={() => setHasChildren(false)}
                    style={{ display: "none" }}
                    disabled={loading}
                  />
                </label>
              </div>
            </div>

            {hasChildren && (
              <div>
                <h3 style={{...styles.sectionTitle, fontSize: "20px", marginBottom: "15px"}}>Dependant(s) if applicable</h3>

                {childrenData.map((child, index) => (
                  <div key={index} style={styles.childSection}>
                    <h4 style={styles.childTitle}>Child {index + 1}</h4>
                    <div style={styles.twoColumnGrid}>
                      <div>
                        <label style={styles.label}>Name</label>
                        <input
                          type="text"
                          placeholder="First"
                          value={child.firstName}
                          onChange={(e) => handleChildChange(index, 'firstName', e.target.value)}
                          style={styles.input}
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label style={styles.label}>&nbsp;</label>
                        <input
                          type="text"
                          placeholder="Last"
                          value={child.lastName}
                          onChange={(e) => handleChildChange(index, 'lastName', e.target.value)}
                          style={styles.input}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={styles.label}>Preferred Name</label>
                      <input
                        type="text"
                        placeholder="if applicable"
                        value={child.preferredName}
                        onChange={(e) => handleChildChange(index, 'preferredName', e.target.value)}
                        style={styles.input}
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label style={styles.label}>Birthday</label>
                      <input
                        type="date"
                        value={child.birthday}
                        onChange={(e) => handleChildChange(index, 'birthday', e.target.value)}
                        style={styles.input}
                        disabled={loading}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddChild}
                  style={styles.addChildButton}
                  disabled={loading}
                >
                  Add more children
                </button>
              </div>
            )}
          </div>

          {/* Informed Consent Section */}
          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Informed Consent & Privacy Notice</h3>
            <div style={styles.privacyBox}>
              <p style={styles.privacyText}>
                By submitting this membership form, you consent to the collection, use, and
                storage of your personal information by Pangasinan Society of Calgary (PASOC) for
                the purpose of managing your membership and providing related services.
                <br /><br />
                We are committed to protecting your privacy and handling your personal information
                in accordance with the Privacy Act and all applicable privacy regulations. Your
                information will be stored securely and will only be accessed by authorized
                personnel. It will not be shared with third parties without your consent, except as
                required by law.
                <br /><br />
                You have the right to access, update, or request correction of your personal
                information at any time by contacting us at [contact email or phone number].
                <br /><br />
                By signing or submitting this form, you acknowledge that you have read and
                understood this notice and consent to the collection, use, and storage of your
                personal information as described above.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "20px" }}>
              <span style={{ color: "#000000", fontSize: "16px" }}>
                Would you like to receive email notifications?
              </span>
              <div style={styles.radioContainer}>
                <label style={styles.radioLabel}>
                  <div style={{...styles.radioCircle, borderColor: emailNotifications ? "#000000" : "#CCCCCC"}}>
                    {emailNotifications && <div style={styles.radioInnerCircle}></div>}
                  </div>
                  <span>Yes</span>
                  <input
                    type="radio"
                    name="emailNotifications"
                    value="yes"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(true)}
                    style={{ display: "none" }}
                    disabled={loading}
                  />
                </label>
                <label style={styles.radioLabel}>
                  <div style={{...styles.radioCircle, borderColor: !emailNotifications ? "#000000" : "#CCCCCC"}}>
                    {!emailNotifications && <div style={styles.radioInnerCircle}></div>}
                  </div>
                  <span>No</span>
                  <input
                    type="radio"
                    name="emailNotifications"
                    value="no"
                    checked={!emailNotifications}
                    onChange={() => setEmailNotifications(false)}
                    style={{ display: "none" }}
                    disabled={loading}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Payment Method</h3>
            <div>
              {[
                { id: "paypal", label: "PayPal" },
                { id: "visa", label: "VISA" },
                { id: "mastercard", label: "MasterCard" },
                { id: "amex", label: "American Express" },
                { id: "interac", label: "Interac" },
              ].map((method) => (
                <label key={method.id} style={styles.paymentMethodRow}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    style={styles.paymentMethodRadio}
                    disabled={loading}
                  />
                  <span style={{ color: "#000000", fontSize: "16px" }}>{method.label}</span>
                </label>
              ))}
            </div>
          </div>
{/* Card Details Section */}
          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Card Details</h3>

            <div>
              <label style={styles.label}>Name on Card</label>
              <input
                type="text"
                placeholder="Name"
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Card Number</label>
              <input
                type="text"
                placeholder="xxxx xxxx xxxx xxxx"
                style={styles.input}
              />
            </div>

            <div style={styles.twoColumnGrid}>
              <div>
                <label style={styles.label}>Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>CVV</label>
                <input
                  type="text"
                  placeholder="xxx"
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Billing Address Section */}
          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Billing Address</h3>

            <div style={styles.twoColumnGrid}>
              <div>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  placeholder="First"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>&nbsp;</label>
                <input
                  type="text"
                  placeholder="Last"
                  style={styles.input}
                />
              </div>
            </div>

            <div>
              <label style={styles.label}>Address</label>
              <input
                type="text"
                placeholder="Street"
                style={styles.input}
              />
              <div style={styles.twoColumnGrid}>
                <input
                  type="text"
                  placeholder="City"
                  style={styles.input}
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.twoColumnGrid}>
              <div>
                <label style={styles.label}>Province</label>
                <input
                  type="text"
                  placeholder="Province"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  style={styles.input}
                />
              </div>
            </div>

            <div>
              <label style={styles.label}>Cell Number</label>
              <input
                type="tel"
                placeholder="xxx-xxx-xxxx"
                style={styles.input}
              />
            </div>
          </div>
          {/* Payment Amount Section */}
          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Payment Amount</h3>
            
            <div>
              <div style={styles.paymentRow}>
                <span style={{ color: "#000000", fontSize: "16px" }}>Adult (s)</span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <select 
                    value={adultsCount}
                    onChange={(e) => setAdultsCount(parseInt(e.target.value))}
                    style={styles.select}
                    disabled={loading}
                  >
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <option key={`adult-${num}`} value={num}>{num}</option>
                    ))}
                  </select>
                  <span style={{ color: "#666666", fontSize: "14px" }}>Select Amount</span>
                </div>
              </div>

              <div style={styles.paymentRow}>
                <span style={{ color: "#000000", fontSize: "16px" }}>Dependant (s)</span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <select 
                    value={dependantsCount}
                    onChange={(e) => setDependantsCount(parseInt(e.target.value))}
                    style={styles.select}
                    disabled={loading}
                  >
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <option key={`youth-${num}`} value={num}>{num}</option>
                    ))}
                  </select>
                  <span style={{ color: "#666666", fontSize: "14px" }}>Select Amount</span>
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                {adultsCount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span style={{ color: "#000000" }}>Adult Membership x {adultsCount}</span>
                    <span style={{ color: "#000000", fontWeight: "bold" }}>
                      ${(adultsCount * 5.00).toFixed(2)}
                    </span>
                  </div>
                )}
                
                {dependantsCount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span style={{ color: "#000000" }}>Youth Membership x {dependantsCount}</span>
                    <span style={{ color: "#000000", fontWeight: "bold" }}>
                      ${(dependantsCount * 2.50).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div style={styles.totalRow}>
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          
          {/* Submit Button */}
          <button
            type="submit"
            style={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay & Submit Registration"}
          </button>

          {/* Login Prompt */}
          <div style={styles.loginLink}>
            <p style={{ color: "#000000" }}>
              Already have an account?{" "}
              <Link to="/Pages/Login" style={styles.loginText}>
                Login
              </Link>
            </p>
          </div>
        </form>

      </main>
    </div>
  );
}

export default SignUp;