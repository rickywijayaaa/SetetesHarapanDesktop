import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const KurangDarah: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample Blood Data
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

  // Filter Data Based on Search Query
  const filteredBloodData = bloodData.filter((blood) =>
    blood.donor.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Search and Filters */}
        <div className="filters-container-kd">
          {/* Search Bar */}
          <input
            type="text"
            className="search-input-kd"
            placeholder="Cari Pendonor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

        {/* Filters - Right Aligned */}
        <div className="filters-right-kd">
            <select>
            <option value="">Pilih Golongan</option>
            <option value="O">O</option>
            <option value="A">A</option>
            <option value="AB">AB</option>
            <option value="B">B</option>
            </select>

            <select>
            <option value="">Pilih Rhesus</option>
            <option value="+">+</option>
            <option value="-">-</option>
            </select>

            <select>
            <option>Pilih Jenis</option>
            </select>
        </div>
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
            {filteredBloodData.map((blood, index) => (
              <tr key={index}>
                <td><a href="#">{blood.id}</a></td>
                <td>{blood.date}</td>
                <td>{blood.donor}</td>
                <td>{blood.type}</td>
                <td>{blood.rhesus}</td>
                <td>{blood.kind}</td>
                <td>{blood.volume}</td>
                <td>
                  <button className="use-button-kd" onClick={() => setShowModal(true)}>Pakai</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pop-up Modal */}
      {showModal && (
        <div className="modal-overlay-kd">
          <div className="modal-container-kd">
            <div className="modal-header-kd">
              <h2>Tuliskan pesan <br /> terima kasih!</h2>
              <button className="close-button-kd" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body-kd">
              <input type="text" placeholder="Nama Pengirim" />
              <input type="text" placeholder="Nama Penerima" />
              <textarea placeholder="Tuliskan Pesan"></textarea>
            </div>
            <button className="send-button-kd">Kirim</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KurangDarah;
