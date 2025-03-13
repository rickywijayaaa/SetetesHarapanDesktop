import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import heroImage from "../assets/iconlanding.png";
import '../App.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      {/* Navbar */}
      <div className="navbar">
        <img src={logo} alt="Setetes Harapan Logo" className="navbar-logo" />
        <h1 className="navbar-title">SetetesHarapan</h1>
      </div>

      <Link to="/login" className="login-button">
        Login
      </Link>

      {/* Hero Content */}
      <div className="container hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <h2 className="hero-title">
            Selamatkan Hidup, <br className="hidden md:block" />
            Donasikan Darah!
          </h2>
          <p className="hero-description">
            Kami hadir untuk membantu rumah sakit, Kementerian Kesehatan, dan
            Palang Merah Indonesia dalam mengelola stok darah dengan lebih
            efisien. Pantau ketersediaan darah secara real-time, perbarui
            informasi dengan mudah, dan kirimkan notifikasi darurat saat ada
            kebutuhan mendesak. Bersama, kita pastikan setiap pasien mendapatkan
            darah yang mereka butuhkan tepat waktu.
          </p>

          <Link to="/donate" className="cta-button">
            Get Blood Now
          </Link>
        </div>

        {/* Hero Image */}
        <div className="hero-image-container">
          <img src={heroImage} alt="Blood Donation" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
