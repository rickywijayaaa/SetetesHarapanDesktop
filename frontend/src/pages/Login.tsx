import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import googleIcon from "../assets/google.svg";
import checkboxIcon from "../assets/checkbox.svg";
import bgImage from "../assets/loginbg.jpg";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
);

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Login via FastAPI
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/login",
        { email, password },
        { withCredentials: true } // required for cookie/session
      );

      alert("Login berhasil!");
      navigate("/homepage"); // ✅ redirect to homepage
    } catch (err: any) {
      alert(err.response?.data?.detail || "Login gagal, cek kembali kredensial Anda.");
    }
  };

  // Login via Google OAuth using Supabase
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/homepage",
        },
      });
      if (error) throw error;
    } catch (err: any) {
      console.error("Google login error:", err.message);
      alert("Login Google gagal.");
    }
  };

  return (
    <div className="login-container">
      {/* Left Side: Login Form */}
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} alt="Setetes Harapan" className="login-logo" />
          <h1 className="login-title-main">SetetesHarapan</h1>
        </div>

        <h2 className="login-title">Masuk</h2>
        <p className="login-subtitle">Masuk dengan akun yang sudah terdaftar</p>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="john.doe@gmail.com"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Kata Sandi</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="**********"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="login-options">
          <div className="remember-me">
            <img src={checkboxIcon} alt="Checkbox" className="checkbox-icon" />
            <span>Ingat Saya</span>
          </div>
          <Link to="/forgot-password" className="forgot-password">
            Lupa Kata Sandi
          </Link>
        </div>

        <button className="login-button" onClick={handleLogin}>
          Masuk
        </button>

        <p className="register-text">
          Belum memiliki akun?{" "}
          <Link to="/register" className="register-link">
            Daftarkan
          </Link>
        </p>

        <div className="separator">atau masuk dengan</div>

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
