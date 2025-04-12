import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "../App.css";
import { createClient } from "@supabase/supabase-js";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import IndonesiaMap from "../pages/IndonesianMap";
import urgent from "../assets/urgent.png";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

// Initialize Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
);

// API base URL - make sure this is correct
const API_BASE_URL = "https://backend-setetesharapandesktop.up.railway.app"; // Verify this URL is correct

// Refresh interval (in milliseconds)
const REFRESH_INTERVAL = 10000;

interface DashboardData {
  tanggal: string;
  total_kantong: number;
  total_darah_harian: number;
  total_pendonor: number;
  stok_per_golongan: Record<string, number>;
  stok_per_jenis: Record<string, number>;
  stok_per_rhesus: Record<string, number>; // Add stok_per_rhesus
  distribusi_per_kota: Record<string, number>;
  user_info?: {
    role: string;
    full_name: string;
  };
}

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const handleEmergencySearch = () => {
    navigate("/blastinginfo");
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [apiConnecting, setApiConnecting] = useState(false);

  const [userInfo, setUserInfo] = useState<{
    iduser: string;
    name: string;
    role: string;
  } | null>(null);

  const [cityFilter, setCityFilter] = useState("");
  const [golonganFilter, setGolonganFilter] = useState("");
  const [jenisFilter, setJenisFilter] = useState("");
  const [rhesusFilter, setRhesusFilter] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Define dropdown options - matching database values
  const golonganOptions = ["", "A", "B", "AB", "O"];

  // Updated jenis options to match database values exactly
  const jenisOptions = [
    "",
    "Whole Blood",
    "Packed Red Cell",
    "Platelet Concentrate",
    "Fresh Frozen Plasma",
    "Cryoprecipitate",
  ];

  // Updated rhesus options to match database values
  const rhesusOptions = ["", "Positif", "Negatif"];

  // Filter dropdowns visibility state
  const [showGolonganDropdown, setShowGolonganDropdown] = useState(false);
  const [showJenisDropdown, setShowJenisDropdown] = useState(false);
  const [showRhesusDropdown, setShowRhesusDropdown] = useState(false);

  // Available jenis options from API data
  const [availableJenisOptions, setAvailableJenisOptions] =
    useState<string[]>(jenisOptions);

  // Function for blood group stock chart (A, B, AB, O)
  const prepareBloodStockByGroupChart = () => {
    if (!dashboardData?.stok_per_golongan) return { labels: [], datasets: [] };

    return {
      labels: Object.keys(dashboardData.stok_per_golongan),
      datasets: [
        {
          data: Object.values(dashboardData.stok_per_golongan),
          backgroundColor: "rgba(220, 53, 69, 0.6)",
          borderColor: "rgba(220, 53, 69, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Function for blood type stock chart (Whole Blood, Plasma, etc)
  const prepareBloodStockByTypeChart = () => {
    if (!dashboardData?.stok_per_jenis) return { labels: [], datasets: [] };

    return {
      labels: Object.keys(dashboardData.stok_per_jenis),
      datasets: [
        {
          data: Object.values(dashboardData.stok_per_jenis),
          backgroundColor: "rgba(165, 42, 42, 0.6)",
          borderColor: "rgba(165, 42, 42, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Updated function for Rhesus comparison - using real database values
  const prepareRhesusComparisonChart = () => {
    if (!dashboardData?.stok_per_rhesus) {
      // Fallback to sample data if stok_per_rhesus is not available
      const fallbackData = {
        "Rhesus Positif": 85,
        "Rhesus Negatif": 15,
      };

      return {
        labels: Object.keys(fallbackData),
        datasets: [
          {
            data: Object.values(fallbackData),
            backgroundColor: [
              "rgba(220, 53, 69, 1)", // Bright red
              "rgba(128, 0, 0, 1)", // Dark red/maroon
            ],
            hoverOffset: 4,
          },
        ],
      };
    }

    // Use real data from API
    return {
      labels: Object.keys(dashboardData.stok_per_rhesus),
      datasets: [
        {
          data: Object.values(dashboardData.stok_per_rhesus),
          backgroundColor: [
            "rgba(220, 53, 69, 1)", // Bright red for positive
            "rgba(128, 0, 0, 1)", // Dark red/maroon for negative
            "rgba(169, 169, 169, 1)", // Grey for unknown/other values
          ],
          hoverOffset: 4,
        },
      ],
    };
  };

  // Function for blood age comparison
  const prepareStockAgeComparisonChart = () => {
    const ageData = {
      "< 7 hari": 25,
      "7-21 hari": 45,
      "> 21 hari": 30,
    };

    return {
      labels: Object.keys(ageData),
      datasets: [
        {
          data: Object.values(ageData),
          backgroundColor: [
            "rgba(255, 99, 71, 1)", // Tomato red
            "rgba(178, 34, 34, 1)", // Firebrick red
            "rgba(139, 0, 0, 1)", // Dark red
          ],
          hoverOffset: 4,
        },
      ],
    };
  };

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

  // Update available jenis options when dashboardData changes
  useEffect(() => {
    if (dashboardData?.stok_per_jenis) {
      // Extract jenis options from API data
      const apiJenisOptions = [
        "",
        ...Object.keys(dashboardData.stok_per_jenis),
      ];
      setAvailableJenisOptions(apiJenisOptions);

      // If current jenisFilter is not in the new options, reset it
      if (jenisFilter && !apiJenisOptions.includes(jenisFilter)) {
        setJenisFilter("");
      }
    }
  }, [dashboardData]);

  // Fallback to use dummy data if API fails
  const useDummyData = () => {
    console.log("Using fallback dummy data");
    const dummyData: DashboardData = {
      tanggal: new Date().toLocaleDateString("id-ID"),
      total_kantong: 5580000,
      total_darah_harian: 12750,
      total_pendonor: 1250000,
      stok_per_golongan: {
        A: 120,
        B: 95,
        AB: 45,
        O: 150,
      },
      stok_per_jenis: {
        "Whole Blood": 85,
        "Packed Red Cell": 60,
        "Fresh Frozen Plasma": 40,
        "Platelet Concentrate": 30,
        Cryoprecipitate: 15,
      },
      stok_per_rhesus: {
        Positif: 85,
        Negatif: 15,
      },
      distribusi_per_kota: {
        Jakarta: 12500,
        Surabaya: 8900,
        Bandung: 7500,
        Medan: 6800,
        Makassar: 5200,
      },
    };

    setDashboardData(dummyData);
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  const fetchDashboardData = async () => {
    if (!userInfo) {
      console.log("No user info available, can't fetch data");
      return;
    }

    if (!dashboardData) setIsLoading(true);
    setError(null);
    setApiConnecting(true);

    // For debug purposes, log the attempts
    console.log("Attempting to fetch dashboard data...");
    console.log(`User role: ${userInfo.role}, name: ${userInfo.name}`);

    try {
      // Prepare filters for API call
      const params = new URLSearchParams();
      if (cityFilter) params.append("city", cityFilter);
      if (golonganFilter) params.append("golongan", golonganFilter);
      if (jenisFilter) params.append("jenis", jenisFilter);
      if (rhesusFilter) params.append("rhesus", rhesusFilter); // Add rhesus filter to params

      // Create user_info header that the backend expects
      const userInfoHeader = JSON.stringify({
        role: userInfo.role,
        name: userInfo.name,
      });

      console.log(`Calling API at: ${API_BASE_URL}/api/dashboard`);
      console.log(`With headers: x-user-info = ${userInfoHeader}`);
      console.log(
        `With filters: city=${cityFilter}, golongan=${golonganFilter}, jenis=${jenisFilter}, rhesus=${rhesusFilter}`
      );

      // Make actual API call to the backend with timeout
      const response = await axios.get(`${API_BASE_URL}/api/dashboard`, {
        params,
        headers: {
          "x-user-info": userInfoHeader,
        },
        timeout: 10000, // 10 second timeout
      });

      console.log("API response:", response);

      if (response.status === 200 && response.data) {
        console.log("✅ Successfully fetched dashboard data", response.data);
        setDashboardData(response.data);
        setLastUpdated(new Date());
        setIsLoading(false);
      } else {
        console.warn(
          "⚠️ API returned unexpected status or empty data",
          response
        );
        throw new Error(`API returned unexpected response`);
      }
    } catch (err: any) {
      console.error("❌ Error fetching dashboard data:", err);

      // Check if this is a network error
      if (
        err.code === "ECONNABORTED" ||
        err.message.includes("timeout") ||
        !navigator.onLine
      ) {
        console.log("Network issue detected - using fallback data");
        useDummyData();
      } else if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("❌ Server error response:", err.response);
        setError(`Server error: ${err.response.status}`);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("❌ No response from server:", err.request);
        setError(
          "Tidak dapat terhubung ke server. Menggunakan data sementara."
        );
        useDummyData();
      } else {
        setError("Gagal memuat data dashboard. Menggunakan data sementara.");
        useDummyData();
      }

      if (!dashboardData) {
        setIsLoading(false);
      }
    } finally {
      setApiConnecting(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchDashboardData();

      let intervalId: NodeJS.Timeout | null = null;
      if (autoRefresh) {
        intervalId = setInterval(fetchDashboardData, REFRESH_INTERVAL);
      }

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [
    userInfo,
    cityFilter,
    golonganFilter,
    jenisFilter,
    rhesusFilter,
    autoRefresh,
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdowns = (e: MouseEvent) => {
      // Cast event target to Element type for TypeScript
      const target = e.target as Element;

      // Only close if clicking outside dropdown elements
      if (!target.closest(".dropdown-container")) {
        setShowGolonganDropdown(false);
        setShowJenisDropdown(false);
        setShowRhesusDropdown(false);
      }
    };

    window.addEventListener("click", closeDropdowns);

    return () => {
      window.removeEventListener("click", closeDropdowns);
    };
  }, []);

  // Manual refresh function
  const handleManualRefresh = () => {
    if (!apiConnecting) {
      fetchDashboardData();
    }
  };

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

  const clearFilters = () => {
    setCityFilter("");
    setGolonganFilter("");
    setJenisFilter("");
    setRhesusFilter("");
  };

  // Function to toggle dropdowns with stopPropagation to prevent the global click handler from closing it immediately
  const toggleDropdown = (e: React.MouseEvent, dropdown: string) => {
    e.stopPropagation();

    if (dropdown === "golongan") {
      setShowGolonganDropdown(!showGolonganDropdown);
      setShowJenisDropdown(false);
      setShowRhesusDropdown(false);
    } else if (dropdown === "jenis") {
      setShowJenisDropdown(!showJenisDropdown);
      setShowGolonganDropdown(false);
      setShowRhesusDropdown(false);
    } else if (dropdown === "rhesus") {
      setShowRhesusDropdown(!showRhesusDropdown);
      setShowGolonganDropdown(false);
      setShowJenisDropdown(false);
    }
  };

  // Function to handle selection
  const handleOptionSelect = (
    e: React.MouseEvent,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    e.stopPropagation();
    setter(value);
    setShowGolonganDropdown(false);
    setShowJenisDropdown(false);
    setShowRhesusDropdown(false);
  };

  return (
    <div className="homepage-container">
      <div className="navbar-hp">
        <div className="navbar-left-hp">
          <img src={logo} alt="Logo" className="logo-hp" />
          <span className="app-title-hp">SetetesHarapan</span>
        </div>
        <span className="navbar-text-hp">
          {userInfo?.role === "Kemenkes"
            ? "Kementerian Kesehatan Indonesia"
            : userInfo?.role === "PMI"
            ? "Palang Merah Indonesia"
            : "Rumah Sakit"}{" "}
          - {userInfo?.name}
        </span>
        <div className="navbar-actions">
          {userInfo?.role !== "Kemenkes" && (
            <button className="navbar-button" onClick={() => navigate("/edit")}>
              Edit Darah
            </button>
          )}
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

            {/* Golongan filter dropdown */}
            <div className="dropdown-container">
              <button
                onClick={(e) => toggleDropdown(e, "golongan")}
                className="dropdown-button"
              >
                {golonganFilter || "Golongan"}
              </button>
              {showGolonganDropdown && (
                <div className="dropdown-menu">
                  {golonganOptions.map((option, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={(e) =>
                        handleOptionSelect(e, option, setGolonganFilter)
                      }
                    >
                      {option || "Semua"}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Jenis filter dropdown - using dynamic options from API */}
            <div className="dropdown-container">
              <button
                onClick={(e) => toggleDropdown(e, "jenis")}
                className="dropdown-button"
              >
                {jenisFilter || "Jenis"}
              </button>
              {showJenisDropdown && (
                <div className="dropdown-menu">
                  {availableJenisOptions.map((option, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={(e) =>
                        handleOptionSelect(e, option, setJenisFilter)
                      }
                    >
                      {option || "Semua"}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rhesus filter dropdown */}
            <div className="dropdown-container">
              <button
                onClick={(e) => toggleDropdown(e, "rhesus")}
                className="dropdown-button"
              >
                {rhesusFilter || "Rhesus"}
              </button>
              {showRhesusDropdown && (
                <div className="dropdown-menu">
                  {rhesusOptions.map((option, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={(e) =>
                        handleOptionSelect(e, option, setRhesusFilter)
                      }
                    >
                      {option || "Semua"}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {(cityFilter || golonganFilter || jenisFilter || rhesusFilter) && (
              <button onClick={clearFilters} className="clear-filter-button">
                Hapus Filter
              </button>
            )}
          </div>
          <div className="realtime-controls">
            <button
              onClick={toggleAutoRefresh}
              className={autoRefresh ? "active" : "inactive"}
            >
              <div className="status-dot"></div>
              <span>{autoRefresh ? "Auto Refresh Aktif" : "Nonaktif"}</span>
            </button>
            <button
              onClick={handleManualRefresh}
              disabled={apiConnecting}
              className="refresh-button"
            >
              {apiConnecting ? "Memuat..." : "Refresh"}
            </button>
            {lastUpdated && (
              <span className="last-updated">
                Diperbarui: {lastUpdated.toLocaleTimeString("id-ID")}
              </span>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <p>Memuat data...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={handleManualRefresh} disabled={apiConnecting}>
              Coba Lagi
            </button>
          </div>
        ) : (
          <div className="main-content-hp">
            {/* Main content: 2 columns layout - Stats column and Blood Stock Charts */}
            <div className="top-row-content">
              <div className="stats-column">
                <div className="stats-card-hp">
                  <h3>Total Darah Tersedia</h3>
                  <p className="stats-value-hp">
                    {dashboardData?.total_kantong?.toLocaleString() ?? "0"}{" "}
                    <span>Kantong</span>
                  </p>
                  <p className="stats-subtext-hp">
                    {dashboardData && dashboardData.total_kantong < 5600000
                      ? `-${(
                          5600000 - dashboardData.total_kantong
                        ).toLocaleString()} dari WHO`
                      : `+${(
                          dashboardData?.total_kantong - 5600000
                        ).toLocaleString()} dari WHO`}
                  </p>
                </div>

                <div className="stats-card-hp">
                  <h3>Total Pendonor</h3>
                  <p className="stats-value-hp">
                    {dashboardData?.total_pendonor?.toLocaleString() ?? "0"}{" "}
                    <span>Orang</span>
                  </p>
                </div>

                <div className="stats-card-hp">
                  <h3>Total Darah Hari Ini</h3>
                  <p className="stats-value-hp">
                    {dashboardData?.total_darah_harian?.toLocaleString() ?? "0"}{" "}
                    <span>Kantong</span>
                  </p>
                  <p className="stats-subtext-hp">
                    Tanggal: {dashboardData?.tanggal}
                  </p>
                </div>
              </div>

              {/* Column 2: Blood Stock Comparison Charts (4 charts in 2x2 grid) */}
              <div className="blood-comparison-grid">
                <div className="blood-comparison-row">
                  {/* Chart 1: Stok Darah Berdasarkan Golongan */}
                  <div className="chart-card-hp blood-chart">
                    <h3>Stok Darah Berdasarkan Golongan</h3>
                    <Bar
                      data={prepareBloodStockByGroupChart()}
                      options={{
                        indexAxis: "y",
                        scales: {
                          x: {
                            beginAtZero: true,
                          },
                        },
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>

                  {/* Chart 2: Stok Darah Berdasarkan Jenis */}
                  <div className="chart-card-hp blood-chart">
                    <h3>Stok Darah Berdasarkan Jenis</h3>
                    <Bar
                      data={prepareBloodStockByTypeChart()}
                      options={{
                        indexAxis: "y",
                        scales: {
                          x: {
                            beginAtZero: true,
                          },
                        },
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="blood-comparison-row">
                  {/* Chart 3: Perbandingan Stok Darah (Rhesus) - Now using real data */}
                  <div className="chart-card-hp blood-chart">
                    <h3>Perbandingan Rhesus</h3>
                    <div className="chart-placeholder-hp">
                      <Pie
                        data={prepareRhesusComparisonChart()}
                        options={{
                          plugins: {
                            legend: {
                              display: true,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  {/* Chart 4: Perbandingan Kebutuhan Darah (Umur Stok) */}
                  <div className="chart-card-hp blood-chart">
                    <h3>Perbandingan Kebutuhan Darah</h3>
                    <div className="chart-placeholder-hp">
                      <Pie
                        data={prepareStockAgeComparisonChart()}
                        options={{
                          plugins: {
                            legend: {
                              display: true,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conditional rendering based on user role */}
            <div className="full-width-map-container">
              {userInfo?.role === "Rumah Sakit" && (
                <div className="emergency-blood-request-section">
                  <div className="emergency-card">
                    <div className="emergency-content">
                      <div className="emergency-header">
                        <h2>Darurat!</h2>
                        <h1>Butuh darah darurat?</h1>
                        <h3>Cari donor darah terdekat!</h3>
                      </div>
                      <button
                        className="emergency-button"
                        onClick={handleEmergencySearch}
                      >
                        Cari Sekarang
                      </button>
                    </div>
                    <div className="urgent-container">
                      <img src={urgent} alt="URGENT" className="urgent-logo" />
                    </div>
                  </div>
                </div>
              )}

              {userInfo?.role === "PMI" && (
                <div className="chart-card-hp full-width">
                  <h3>Distribusi Darah di Indonesia</h3>
                  <IndonesiaMap />

                  <div className="btn-container">
                    {/* Add Pesan button to the left of Edit Darah */}
                    <button
                      className="btn-pesan"
                      onClick={() => navigate("/terima")}
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              )}

              {userInfo?.role === "Kemenkes" && (
                <div className="chart-card-hp full-width">
                  <h3>Distribusi Darah di Indonesia</h3>
                  <IndonesiaMap />
                  <div className="btn-container">
                    <button
                      className="btn-lanjut"
                      onClick={() => navigate("/distribusi")}
                    >
                      Lihat lebih lanjut
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CSS for the dropdown components */}
      <style jsx>{`
        .dropdown-container {
          position: relative;
          display: inline-block;
        }

        .dropdown-button {
          background-color: #f8f9fa;
          border: 1px solid #ced4da;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 120px;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background-color: white;
          border: 1px solid #ced4da;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          width: 100%;
          max-height: 200px;
          overflow-y: auto;
        }

        .dropdown-item {
          padding: 8px 16px;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background-color: #f8f9fa;
        }

        .clear-filter-button {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
};

export default Homepage;
