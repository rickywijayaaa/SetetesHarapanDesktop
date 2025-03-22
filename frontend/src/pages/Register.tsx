import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    role: "",
    password: ""
  });

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    if (form.password !== confirmPassword) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/users/register", {
        ...form,
        city: selectedCity || "-",
        province: selectedProvince || "-",
        role: form.role || "Rumah Sakit",
        first_name: "-",
        last_name: "-",
        nik: "-",
        birth_date: null,
        jenis_kelamin: "-",
        golongan_darah: "-",
        rhesus: "-",
        riwayat_result: false,
        total_points: 0
      });

      alert("Registrasi berhasil!");
      navigate("/verification");
    } catch (err: any) {
      alert("Registrasi gagal: " + (err.response?.data?.detail || "Terjadi kesalahan"));
    }
  };

  return (
    <div className="register-container">
      <div className="register-bg" style={{
        backgroundImage: `url(${bgImage2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "50%",
        height: "170vh",
        position: "relative",
      }}>
        <div className="bg-overlay"></div>
      </div>

      <div className="register-form-container">
        <div className="logo-container2">
          <img src={logo} alt="Setetes Harapan" className="register-logo" />
          <h1 className="register-title-main">SetetesHarapan</h1>
        </div>

        <h2 className="register-title">Daftar</h2>
        <p className="register-subtitle">Daftarkan dengan data yang valid</p>

        <div className="input-group">
          <label>Lembaga</label>
          <select name="role" className="input-field" value={form.role} onChange={handleChange}>
            <option value="">Pilih Lembaga</option>
            <option value="Rumah Sakit">Rumah Sakit</option>
            <option value="PMI">PMI</option>
            <option value="Kemenkes">Kemenkes</option>
          </select>
        </div>

        <div className="input-group">
          <label>Nama Rumah Sakit / Nama UTD</label>
          <input type="text" name="name" placeholder="Nama Rumah Sakit" className="input-field" value={form.name} onChange={handleChange} />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="john.doe@gmail.com" className="input-field" value={form.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Nomor Telepon</label>
            <input type="text" name="phone_number" placeholder="+62-812-12345678" className="input-field" value={form.phone_number} onChange={handleChange} />
          </div>
        </div>

        <div className="input-group">
          <label>Alamat</label>
          <input type="text" name="address" placeholder="Alamat Lengkap" className="input-field" value={form.address} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Provinsi</label>
          <select className="input-field" value={selectedProvince} onChange={(e) => {
            setSelectedProvince(e.target.value);
            setSelectedCity("");
          }}>
            <option value="">Pilih Provinsi</option>
            {Object.keys(provinceCityMap).map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Kota/Kabupaten</label>
          <select className="input-field" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedProvince}>
            <option value="">Pilih Kota/Kabupaten</option>
            {provinceCityMap[selectedProvince]?.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="**********" className="input-field" value={form.password} onChange={handleChange} />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "🙈" : "👁"}</button>
          </div>
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input type={showConfirmPassword ? "text" : "password"} placeholder="**********" className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "🙈" : "👁"}</button>
          </div>
        </div>

        <div className="register-options">
          <div className="agree-terms">
            <img src={checkboxIcon} alt="Checkbox" className="checkbox-icon" />
            <span>
              Saya setuju dengan <span className="terms">Persyaratan</span> dan{" "}
              <span className="policy">Kebijakan Privasi</span>
            </span>
          </div>
        </div>

        <button className="register-button" onClick={handleRegister}>Buat Akun</button>

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
