import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";
import { createClient } from "@supabase/supabase-js";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";

// Inisialisasi Supabase client
const supabaseUrl = "https://opoxtyinqfbsqxlgrewy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wb3h0eWlucWZic3F4bGdyZXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NzcwMjEsImV4cCI6MjA1NzI1MzAyMX0.7gF1CBzw8vgrLxtINKkd1JTv8rTuu_iZF6xk5dXGxi4";
const supabase = createClient(supabaseUrl, supabaseKey);

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  // Fungsi untuk melakukan logout
  const handleLogout = async () => {
    try {
      // Sign out dari Supabase Auth
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error logging out:", error.message);
        return;
      }

      // Hapus data user dari localStorage jika ada
      localStorage.removeItem("tempUserData");

      // Redirect ke halaman hero/landing page
      navigate("/");
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    }
  };

  // Pie chart data for "Perbandingan Stok Darah"
  const data = {
    labels: ["A", "B", "AB", "O"],
    datasets: [
      {
        label: "Blood Type Distribution",
        data: [50, 25, 15, 10], // Example data
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <div className="navbar-hp">
        <div className="navbar-left-hp">
          <img src={logo} alt="Setetes Harapan" className="logo-hp" />
          <span className="app-title-hp">SetetesHarapan</span>
        </div>
        <span className="navbar-text-hp">Kementerian Kesehatan Indonesia</span>
        <button className="logout-button-hp" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Dashboard Container */}
      <div className="dashboard-container">
        {/* Filters */}
        <div className="filters-hp">
          <input
            type="text"
            className="search-input-hp"
            placeholder="Cari Data..."
          />
          <button className="filter-button-hp">Golongan</button>
          <button className="filter-button-hp">Jenis</button>
        </div>

        {/* Two-Column Layout for Stats and Charts */}
        <div className="main-content-hp">
          {/* Left Panel: Statistics Cards */}
          <div className="left-panel-hp">
            <div className="stats-card-hp total-blood">
              <h3>Total Darah Tersedia</h3>
              <p className="stats-value-hp">
                4.300.000 <span>Kantong</span>
              </p>
              <p className="stats-subtext-hp">-1.300.000 dari Anjuran WHO</p>
            </div>

            <div className="stats-card-hp">
              <h3>Total Pendonor</h3>
              <p className="stats-value-hp">
                20.000 <span>Kantong</span>
              </p>
            </div>

            <div className="stats-card-hp">
              <h3>Total di Donor</h3>
              <p className="stats-value-hp">
                30.000 <span>Kantong</span>
              </p>
            </div>
          </div>

          {/* Right Panel: Pie Charts */}
          <div className="right-panel-hp">
            {/* Pie Chart for Blood Type Distribution */}
            <div className="chart-card-hp">
              <h3>Perbandingan Stok Darah</h3>
              <div className="chart-placeholder-hp">
                <Pie data={data} />
              </div>
            </div>

            {/* Placeholder for other charts */}
            <div className="chart-card-hp">
              <h3>Pertambahan Stok Darah</h3>
              <div className="chart-placeholder-hp">📊 Chart Placeholder</div>
            </div>

            <div className="chart-card-hp">
              <h3>Pengurangan Stok Darah</h3>
              <div className="chart-placeholder-hp">📊 Chart Placeholder</div>
            </div>

            <div className="chart-card-hp">
              <h3>Perbandingan Kebutuhan Darah</h3>
              <div className="chart-placeholder-hp">📊 Chart Placeholder</div>
            </div>
          </div>
        </div>

        {/* Server Time */}
        <div className="server-time-hp w-[831px] h-16 relative rounded-[20px] bg-red-800 bg-opacity-30">
          <div className="server-time-title left-[20px] top-[20px] absolute justify-start text-white text-xl font-bold font-['Poppins'] tracking-tight">
            Server Time
          </div>
          <div className="server-date left-[500px] top-[20px] absolute justify-start text-white text-xl font-medium font-['Poppins'] tracking-tight">
            20 Desember 2025
          </div>
          <div className="server-time left-[717px] top-[20px] absolute justify-start text-white text-xl font-bold font-['Poppins'] tracking-tight">
            12:32:00
          </div>

          {/* Edit Darah Button */}
          <div className="edit-button-container absolute right-6 top-[12px]">
            <button
              className="edit-darah-button bg-red-800 text-white rounded-[10px] py-2 px-6 text-lg"
              onClick={() => navigate("/edit")}
            >
              Edit Darah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
