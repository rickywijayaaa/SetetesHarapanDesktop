import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import googleIcon from "../assets/google.svg";
import checkboxIcon from "../assets/checkbox.svg";
import bgImage2 from "../assets/registerbg.jpg";

const provinceCityMap: { [key: string]: string[] } = {
  "Aceh": ["Banda Aceh", "Sabang", "Langsa", "Lhokseumawe", "Subulussalam"],
  "Sumatera Utara": ["Medan", "Binjai", "Tebing Tinggi", "Pematangsiantar", "Padang Sidempuan"],
  "Sumatera Barat": ["Padang", "Bukittinggi", "Payakumbuh", "Sawahlunto", "Solok"],
  "Riau": ["Pekanbaru", "Dumai"],
  "Kepulauan Riau": ["Tanjung Pinang", "Batam"],
  "Jambi": ["Jambi", "Sungai Penuh"],
  "Bengkulu": ["Bengkulu"],
  "Sumatera Selatan": ["Palembang", "Lubuklinggau", "Pagar Alam", "Prabumulih"],
  "Kepulauan Bangka Belitung": ["Pangkal Pinang"],
  "Lampung": ["Bandar Lampung", "Metro"],
  "Banten": ["Serang", "Cilegon", "Tangerang", "Tangerang Selatan"],
  "DKI Jakarta": ["Jakarta Pusat", "Jakarta Utara", "Jakarta Timur", "Jakarta Barat", "Jakarta Selatan"],
  "Jawa Barat": ["Bandung", "Bekasi", "Bogor", "Depok", "Cimahi", "Sukabumi"],
  "Jawa Tengah": ["Semarang", "Surakarta", "Magelang", "Tegal", "Pekalongan", "Salatiga"],
  "DI Yogyakarta": ["Yogyakarta", "Sleman", "Bantul", "Gunung Kidul", "Kulon Progo"],
  "Jawa Timur": ["Surabaya", "Malang", "Kediri", "Mojokerto", "Pasuruan", "Probolinggo", "Blitar"],
  "Bali": ["Denpasar"],
  "Nusa Tenggara Barat": ["Mataram", "Bima"],
  "Nusa Tenggara Timur": ["Kupang"],
  "Kalimantan Barat": ["Pontianak", "Singkawang"],
  "Kalimantan Tengah": ["Palangka Raya"],
  "Kalimantan Selatan": ["Banjarmasin", "Banjarbaru"],
  "Kalimantan Timur": ["Balikpapan", "Samarinda", "Bontang"],
  "Kalimantan Utara": ["Tarakan"],
  "Sulawesi Utara": ["Manado", "Bitung", "Tomohon", "Kotamobagu"],
  "Sulawesi Tengah": ["Palu"],
  "Sulawesi Selatan": ["Makassar", "Parepare", "Palopo"],
  "Sulawesi Tenggara": ["Kendari", "Bau-Bau"],
  "Gorontalo": ["Gorontalo"],
  "Sulawesi Barat": ["Mamuju"],
  "Maluku": ["Ambon", "Tual"],
  "Maluku Utara": ["Ternate", "Tidore Kepulauan"],
  "Papua": ["Jayapura"],
  "Papua Barat": ["Manokwari", "Sorong"]
};

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const provinces = Object.keys(provinceCityMap);

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
        <div className="logo-container2">
          <img src={logo} alt="Setetes Harapan" className="register-logo" />
          <h1 className="register-title-main">SetetesHarapan</h1>
        </div>

        <h2 className="register-title">Daftar</h2>
        <p className="register-subtitle">Daftarkan dengan data yang valid</p>

        <div className="input-group">
          <label>Lembaga</label>
          <select name="lembaga" className="input-field">
            <option value="">Pilih Lembaga</option>
            <option value="Rumah Sakit">Rumah Sakit</option>
            <option value="PMI">PMI</option>
            <option value="Kemenkes">Kemenkes</option>
          </select>
        </div>

        <div className="input-group">
          <label>Nama Rumah Sakit / Nama UTD</label>
          <input type="text" placeholder="Nama Rumah Sakit" className="input-field" />
        </div>

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

        <div className="input-group">
          <label>Alamat</label>
          <input type="text" placeholder="Jln. Perumahan Permata Permai No.7, Bandung" className="input-field" />
        </div>

        <div className="input-group">
          <label>Provinsi</label>
          <select
            name="province"
            className="input-field"
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedCity("");
            }}
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((provinsi) => (
              <option key={provinsi} value={provinsi}>{provinsi}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Kota/Kabupaten</label>
          <select
            name="city"
            className="input-field"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedProvince}
          >
            <option value="">Pilih Kota/Kabupaten</option>
            {selectedProvince && provinceCityMap[selectedProvince]?.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

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

        <div className="register-options">
          <div className="agree-terms">
            <img src={checkboxIcon} alt="Checkbox" className="checkbox-icon" />
            <span>
              Saya setuju dengan <span className="terms">Persyaratan</span> dan {" "}
              <span className="policy">Kebijakan Privasi</span>
            </span>
          </div>
        </div>

        <Link to="/verification" className="register-button">
          Buat Akun
        </Link>

        <p className="login-text">
          Sudah memiliki akun? <Link to="/login" className="login-link">Masuk</Link>
        </p>

        <div className="separator">Atau daftar dengan</div>

        <button className="google-button">
          <img src={googleIcon} alt="Google" className="google-icon" />
          Lanjutkan dengan Google
        </button>
      </div>
    </div>
  );
};

export default Register;
