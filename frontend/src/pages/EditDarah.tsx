import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

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

const EditDarah: React.FC = () => {
  const [activeTab, setActiveTab] = useState("penambahan");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    nik: "",
    phone_number: "",
    golongan_darah: "",
    rhesus: "",
    jenis_darah: "",
    jumlah_darah: "",
    iddarah: "",
    petugas: "",
    tanggal_donor: "",
    waktu_donor: "",
    province_donor: "",
    city_donor: "",
  });

  const [userInfo, setUserInfo] = useState<{ iduser: string; name: string; role: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user_info");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserInfo(parsed);
      } catch (err) {
        console.error("❌ Failed to parse user_info:", err);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://backend-setetesharapandesktop.up.railway.app/donor/", formData);
      alert("Data berhasil ditambahkan!");
  
      // ✅ Clear form inputs
      setFormData({
        first_name: "",
        last_name: "",
        nik: "",
        phone_number: "",
        golongan_darah: "",
        rhesus: "",
        jenis_darah: "",
        jumlah_darah: "",
        iddarah: "",
        petugas: "",
        tanggal_donor: "",
        waktu_donor: "",
        province_donor: "",
        city_donor: "",
      });
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan darah.");
  
      // (Optional) Also reset form after failure
      setFormData({
        first_name: "",
        last_name: "",
        nik: "",
        phone_number: "",
        golongan_darah: "",
        rhesus: "",
        jenis_darah: "",
        jumlah_darah: "",
        iddarah: "",
        petugas: "",
        tanggal_donor: "",
        waktu_donor: "",
        province_donor: "",
        city_donor: "",
      });
    }
  };
  

  return (
    <div className="edit-darah-container-ed">
      {/* ✅ Navbar with dynamic user info */}
      <div className="navbar-ed">
        <div className="navbar-left-ed">
          <Link to="/homepage" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={logo} alt="Setetes Harapan" className="logo-ed" />
          </Link>
          <Link to="/homepage" className="app-title-ed" style={{ textDecoration: 'none', color: 'inherit' }}>SetetesHarapan</Link>
        </div>
        <span className="navbar-text-ed">
          {userInfo
            ? `${userInfo.role === "kemenkes"
              ? "Kementerian Kesehatan Indonesia"
              : userInfo.role === "pmi"
              ? "Palang Merah Indonesia"
              : "Rumah Sakit"} - ${userInfo.name}`
            : "Memuat user..."}
        </span>
        <button
          className="logout-button-ed"
          onClick={() => {
            localStorage.removeItem("user_info");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Form Card */}
      <div className="card-ed">
        <div className="tabs-ed">
          <button className={activeTab === "penambahan" ? "tab-ed active-ed" : "tab-ed"} onClick={() => setActiveTab("penambahan")}>Penambahan</button>
          <Link to="/KurangDarah" className={activeTab === "pengurangan" ? "tab-ed active-ed" : "tab-ed"} style={{ textDecoration: 'none', color: 'inherit' }}>Pengurangan</Link>
        </div>

        <form className="blood-form-ed" onSubmit={handleSubmit}>
          <h2 className="section-title-ed">Identitas Diri</h2>
          <div className="input-group-ed">
            <input type="text" placeholder="Nama Awal" name="first_name" value={formData.first_name} onChange={handleInputChange} />
            <input type="text" placeholder="Nama Akhir" name="last_name" value={formData.last_name} onChange={handleInputChange} />
          </div>
          <div className="input-group-ed">
            <input type="text" placeholder="NIK" name="nik" value={formData.nik} onChange={handleInputChange} />
            <input type="text" placeholder="Nomor Telepon" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
          </div>

          <h2 className="section-title-ed">Identitas Darah</h2>
          <div className="input-group-ed">
            <select name="golongan_darah" value={formData.golongan_darah} onChange={handleInputChange}>
              <option>Golongan Darah</option><option>A</option><option>B</option><option>AB</option><option>O</option>
            </select>
            <select name="rhesus" value={formData.rhesus} onChange={handleInputChange}>
              <option>Rhesus</option><option>Positif</option><option>Negatif</option>
            </select>
          </div>
          <div className="input-group-ed">
            <select name="jenis_darah" value={formData.jenis_darah} onChange={handleInputChange}>
            <option value="">Jenis Darah</option>
              <option value="AHF">AHF</option>
              <option value="BC">BC</option>
              <option value="FFP">FFP</option>
              <option value="FFP 450">FFP 450</option>
              <option value="FFP Aferesis">FFP Aferesis</option>
              <option value="FFP Fraksionasi">FFP Fraksionasi</option>
              <option value="FFP Konvalesen">FFP Konvalesen</option>
              <option value="FFP PKC">FFP PKC</option>
              <option value="FP">FP</option>
              <option value="FP72">FP72</option>
              <option value="Lekosit Eferesis">Lekosit Eferesis</option>
              <option value="Lekosit Apheresis">Lekosit Apheresis</option>
              <option value="Leucodepleted">Leucodepleted</option>
              <option value="Leucoreduce">Leucoreduce</option>
              <option value="LP">LP</option>
              <option value="LP Aferesis">LP Aferesis</option>
              <option value="LP Apheresis">LP Apheresis</option>
              <option value="LP PKC">LP PKC</option>
              <option value="PCL">PCL</option>
              <option value="PCR">PCR</option>
              <option value="PF">PF</option>
              <option value="PK">PK</option>
              <option value="Plasma Konvalesen">Plasma Konvalesen</option>
              <option value="PRC">PRC</option>
              <option value="PRC - LC">PRC - LC</option>
              <option value="PRC 450">PRC 450</option>
              <option value="PRC Eferesis">PRC Eferesis</option>
              <option value="PRC BCR">PRC BCR</option>
              <option value="PRC CPD">PRC CPD</option>
              <option value="PRC Leucodepleted">PRC Leucodepleted</option>
              <option value="PRC Leucodepletet">PRC Leucodepletet</option>
              <option value="PRC, Leucoreduce">PRC, Leucoreduce</option>
              <option value="PRC SAGM">PRC SAGM</option>
              <option value="PRC-BCR">PRC-BCR</option>
              <option value="PRC-NAT">PRC-NAT</option>
              <option value="PRP">PRP</option>
              <option value="SAGM">SAGM</option>
              <option value="TC">TC</option>
              <option value="TC Aferesis">TC Aferesis</option>
              <option value="TC Apheresi">TC Apheresi</option>
              <option value="TC Apheresis">TC Apheresis</option>
              <option value="TC APR">TC APR</option>
              <option value="TC Tromboferesis">TC Tromboferesis</option>
              <option value="TC-APH">TC-APH</option>
              <option value="TCP">TCP</option>
              <option value="WB">WB</option>
              <option value="WB Fresh">WB Fresh</option>
              <option value="WB Leucodepletet">WB Leucodepletet</option>
              <option value="WE">WE</option>
              <option value="WE Leucodepleted">WE Leucodepleted</option>
            </select>
            <input type="text" placeholder="Jumlah Darah yang Diambil (mL)" name="jumlah_darah" value={formData.jumlah_darah} onChange={handleInputChange} />
          </div>

          <div className="input-group-ed">
            <input type="text" placeholder="Nomor ID Darah" name="iddarah" value={formData.iddarah} onChange={handleInputChange} />
            <input type="text" placeholder="Petugas yang Menangani" name="petugas" value={formData.petugas} onChange={handleInputChange} />
          </div>

          <div className="input-group-ed">
            <input type="date" name="tanggal_donor" value={formData.tanggal_donor} onChange={handleInputChange} />
            <input type="time" name="waktu_donor" value={formData.waktu_donor} onChange={handleInputChange} />
          </div>

          <div className="input-group-ed">
            <select name="province_donor" value={formData.province_donor} onChange={handleInputChange}>
              <option value="">Pilih Provinsi</option>
              {provinces.map((prov) => <option key={prov} value={prov}>{prov}</option>)}
            </select>
            <select name="city_donor" value={formData.city_donor} onChange={handleInputChange} disabled={!formData.province_donor}>
              <option value="">Pilih Kota/Kabupaten</option>
              {provinceCityMap[formData.province_donor]?.map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>

          <button type="submit" className="submit-button-ed">Tambah Darah</button>
        </form>
      </div>
    </div>
  );
};

export default EditDarah;
