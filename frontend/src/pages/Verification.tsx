import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import bgImage3 from "../assets/verificationbg.jpg"; // Change with actual path

const Verification: React.FC = () => {
  const [showCode, setShowCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <div className="verification-container">
      {/* Left Side: Form */}
      <div className="verification-form-container">
        <div className="logo-container">
          <img src={logo} alt="Setetes Harapan" className="verification-logo" />
          <h1 className="verification-title-main">SetetesHarapan</h1>
        </div>

        {/* Back Button */}
        <Link to="/register" className="back-link">← Kembali</Link>

        <h2 className="verification-title">Konfirmasi Kode</h2>
        <p className="verification-subtitle">
          Kode autentikasi telah dikirimkan ke email Anda.
        </p>

        {/* Verification Code Input */}
        <div className="input-group">
          <label>Masuk Kode</label>
          <div className="code-wrapper">
            <input
              type={showCode ? "text" : "password"}
              placeholder="Masukkan kode verifikasi"
              className="input-field"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button
              type="button"
              className="toggle-code"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        {/* Resend Code */}
        <p className="resend-text">
          Tidak mendapatkan kode? <span className="resend-link">Kirim ulang</span>
        </p>

        {/* Confirm Button */}
        <button className="verification-button">Konfirmasi</button>
      </div>

        {/* Right Side: Background Image */}
        <div
        className="verification-bg"
        style={{
            backgroundImage: `url(${bgImage3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "50%",
            height: "100vh",
            position: "relative",
        }}
        >
        <div className="bg-overlay"></div>
        </div>

    </div>
  );
};

export default Verification;
