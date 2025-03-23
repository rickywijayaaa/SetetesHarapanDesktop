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

// Initialize Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
);

// Register chart components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// API base URL
const API_BASE_URL = "https://backend-setetesharapandesktop.up.railway.app"; // Sesuaikan dengan URL backend Anda

// Interval refresh (dalam milidetik) - 1 detik
const REFRESH_INTERVAL = 100000;

interface DashboardData {
  tanggal: string;
  total_kantong: number;
  total_darah_harian: number;
  total_pendonor: number;
  stok_per_golongan: Record<string, number>;
  stok_per_jenis: Record<string, number>;
  distribusi_per_kota: Record<string, number>;
}

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [userInfo, setUserInfo] = useState<{
    iduser: string;
    name: string;
    role: string;
  } | null>(null);

  const [cityFilter, setCityFilter] = useState("");
  const [golonganFilter, setGolonganFilter] = useState("");
  const [jenisFilter, setJenisFilter] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);

  
  // Load user info from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user_info");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log("✅ Parsed user_info:", parsed);
        setUserInfo(parsed);
      } catch (err) {
        console.error("❌ Failed to parse user_info", err);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    if (!dashboardData) setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (cityFilter) params.append("city", cityFilter);
      if (golonganFilter) params.append("golongan", golonganFilter);
      if (jenisFilter) params.append("jenis", jenisFilter);
      params.append("_t", new Date().getTime().toString());

      const res = await axios.get(`${API_BASE_URL}/api/dashboard`, { params });
      setDashboardData(res.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Gagal memuat data dashboard.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    let intervalId: NodeJS.Timeout | null = null;

    if (autoRefresh) {
      intervalId = setInterval(fetchDashboardData, REFRESH_INTERVAL);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [cityFilter, golonganFilter, jenisFilter, autoRefresh]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("user_info");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleAutoRefresh = () => setAutoRefresh(!autoRefresh);

  // Prepare pie chart data for blood type distribution
  const prepareBloodTypePieChartData = (type: string) => {
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

    // Filtered data based on blood type
    let chartData;
    if (type === "golongan") {
      chartData = dashboardData.stok_per_golongan;
    } else if (type === "jenis") {
      chartData = dashboardData.stok_per_jenis;
    } else {
      // For other potential chart types
      chartData = dashboardData.stok_per_golongan;
    }

    const backgroundColors = [
      "rgba(255, 99, 132, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(255, 205, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(201, 203, 207, 1)",
      "rgba(255, 0, 0, 1)",
    ];

    return {
      labels: Object.keys(chartData),
      datasets: [
        {
          label: "Blood Stock Distribution",
          data: Object.values(chartData),
          backgroundColor: backgroundColors.slice(0, Object.keys(chartData).length),
          hoverOffset: 4,
        },
      ],
    };
  };

  const clearFilters = () => {
    setCityFilter("");
    setGolonganFilter("");
    setJenisFilter("");
  };

  return (
    <div className="homepage-container">
      <div className="navbar-hp">
        <div className="navbar-left-hp">
          <img src={logo} alt="Logo" className="logo-hp" />
          <span className="app-title-hp">SetetesHarapan</span>
        </div>
        <span className="navbar-text-hp">
          {userInfo?.role === "kemenkes"
            ? "Kementerian Kesehatan Indonesia"
            : userInfo?.role === "pmi"
            ? "Palang Merah Indonesia"
            : "Rumah Sakit"}{" "}
          - {userInfo?.name}
        </span>
        <div className="navbar-actions">
          <button className="navbar-button" onClick={() => navigate("/edit")}>
            Edit Darah
          </button>
          <button className="logout-button-hp" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="control-bar">
          <div className="filters-hp">
            <input
              type="text"
              placeholder="Cari Kota..."
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="search-input-hp"
            />
            <button onClick={() => setGolonganFilter(prompt("Golongan darah (A, B, AB, O):") || "")}>
              {golonganFilter || "Golongan"}
            </button>
            <button onClick={() => setJenisFilter(prompt("Jenis darah (Whole, Plasma, etc):") || "")}>
              {jenisFilter || "Jenis"}
            </button>
            {(cityFilter || golonganFilter || jenisFilter) && (
              <button onClick={clearFilters}>Hapus Filter</button>
            )}
          </div>
          <div className="realtime-controls">
            <button onClick={toggleAutoRefresh} className={autoRefresh ? "active" : "inactive"}>
              <div className="status-dot"></div>
              <span>{autoRefresh ? "Auto Refresh Aktif" : "Nonaktif"}</span>
            </button>
            {lastUpdated && (
              <span className="last-updated">
                Diperbarui: {lastUpdated.toLocaleTimeString("id-ID")}
              </span>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="loading-container"><p>Memuat data...</p></div>
        ) : error ? (
          <div className="error-container"><p>{error}</p></div>
        ) : (
          <div className="main-content-hp">
            {/* Main content: 2 columns layout - Stats column and Blood Stock Charts */}
            <div className="top-row-content">
              <div className="stats-column">
                <div className="stats-card-hp">
                  <h3>Total Darah Tersedia</h3>
                  <p className="stats-value-hp">
                    {dashboardData?.total_kantong?.toLocaleString() ?? "0"} <span>Kantong</span>
                  </p>
                  <p className="stats-subtext-hp">
                    {dashboardData && dashboardData.total_kantong < 5600000
                      ? `-${(5600000 - dashboardData.total_kantong).toLocaleString()} dari WHO`
                      : `+${(dashboardData?.total_kantong - 5600000).toLocaleString()} dari WHO`}
                  </p>
                </div>

                <div className="stats-card-hp">
                  <h3>Total Pendonor</h3>
                  <p className="stats-value-hp">
                    {dashboardData?.total_pendonor?.toLocaleString() ?? "0"} <span>Orang</span>
                  </p>
                </div>

                <div className="stats-card-hp">
                  <h3>Total Darah Hari Ini</h3>
                  <p className="stats-value-hp">
                    {dashboardData?.total_darah_harian?.toLocaleString() ?? "0"} <span>Kantong</span>
                  </p>
                  <p className="stats-subtext-hp">Tanggal: {dashboardData?.tanggal}</p>
                </div>
              </div>

              {/* Column 2: Blood Stock Comparison Charts (4 charts in 2x2 grid) */}
              <div className="blood-comparison-grid">
                <div className="blood-comparison-row">
                  {/* Chart 1 */}
                  <div className="chart-card-hp blood-chart">
                    <h3>Golongan Darah</h3>
                    <div className="chart-placeholder-hp">
                      <Pie data={prepareBloodTypePieChartData("golongan")} />
                    </div>
                  </div>

                  {/* Chart 2 */}
                  <div className="chart-card-hp blood-chart">
                    <h3>Jenis Darah</h3>
                    <div className="chart-placeholder-hp">
                      <Pie data={prepareBloodTypePieChartData("jenis")} />
                    </div>
                  </div>
                </div>

                <div className="blood-comparison-row">
                  {/* Chart 3 */}
                  <div className="chart-card-hp blood-chart">
                    <h3>Rhesus Darah</h3>
                    <div className="chart-placeholder-hp">
                      <Pie 
                        data={{
                          labels: ["Positif", "Negatif"],
                          datasets: [
                            {
                              label: "Rhesus Distribution",
                              data: [85, 15], // Example data, replace with actual data
                              backgroundColor: [
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 99, 132, 1)",
                              ],
                              hoverOffset: 4,
                            },
                          ],
                        }} 
                      />
                    </div>
                  </div>

                  {/* Chart 4 */}
                  <div className="chart-card-hp blood-chart">
                    <h3>Kadaluarsa Darah</h3>
                    <div className="chart-placeholder-hp">
                      <Pie 
                        data={{
                          labels: ["< 7 hari", "7-21 hari", "> 21 hari"],
                          datasets: [
                            {
                              label: "Expiry Distribution",
                              data: [25, 45, 30], // Example data, replace with actual data
                              backgroundColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(255, 205, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                              ],
                              hoverOffset: 4,
                            },
                          ],
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="full-width-map-container">
              <div className="chart-card-hp full-width">
                <h3>Distribusi Darah di Indonesia</h3>
                <IndonesiaMap />
              </div>
            </div>

            <div style={{ padding: "1rem", backgroundColor: "#f4f4f4", borderRadius: "6px" }}>
              <h3>User Info:</h3>
              {userInfo ? (
                <ul>
                  <li><strong>ID:</strong> {userInfo.iduser}</li>
                  <li><strong>Name:</strong> {userInfo.name}</li>
                  <li><strong>Role:</strong> {userInfo.role}</li>
                </ul>
              ) : (
                <p>Loading user info...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;