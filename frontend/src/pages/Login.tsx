import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import googleIcon from "../assets/google.svg";
import checkboxIcon from "../assets/checkbox.svg";
import bgImage from "../assets/loginbg.jpg";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with VITE environment variables
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
);

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/homepage", // After login redirect
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side: Form */}
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} alt="Setetes Harapan" className="login-logo" />
          <h1 className="login-title-main">SetetesHarapan</h1>
        </div>

        <h2 className="login-title">Masuk</h2>
        <p className="login-subtitle">Masuk dengan akun yang sudah terdaftar</p>

        {/* Email Input */}
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="john.doe@gmail.com" className="input-field" />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <label>Kata Sandi</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="**********"
              className="input-field"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="login-options">
          <div className="remember-me">
            <img src={checkboxIcon} alt="Checkbox" className="checkbox-icon" />
            <span>Ingat Saya</span>
          </div>
          <Link to="/forgot-password" className="forgot-password">
            Lupa Kata Sandi
          </Link>
        </div>

        {/* Login Button */}
        <button className="login-button">Masuk</button>

        {/* Register Link */}
        <p className="register-text">
          Belum memiliki akun? <Link to="/register" className="register-link">Daftarkan</Link>
        </p>

        {/* Separator */}
        <div className="separator">atau masuk dengan</div>

        {/* Google Sign-In Button */}
        <button className="google-button" onClick={handleGoogleLogin}>
          <img src={googleIcon} alt="Google" className="google-icon" />
          Lanjutkan dengan Google
        </button>
      </div>

      {/* Right Side: Background Image */}
      <div
        className="login-bg"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "50%",
          height: "120vh",
        }}
      >
        <div className="bg-overlay"></div>
      </div>
    </div>
  );
};

export default Login;
