import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests
import logo from "../assets/logo.png";

const Distribusi: React.FC = () => {
  const [distribusiData, setDistribusiData] = useState<any[]>([]); // Data fetched from the combined endpoint
  const [filters, setFilters] = useState({
    utd: "",
    status: "",
    stokDarah: "",
  });
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const rowsPerPage = 5; // Maximum number of rows per page

  // Fetch combined data (UTD names and stok darah) from the /combined-blood-distribution endpoint
  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        const response = await axios.get(
          "https://backend-setetesharapandesktop.up.railway.app/api/combined-blood-distribution"
        );
        const data = response.data.combined_blood_distribution || [];

        // Format the data to match your table structure with dynamic status
        const formattedData = data.map(
          (item: { name: string; total_donations: number }) => {
            let status = "";
            if (item.total_donations < 100) {
              status = "Kekurangan Darah"; // Less than 100
            } else if (
              item.total_donations >= 100 &&
              item.total_donations <= 300
            ) {
              status = "Ketersediaan Stok Cukup"; // 100-300
            } else {
              status = "Stok Darah Melebihi Kebutuhan"; // More than 300
            }

            return {
              utd: item.name, // Mapping name to utd
              status: status, // Use dynamic status based on stok darah
              stokDarah: `${item.total_donations}`, // Format stok darah
            };
          }
        );

        setDistribusiData(formattedData);
      } catch (error) {
        console.error("Error fetching combined data:", error);
      }
    };

    fetchCombinedData();
  }, []);

  // Filter data based on user input
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Apply filters to the data
  const filteredData = distribusiData.filter((item) => {
    return (
      (filters.utd ? item.utd.includes(filters.utd) : true) &&
      (filters.status ? item.status.includes(filters.status) : true) &&
      (filters.stokDarah
        ? item.stokDarah.includes(filters.stokDarah)
        : true)
    );
  });

  // Get current page data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Handle next and previous page actions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="distribusi-container">
      <div className="navbar-ed">
        <div className="navbar-left-ed">
          <Link
            to="/homepage"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src={logo} alt="Setetes Harapan" className="logo-ed" />
          </Link>
          <Link
            to="/homepage"
            className="app-title-ed"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            SetetesHarapan
          </Link>
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
            <option value="Ketersediaan Stok Cukup">
              Ketersediaan Stok Cukup
            </option>
            <option value="Stok Darah Melebihi Kebutuhan">
              Stok Darah Melebihi Kebutuhan
            </option>
          </select>

          <select
            name="stokDarah"
            value={filters.stokDarah}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Pilih Stok Darah</option>
            <option value="Kekurangan Darah">0 - 100</option>
            <option value="Ketersediaan Stok Cukup">100 - 300</option>
            <option value="Stok Darah Melebihi Kebutuhan">diatas 300</option>
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
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.utd}</td>
                <td>{item.status}</td>
                <td>{item.stokDarah}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        {/* Navigation button to Message component */}
        <div
          className="navigation-button-container"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          <Link to="/message" style={{ textDecoration: "none" }}>
            <button
              className="message-nav-button"
              style={{
                padding: "10px 20px",
                backgroundColor: "#d9534f",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#c9302c")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#d9534f")
              }
            >
              Buat Permintaan Pengiriman Darah
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Distribusi;
