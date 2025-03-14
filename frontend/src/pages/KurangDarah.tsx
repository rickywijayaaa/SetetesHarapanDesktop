import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const KurangDarah: React.FC = () => {
  const [activeTab, setActiveTab] = useState("pengurangan");

  // Sample Blood Data (Should be replaced with real API data)
  const bloodData = [
    { id: "#AHGA68", date: "23/09/2022", donor: "Micky Valentino", type: "A", rhesus: "-", kind: "AHF", volume: "500" },
    { id: "#AHGA69", date: "23/09/2022", donor: "Naomi Pricilla", type: "B", rhesus: "+", kind: "BC", volume: "250" },
    { id: "#AHGA70", date: "23/09/2022", donor: "Nasywaa Anggun", type: "O", rhesus: "-", kind: "FFP", volume: "750" },
    { id: "#AHGA71", date: "23/09/2022", donor: "Ricky Wijaya", type: "AB", rhesus: "+", kind: "FFP Aferesis", volume: "1000" },
    { id: "#AHGA72", date: "23/09/2022", donor: "Kimmy", type: "B", rhesus: "-", kind: "PRC Leukodepleted", volume: "250" },
    { id: "#AHGA73", date: "23/09/2022", donor: "Kenzo", type: "A", rhesus: "+", kind: "FFP", volume: "500" },
    { id: "#AHGA74", date: "23/09/2022", donor: "Huru", type: "B", rhesus: "+", kind: "PRP", volume: "400" },
    { id: "#AHGA75", date: "23/09/2022", donor: "Hara", type: "AB", rhesus: "+", kind: "SAGM", volume: "400" },
    { id: "#AHGA76", date: "23/09/2022", donor: "Botbot", type: "O", rhesus: "-", kind: "TC", volume: "250" },
  ];

  return (
    <div className="kurang-darah-container-kd">
      {/* Navbar */}
      <div className="navbar-kd">
        <div className="navbar-left-kd">
          <Link to="/">
            <img src={logo} alt="Setetes Harapan" className="logo-kd" />
          </Link>
          <span className="app-title-kd">SetetesHarapan</span>
        </div>
        <span className="navbar-text-kd">Rumah Sakit Borromeus</span>
        <button className="logout-button-kd">Logout</button>
      </div>

      {/* Card Container */}
      <div className="card-kd">
        {/* Tabs */}
        <div className="tabs-kd">
          <Link to="/edit" className="tab-kd">Penambahan</Link>
          <button className="tab-kd active-kd">Pengurangan</button>
        </div>

        {/* Blood Information */}
        <h2 className="section-title-kd">Informasi Ketersediaan Darah</h2>

        {/* Filters */}
        <div className="filters-kd">
        {/* Golongan Darah Selection */}
        <select>
            <option value="">Pilih Golongan</option>
            <option value="O">O</option>
            <option value="A">A</option>
            <option value="AB">AB</option>
            <option value="B">B</option>
        </select>

        {/* Rhesus Selection */}
        <select>
            <option value="">Pilih Rhesus</option>
            <option value="+">+</option>
            <option value="-">-</option>
        </select>

        {/* Jenis Darah Selection (Kept the same) */}
        <select>
            <option>Pilih Jenis</option>
        </select>
        </div>


        {/* Table */}
        <table className="blood-table-kd">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tanggal</th>
              <th>Nama Pendonor</th>
              <th>Golongan</th>
              <th>Rhesus</th>
              <th>Jenis</th>
              <th>Jumlah (mL)</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bloodData.map((blood, index) => (
              <tr key={index}>
                <td><a href="#">{blood.id}</a></td>
                <td>{blood.date}</td>
                <td>{blood.donor}</td>
                <td>{blood.type}</td>
                <td>{blood.rhesus}</td>
                <td>{blood.kind}</td>
                <td>{blood.volume}</td>
                <td><button className="use-button-kd">Pakai</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KurangDarah;
