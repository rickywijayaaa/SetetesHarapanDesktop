import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const KurangDarah: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [donors, setDonors] = useState<any[]>([]);

  // Fetch donor data from the Supabase API
  useEffect(() => {
    fetch("http://localhost:8000/donor/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched donor data:", data);  // Log response to verify structure
        if (Array.isArray(data)) {
          setDonors(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching donor data:", error));
  }, []);

  // Filter Data Based on Search Query
  const filteredBloodData = donors.filter((blood) =>
    blood.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle DELETE
  const handleDelete = (iddarah: string) => {
    fetch(`http://localhost:8000/donor/${iddarah}/`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setDonors(donors.filter((donor) => donor.iddarah !== iddarah)); // Remove from local state
        }
      })
      .catch((error) => {
        console.error("Error deleting donor data:", error);
      });
  };

  return (
    <div className="kurang-darah-container-kd">
      {/* Navbar */}
      <div className="navbar-kd">
        <div className="navbar-left-kd">
          <Link to="/homepage">
            <img src={logo} alt="Setetes Harapan" className="logo-kd" />
          </Link>
          <Link to="/homepage" className="app-title-kd" style={{ textDecoration: 'none', color: 'inherit' }}>
          SetetesHarapan
          </Link>

        </div>
        <span className="navbar-text-kd">Rumah Sakit Borromeus</span>
        <button className="logout-button-kd">Logout</button>
      </div>

      {/* Card Container */}
      <div className="card-kd">
        {/* Tabs */}
        <div className="tabs-kd">
          <Link to="/edit" className="tab-kd" style={{ textDecoration: 'none', color: 'inherit' }}>Penambahan</Link>
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
            {filteredBloodData.map((blood) => (
              <tr key={blood.iddarah}>
                <td><a href="#">{blood.iddarah}</a></td>
                <td>{blood.tanggal_donor}</td>
                <td>{blood.first_name} {blood.last_name}</td>
                <td>{blood.golongan_darah}</td>
                <td>{blood.rhesus}</td>
                <td>{blood.jenis_darah}</td>
                <td>{blood.jumlah_darah}</td>
                <td>
                  <button className="use-button-kd" onClick={() => handleDelete(blood.iddarah)}>Pakai</button>
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
            <button className="send-button-kd" onClick={() => setShowModal(false)}>Kirim</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KurangDarah;