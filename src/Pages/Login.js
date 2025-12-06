"use client";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api'; // Import the API

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(""); // Add this
  const [loading, setLoading] = useState(false); // Add this
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    console.log({ email, password, rememberMe });
    
    try {
      // Call Flask API
      const result = await authAPI.login(email, password);
      
      console.log('Login successful:', result);
      
      // Store token and user data
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      
      if (rememberMe) {
        localStorage.setItem('remember_me', 'true');
      }
      
      // Redirect to donate page
      navigate('/donate');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      zIndex: 1,
      minHeight: "100vh",
      backgroundColor: "#F8F3EF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "32px",
    },
    logo: {
      height: "160px",
      width: "auto",
    },
    heading: {
      textAlign: "center",
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#4B5563",
      marginBottom: "32px",
      letterSpacing: "0.05em",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "24px",
    },
    input: {
      width: "100%",
      height: "48px",
      padding: "0 16px",
      border: "1px solid #9CA3AF",
      borderRadius: "6px",
      backgroundColor: "#FFFFFF",
      color: "#1F2937",
      fontSize: "1rem",
      outline: "none",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    checkbox: {
      width: "16px",
      height: "16px",
      accentColor: "#16A34A",
      cursor: "pointer",
    },
    label: {
      color: "#4B5563",
      fontSize: "0.875rem",
      cursor: "pointer",
    },
    forgotPassword: {
      color: "#4B5563",
      fontSize: "0.875rem",
      textDecoration: "none",
    },
    loginButton: {
      width: "100%",
      height: "48px",
      backgroundColor: "#6B9B3A",
      color: "#FFFFFF",
      fontWeight: 600,
      fontSize: "1rem",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "24px",
    },
    signupLink: {
      textAlign: "center",
      marginBottom: "24px",
    },
    signupText: {
      color: "#374151",
      fontWeight: 600,
      textDecoration: "none",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "24px",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      backgroundColor: "#9CA3AF",
    },
    dividerText: {
      color: "#4B5563",
      fontSize: "0.875rem",
    },
    socialButtons: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
    },
    socialButton: {
      width: "56px",
      height: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid #9CA3AF",
      borderRadius: "8px",
      backgroundColor: "transparent",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo Section */}
        <div style={styles.logoContainer}>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/59857bbe636f97ab4cebcfbc3ad030ee40910eb4?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
            alt="PASOC Logo"
            style={styles.logo}
          />
        </div>

        {/* Login Heading */}
        <h1 style={styles.heading}>LOGIN</h1>

        {/* Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {/* Remember Me & Forgot Password */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.875rem" }}>
            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
              />
              <label htmlFor="remember" style={styles.label}>
                Remember me
              </label>
            </div>
            <a href="#" style={styles.forgotPassword}>
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={styles.loginButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#5A8530"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#6B9B3A"}
          >
            Log In
          </button>
        </form>

        {/* Sign Up Link */}
        <div style={styles.signupLink}>
          <Link to="/Pages/SignUp" style={styles.signupText}> {/* Updated to Link */}
            Sign Up
          </Link>
        </div>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>or log in with</span>
          <div style={styles.dividerLine}></div>
        </div>

        {/* Social Login Buttons */}
        <div style={styles.socialButtons}>
          {/* Facebook */}
          <button 
            style={styles.socialButton}
            onClick={() => console.log("Login with Facebook")}
          >
            <svg
              style={{ width: "24px", height: "24px", color: "#2563EB" }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>

          {/* Google */}
          <button 
            style={styles.socialButton}
            onClick={() => console.log("Login with Google")}
          >
            <span style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#2563EB" }}>G</span>
          </button>

          {/* Apple */}
          <button 
            style={styles.socialButton}
            onClick={() => console.log("Login with Apple")}
          >
            <svg
              style={{ width: "24px", height: "24px", color: "#000000" }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.08 2.29.74 3.08.8.78-.06 2.07-1.08 3.59-.92 1.42.12 2.74.72 3.43 1.84-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.48-2.58 3.32l-.07-.05z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;