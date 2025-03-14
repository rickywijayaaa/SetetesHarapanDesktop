import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import googleIcon from "../assets/google.svg";
import checkboxIcon from "../assets/checkbox.svg";
import bgImage2 from "../assets/registerbg.jpg"; // Replace with actual image path

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="register-container">
    {/* Left Side: Background Image */}
    <div
    className="register-bg"
    style={{
        backgroundImage: `url(${bgImage2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "50%",
        height: "170vh",
        position: "relative",
    }}
    >
    <div className="bg-overlay"></div>
    </div>


      {/* Right Side: Form */}
      <div className="register-form-container">
        <div className="logo-container">
          <img src={logo} alt="Setetes Harapan" className="register-logo" />
          <h1 className="register-title-main">SetetesHarapan</h1>
        </div>

        <h2 className="register-title">Daftar</h2>
        <p className="register-subtitle">Daftarkan dengan data yang valid</p>

        {/* Institution Input */}
        <div className="input-group">
          <label>Lembaga</label>
          <input type="text" placeholder="Rumah Sakit / PMI / Kemenkes" className="input-field" />
        </div>

        {/* Hospital Name Input */}
        <div className="input-group">
          <label>Nama Rumah Sakit</label>
          <input type="text" placeholder="Nama Rumah Sakit" className="input-field" />
        </div>

        {/* Email & Phone Number (Side by Side) */}
        <div className="input-row">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="john.doe@gmail.com" className="input-field" />
          </div>

          <div className="input-group">
            <label>Nomor Telepon</label>
            <input type="text" placeholder="+62-812-12345678" className="input-field" />
          </div>
        </div>

        {/* Address Input */}
        <div className="input-group">
          <label>Alamat</label>
          <input type="text" placeholder="Jln. Perumahan Permata Permai No.7, Bandung" className="input-field" />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <label>Password</label>
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

        {/* Confirm Password Input */}
        <div className="input-group">
          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="**********"
              className="input-field"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="register-options">
          <div className="agree-terms">
            <img src={checkboxIcon} alt="Checkbox" className="checkbox-icon" />
            <span>
              Saya setuju dengan <span className="terms">Persyaratan</span> dan{" "}
              <span className="policy">Kebijakan Privasi</span>
            </span>
          </div>
        </div>

        {/* Register Button */}
        <button className="register-button">Buat Akun</button>

        {/* Already Have Account */}
        <p className="login-text">
          Sudah memiliki akun? <Link to="/login" className="login-link">Masuk</Link>
        </p>

        {/* Separator */}
        <div className="separator">Atau daftar dengan...</div>

        {/* Google Sign-In Button */}
        <button className="google-button">
          <img src={googleIcon} alt="Google" className="google-icon" />
          Lanjutkan dengan Google
        </button>
      </div>
    </div>
  );
};

export default Register;
