import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const EditDarah: React.FC = () => {
  const [activeTab, setActiveTab] = useState("penambahan");
  
  // Form state to manage the input values
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    nik: "",
    phone_number: "",
    golongan_darah: "",
    rhesus: "",
    jenis_darah: "",
    jumlah_darah: "",
    idkantongdarah: "",
    petugas: "",
    tanggal_donor: "", // Will be a string in the format YYYY-MM-DD
    waktu_donor: "", // Will be a string in the format HH:MM:SS
    province_donor: "",
    city_donor: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send POST request to the backend
      const response = await axios.post("http://127.0.0.1:8000/donor/", formData);

      // You can handle the response here
      alert("Data berhasil ditambahkan!");
      console.log(response.data);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("Gagal menambahkan darah, coba lagi.");
    }
  };

  return (
    <div className="edit-darah-container-ed">
      {/* Navbar */}
      <div className="navbar-ed">
        <div className="navbar-left-ed">
          <Link to="/homepage">
            <img src={logo} alt="Setetes Harapan" className="logo-ed" />
          </Link>
          <Link to="/homepage" className="app-title-ed" style={{ textDecoration: 'none', color: 'inherit' }}>
          SetetesHarapan
          </Link>
        </div>
        <span className="navbar-text-ed">Kementrian Kesehatan Indonesia</span>
        <button className="logout-button-ed">Logout</button>
      </div>

      {/* Card Container */}
      <div className="card-ed">
        {/* Tabs */}
        <div className="tabs-ed">
          <button
            className={activeTab === "penambahan" ? "tab-ed active-ed" : "tab-ed"}
            onClick={() => setActiveTab("penambahan")}
          >
            Penambahan
          </button>
          <Link
            to="/KurangDarah"
            className={activeTab === "pengurangan" ? "tab-ed active-ed" : "tab-ed"}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Pengurangan
          </Link>
        </div>

        {/* Form */}
        <form className="blood-form-ed" onSubmit={handleSubmit}>
          <h2 className="section-title-ed">Identitas Diri</h2>

          <div className="input-group-ed">
            <input
              type="text"
              placeholder="Nama Awal"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Nama Akhir"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group-ed">
            <input
              type="text"
              placeholder="NIK"
              name="nik"
              value={formData.nik}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Nomor Telepon"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>

          <h2 className="section-title-ed">Identitas Darah</h2>

          <div className="input-group-ed">
            <select
              name="golongan_darah"
              value={formData.golongan_darah}
              onChange={handleInputChange}
            >
              <option>Golongan Darah</option>
              <option>A</option>
              <option>B</option>
              <option>AB</option>
              <option>O</option>
            </select>
            <select
              name="rhesus"
              value={formData.rhesus}
              onChange={handleInputChange}
            >
              <option>Rhesus</option>
              <option>Positif</option>
              <option>Negatif</option>
            </select>
          </div>

          <div className="input-group-ed">
            <select
              name="jenis_darah"
              value={formData.jenis_darah}
              onChange={handleInputChange}
            >
              <option>Jenis Darah</option>
              <option>FFP</option>
              <option>PRC</option>
              <option>WB</option>
            </select>
            <input
              type="text"
              placeholder="Jumlah Darah yang Diambil (mL)"
              name="jumlah_darah"
              value={formData.jumlah_darah}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group-ed">
            <input
              type="text"
              placeholder="Nomor Kantong Darah"
              name="idkantongdarah"
              value={formData.idkantongdarah}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Petugas yang Menangani"
              name="petugas"
              value={formData.petugas}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group-ed">
            {/* Date input for tanggal_donor */}
            <input
              type="date"
              name="tanggal_donor"
              value={formData.tanggal_donor}
              onChange={handleInputChange}
            />
            {/* Time input for waktu_donor */}
            <input
              type="time"
              name="waktu_donor"
              value={formData.waktu_donor}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group-ed">
            <input
              type="text"
              placeholder="Provinsi"
              name="province_donor"
              value={formData.province_donor}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Kota Donor"
              name="city_donor"
              value={formData.city_donor}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="submit-button-ed">Tambah Darah</button>
        </form>
      </div>
    </div>
  );
};

export default EditDarah;
