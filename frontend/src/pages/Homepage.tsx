import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

const Homepage: React.FC = () => {
  return (
    <div className="homepage-container">
      {/* Navbar */}
      <div className="navbar-hp">
        <div className="navbar-left-hp">
          <img src={logo} alt="Setetes Harapan" className="logo-hp" />
          <span className="app-title-hp">SetetesHarapan</span>
        </div>
        <span className="navbar-text-hp">Kementerian Kesehatan Indonesia</span>
        <button className="logout-button-hp">Logout</button>
      </div>

      {/* Dashboard Container */}
      <div className="dashboard-container">
        {/* Filters */}
        <div className="filters-hp">
          <input type="text" className="search-input-hp" placeholder="Cari Data..." />
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

          {/* Right Panel: Chart Placeholders */}
          <div className="right-panel-hp">
            <div className="chart-card-hp">
              <h3>Pertambahan Stok Darah</h3>
              <div className="chart-placeholder-hp">📊 Chart Placeholder</div>
            </div>

            <div className="chart-card-hp">
              <h3>Pengurangan Stok Darah</h3>
              <div className="chart-placeholder-hp">📊 Chart Placeholder</div>
            </div>

            <div className="chart-card-hp">
              <h3>Perbandingan Stok Darah</h3>
              <div className="chart-placeholder-hp">📊 Chart Placeholder</div>
            </div>

            <div className="chart-card-hp">
              <h3>Perbandingan Kebutuhan Darah</h3>
              <div className="chart-placeholder-hp">📊 Chart Placeholder</div>
            </div>
          </div>
        </div>

        {/* Server Time */}
        <div className="server-time-hp">
          <p>Server Time</p>
          <span>20 Desember 2025</span>
          <span className="time-hp">12:32:00</span>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
