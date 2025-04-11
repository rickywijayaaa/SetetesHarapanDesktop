import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const Distribusi: React.FC = () => {
  const [distribusiData, setDistribusiData] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    utd: "",
    status: "",
    stokDarah: "",
  });

  // Fetch data from backend for PMI users
  useEffect(() => {
    const fetchPMIUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users/pmi");
        const data = response.data.pmi_users || [];
        const formattedData = data.map((user: { name: string }) => ({
          utd: user.name, // Assuming user names are treated as UTD names
          status: "Tersedia", // Default status
          stokDarah: "500", // Default stock of blood
        }));
        setDistribusiData(formattedData);
      } catch (error) {
        console.error("Error fetching UTD data:", error);
      }
    };

    fetchPMIUsers();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = distribusiData.filter((item) => {
    return (
      (filters.utd ? item.utd.includes(filters.utd) : true) &&
      (filters.status ? item.status.includes(filters.status) : true) &&
      (filters.stokDarah ? item.stokDarah.includes(filters.stokDarah) : true)
    );
  });

  return (
    <div className="distribusi-container">
      <div className="navbar-ed">
        <div className="navbar-left-ed">
          <Link to="/homepage" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={logo} alt="Setetes Harapan" className="logo-ed" />
          </Link>
          <Link to="/homepage" className="app-title-ed" style={{ textDecoration: 'none', color: 'inherit' }}>SetetesHarapan</Link>
        </div>
        <span className="navbar-text-ed">Kementerian Kesehatan Indonesia</span>
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

      <div className="distribusi-card-ed">
        <h2>Informasi Distribusi Darah</h2>

        <div className="filters-container">
          <select
            name="utd"
            value={filters.utd}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Pilih UTD</option>
            {distribusiData.map((item, index) => (
              <option key={index} value={item.utd}>
                {item.utd}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Pilih Status</option>
            <option value="Kekurangan Darah">Kekurangan Darah</option>
            <option value="Ketersediaan Stok Cukup">Ketersediaan Stok Cukup</option>
            <option value="Stok Darah Melebihi Kebutuhan">Stok Darah Melebihi Kebutuhan</option>
          </select>

          <select
            name="stokDarah"
            value={filters.stokDarah}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Pilih Stok Darah</option>
            <option value="500">500 mL</option>
            <option value="250">250 mL</option>
            <option value="750">750 mL</option>
            <option value="1000">1000 mL</option>
          </select>
        </div>

        <table className="distribusi-table">
          <thead>
            <tr>
              <th>UTD</th>
              <th>Status</th>
              <th>Stok Darah</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.utd}</td>
                <td>{item.status}</td>
                <td>{item.stokDarah} mL</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Distribusi;
