import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "../App.css";
import { createClient } from "@supabase/supabase-js";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import IndonesiaMap from "../pages/IndonesianMap";

// Inisialisasi Supabase client
const supabaseUrl = "https://opoxtyinqfbsqxlgrewy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wb3h0eWlucWZic3F4bGdyZXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NzcwMjEsImV4cCI6MjA1NzI1MzAyMX0.7gF1CBzw8vgrLxtINKkd1JTv8rTuu_iZF6xk5dXGxi4";
const supabase = createClient(supabaseUrl, supabaseKey);

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// API base URL
const API_BASE_URL = "http://localhost:8000"; // Sesuaikan dengan URL backend Anda

// Interval refresh (dalam milidetik) - 1 detik
const REFRESH_INTERVAL = 1000;

interface DashboardData {
  tanggal: string;
  total_kantong: number;
  total_darah_harian: number;
  total_pendonor: number;
  stok_per_golongan: Record<string, number>;
  stok_per_jenis: Record<string, number>;
  distribusi_per_kota: Record<string, number>;
  user_info: {
    role: string;
    full_name: string;
  };
}

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Filter states
  const [cityFilter, setCityFilter] = useState("");
  const [golonganFilter, setGolonganFilter] = useState("");
  const [jenisFilter, setJenisFilter] = useState("");

  // Auto-refresh toggle
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    // Don't show loading indicator for subsequent real-time updates
    if (!dashboardData) {
      setIsLoading(true);
    }

    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (cityFilter) params.append("city", cityFilter);
      if (golonganFilter) params.append("golongan", golonganFilter);
      if (jenisFilter) params.append("jenis", jenisFilter);

      // Add timestamp to prevent caching
      params.append("_t", new Date().getTime().toString());

      // Make API request
      const response = await axios.get(`${API_BASE_URL}/api/dashboard`, {
        params,
      });
      setDashboardData(response.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Gagal memuat data dashboard. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update the server time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Real-time data refresh effect
  useEffect(() => {
    // Initial fetch
    fetchDashboardData();

    // Set up interval for real-time updates
    let intervalId: NodeJS.Timeout | null = null;

    if (autoRefresh) {
      intervalId = setInterval(() => {
        fetchDashboardData();
      }, REFRESH_INTERVAL);
    }

    // Clean up on unmount or when dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [cityFilter, golonganFilter, jenisFilter, autoRefresh]);

  // Handle logout function
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error.message);
        return;
      }
      localStorage.removeItem("tempUserData");
      navigate("/");
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    }
  };

  // Toggle auto refresh
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  // Prepare pie chart data for blood type distribution
  const preparePieChartData = () => {
    if (!dashboardData || !dashboardData.stok_per_golongan) {
      return {
        labels: ["A", "B", "AB", "O"],
        datasets: [
          {
            label: "Blood Type Distribution",
            data: [0, 0, 0, 0],
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
    }

    const golonganDarah = dashboardData.stok_per_golongan;

    return {
      labels: Object.keys(golonganDarah),
      datasets: [
        {
          label: "Blood Type Distribution",
          data: Object.values(golonganDarah),
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
  };

  // Filter handlers
  const handleCitySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityFilter(e.target.value);
  };

  const handleGolonganFilter = () => {
    // Show dropdown or modal for blood type selection
    const golongan = prompt("Masukkan golongan darah (A, B, AB, O):");
    if (golongan) {
      setGolonganFilter(golongan);
    }
  };

  const handleJenisFilter = () => {
    // Show dropdown or modal for blood component type selection
    const jenis = prompt(
      "Masukkan jenis darah (Whole Blood, Platelet, Plasma, etc):"
    );
    if (jenis) {
      setJenisFilter(jenis);
    }
  };

  // Function to clear all filters
  const clearFilters = () => {
    setCityFilter("");
    setGolonganFilter("");
    setJenisFilter("");
  };

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <div className="navbar-hp">
        <div className="navbar-left-hp">
          <img src={logo} alt="Setetes Harapan" className="logo-hp" />
          <span className="app-title-hp">SetetesHarapan</span>
        </div>
        <span className="navbar-text-hp">
          {dashboardData?.user_info?.role === "kemenkes"
            ? "Kementerian Kesehatan Indonesia"
            : dashboardData?.user_info?.role === "pmi"
            ? "Palang Merah Indonesia"
            : "Rumah Sakit"}
        </span>
        <div className="navbar-actions">
          <button
            className="edit-darah-button navbar-button"
            onClick={() => navigate("/edit")}
          >
            Edit Darah
          </button>
          <button className="logout-button-hp" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Container */}
      <div className="dashboard-container">
        {/* Filters and Real-time Control Bar */}
        <div className="control-bar">
          <div className="filters-hp">
            <input
              type="text"
              className="search-input-hp"
              placeholder="Cari Kota..."
              value={cityFilter}
              onChange={handleCitySearch}
            />
            <button className="filter-button-hp" onClick={handleGolonganFilter}>
              {golonganFilter ? `Golongan: ${golonganFilter}` : "Golongan"}
            </button>
            <button className="filter-button-hp" onClick={handleJenisFilter}>
              {jenisFilter ? `Jenis: ${jenisFilter}` : "Jenis"}
            </button>
            {(cityFilter || golonganFilter || jenisFilter) && (
              <button
                className="filter-button-hp clear-filter"
                onClick={clearFilters}
              >
                Hapus Filter
              </button>
            )}
          </div>

          <div className="realtime-controls">
            <button
              className={`refresh-toggle ${
                autoRefresh ? "active" : "inactive"
              }`}
              onClick={toggleAutoRefresh}
            >
              <div className="status-dot"></div>
              <span>
                {autoRefresh ? "Auto Refresh Aktif" : "Auto Refresh Nonaktif"}
              </span>
            </button>
            {lastUpdated && (
              <span className="last-updated">
                Diperbarui:{" "}
                {lastUpdated.toLocaleTimeString("id-ID", { hour12: false })}
              </span>
            )}
          </div>
        </div>

        {isLoading && !dashboardData ? (
          <div className="loading-container">
            <p>Memuat data dashboard...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={fetchDashboardData}>Coba Lagi</button>
          </div>
        ) : (
          <div className="main-content-hp">
            {/* Top row: 3 columns - Statistics, Blood Stock Chart, City Distribution */}
            <div className="top-row-content">
              {/* Column 1: Statistics Cards */}
              <div className="stats-column">
                <div className="stats-card-hp">
                  <h3>Total Darah Tersedia</h3>
                  <p className="stats-value-hp">
                    {dashboardData?.total_kantong.toLocaleString()}{" "}
                    <span>Kantong</span>
                  </p>
                  <p className="stats-subtext-hp">
                    {dashboardData && dashboardData.total_kantong < 5600000
                      ? `-${(
                          5600000 - dashboardData.total_kantong
                        ).toLocaleString()} dari Anjuran WHO`
                      : `+${(
                          dashboardData!.total_kantong - 5600000
                        ).toLocaleString()} dari Anjuran WHO`}
                  </p>
                </div>

                <div className="stats-card-hp">
                  <h3>Total Pendonor</h3>
                  <p className="stats-value-hp">
                    {dashboardData?.total_pendonor.toLocaleString()}{" "}
                    <span>Orang</span>
                  </p>
                </div>

                <div className="stats-card-hp">
                  <h3>Total Darah Hari Ini</h3>
                  <p className="stats-value-hp">
                    {dashboardData?.total_darah_harian.toLocaleString()}{" "}
                    <span>Kantong</span>
                  </p>
                  <p className="stats-subtext-hp">
                    Tanggal: {dashboardData?.tanggal}
                  </p>
                </div>
              </div>

              {/* Column 2: Blood Stock Comparison Chart */}
              <div className="chart-column">
                <div className="chart-card-hp">
                  <h3>Perbandingan Stok Darah</h3>
                  <div className="chart-placeholder-hp">
                    <Pie data={preparePieChartData()} />
                  </div>
                </div>
              </div>

              {/* Column 3: City Distribution */}
              <div className="chart-column">
                <div className="chart-card-hp">
                  <h3>Distribusi per Kota</h3>
                  <div className="chart-placeholder-hp">
                    {dashboardData &&
                    Object.keys(dashboardData.distribusi_per_kota).length >
                      0 ? (
                      <div className="city-distribution">
                        {Object.entries(dashboardData.distribusi_per_kota)
                          .sort(([, a], [, b]) => b - a)
                          .map(([city, count], index) => (
                            <div key={index} className="city-item">
                              <span className="city-name">{city}</span>
                              <span className="city-count">
                                {count} kantong
                              </span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p>Tidak ada data distribusi kota</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: Indonesia Map (full width) */}
            <div className="full-width-map-container">
              <div className="chart-card-hp full-width">
                <h3>Distribusi Darah di Indonesia</h3>
                <div className="chart-placeholder-hp map-container">
                  <IndonesiaMap />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
