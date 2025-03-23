import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

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

const provinces = Object.keys(provinceCityMap);

const BlastingInfo: React.FC = () => {
  const [formData, setFormData] = useState({
    hospital_name: "RS. Borromeus",
    hospital_address: "Jl. Ir. H. Djuanda No 100",
    province: "",
    city: "",
    blood_type: "",
    rhesus: "",
    deadline: "",
    additional_message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="blasting-info-container">
      {/* Navbar */}
      <div className="blasting-card">
        <div className="navbar-blasting">
          <div className="navbar-left-blasting">
            <Link to="/">
              <img src={logo} alt="Setetes Harapan" className="logo-blasting" />
            </Link>
            <span className="app-title-blasting">SetetesHarapan</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="form-container-blasting">
          <h2 className="form-title-blasting">Form Blasting Notifikasi</h2>

          {/* Form Grid Layout */}
          <div className="blasting-content">
            {/* Left Column */}
            <div className="form-group-blasting">
              <label className="blasting-label">Nama Rumah Sakit</label>
              <select 
                className="blasting-select"
                name="hospital_name"
                value={formData.hospital_name}
                onChange={handleInputChange}
              >
                <option>RS. Borromeus</option>
              </select>
            </div>

            <div className="form-group-blasting">
              <label className="blasting-label">Alamat Rumah Sakit</label>
              <select 
                className="blasting-select"
                name="hospital_address"
                value={formData.hospital_address}
                onChange={handleInputChange}
              >
                <option>Jl. Ir. H. Djuanda No 100</option>
              </select>
            </div>

            <div className="form-group-blasting">
              <label className="blasting-label">Provinsi Rumah Sakit</label>
              <select 
                className="blasting-select"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>

            <div className="form-group-blasting">
              <label className="blasting-label">Kota / Kabupaten Rumah Sakit</label>
              <select 
                className="blasting-select"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!formData.province}
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {formData.province && provinceCityMap[formData.province]?.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group-blasting">
              <label className="blasting-label">Golongan Darah</label>
              <select 
                className="blasting-select"
                name="blood_type"
                value={formData.blood_type}
                onChange={handleInputChange}
              >
                <option value="">Pilih Golongan Darah</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>

            <div className="form-group-blasting">
              <label className="blasting-label">Rhesus</label>
              <select 
                className="blasting-select"
                name="rhesus"
                value={formData.rhesus}
                onChange={handleInputChange}
              >
                <option value="">Pilih Rhesus</option>
                <option value="+">+</option>
                <option value="-">-</option>
              </select>
            </div>

            <div className="form-group-blasting">
              <label className="blasting-label">Deadline</label>
              <input 
                type="date"
                className="blasting-select"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Full Width Textarea */}
          <div className="form-group-blasting full-width">
            <label className="blasting-label">Tambahan Pesan</label>
            <textarea
              className="blasting-textarea"
              placeholder="Tambahan pesan jika ada"
              name="additional_message"
              value={formData.additional_message}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className="submit-button-blasting">
            Sebarkan Notifikasi Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlastingInfo;