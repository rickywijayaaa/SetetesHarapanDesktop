import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const EditDarah: React.FC = () => {
  const [activeTab, setActiveTab] = useState("penambahan");

  return (
    <div className="edit-darah-container-ed">
      {/* Navbar */}
      <div className="navbar-ed">
        <div className="navbar-left-ed">
          <Link to="/">
            <img src={logo} alt="Setetes Harapan" className="logo-ed" />
          </Link>
          <span className="app-title-ed">SetetesHarapan</span>
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
            >
            Pengurangan
            </Link>

        </div>

        {/* Form */}
        <form className="blood-form-ed">
          <h2 className="section-title-ed">Identitas Diri</h2>

          <div className="input-group-ed">
            <input type="text" placeholder="Nama Awal" />
            <input type="text" placeholder="Nama Akhir" />
          </div>

          <div className="input-group-ed">
            <input type="text" placeholder="NIK" />
            <input type="text" placeholder="Nomor Telepon" />
          </div>

          <h2 className="section-title-ed">Identitas Darah</h2>

          <div className="input-group-ed">
            <select>
              <option>Golongan Darah</option>
              <option>A</option>
              <option>B</option>
              <option>AB</option>
              <option>O</option>
            </select>
            <select>
              <option>Rhesus</option>
              <option>+</option>
              <option>-</option>
            </select>
          </div>

          <div className="input-group-ed">
            <select>
              <option>Jenis Darah</option>
              <option>FFP</option>
              <option>PRC</option>
              <option>WB</option>
            </select>
            <input type="text" placeholder="Jumlah Darah yang Diambil (mL)" />
          </div>

          <div className="input-group-ed">
            <input type="text" placeholder="Nomor Kantong Darah" />
            <input type="text" placeholder="Petugas yang Menangani" />
          </div>

          <div className="input-group-ed">
            <input type="text" placeholder="Tanggal Donor" />
            <input type="text" placeholder="Waktu Donor" />
          </div>

          <div className="input-group-ed">
            <input type="text" placeholder="Provinsi" />
            <input type="text" placeholder="Kota Donor" />
          </div>

          <button className="submit-button-ed">Tambah Darah</button>
        </form>
      </div>
    </div>
  );
};

export default EditDarah;
