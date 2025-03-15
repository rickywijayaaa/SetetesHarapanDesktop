import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import googleIcon from "../assets/google.svg";
import checkboxIcon from "../assets/checkbox.svg";
import bgImage from "../assets/loginbg.jpg";
import {supabase} from "../supabase.tsx";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Cek status autentikasi saat komponen dimuat
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/homepage"); // Redirect ke halaman edit jika sudah login
      }
    };

    checkAuth();

    // Set up listener untuk perubahan status autentikasi
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          // Check if user exists in your profiles or users table
          if (session.user) {
            const { data: userExists, error } = await supabase
              .from("profiles") // or whatever table you store user profiles in
              .select("id")
              .eq("email", session.user.email)
              .single();

            if (error || !userExists) {
              // User doesn't exist in your database, redirect to registration
              navigate("/register");
            } else {
              // User exists, proceed to edit/homepage
              navigate("/homepage");
            }
          }
        }
      }
    );

    // Cleanup listener saat komponen unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  // Login dengan email dan password
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Email dan kata sandi harus diisi");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Navigasi akan ditangani oleh onAuthStateChange
    } catch (error: any) {
      setErrorMessage(
        error.message ||
          "Gagal masuk. Silakan periksa kembali email dan kata sandi Anda."
      );
    } finally {
      setLoading(false);
    }
  };

  // Login dengan Google
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/homepage", // Changed from /edit to /auth/callback
        },
      });

      if (error) throw error;

      // Redirect akan ditangani oleh OAuth provider dan kemudian onAuthStateChanger
    } catch (error: any) {
      setErrorMessage(
        error.message || "Gagal masuk dengan Google. Silakan coba lagi."
      );
      setLoading(false);
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

        {/* Error message display */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* Remember Me & Forgot Password */}
        <div className="login-options">
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="checkbox-input"
            />
            <label htmlFor="remember-me">Ingat Saya</label>
          </div>
          <Link to="/forgot-password" className="forgot-password">
            Lupa Kata Sandi
          </Link>
        </div>

        {/* Login Button */}
        <button
          className="login-button"
          onClick={handleEmailLogin}
          disabled={loading}
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>

        {/* Register Link */}
        <p className="register-text">
          Belum memiliki akun?{" "}
          <Link to="/register" className="register-link">
            Daftarkan
          </Link>
        </p>

        {/* Separator */}
        <div className="separator">atau masuk dengan</div>

        {/* Google Sign-In Button */}
        <button
          className="google-button"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
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
