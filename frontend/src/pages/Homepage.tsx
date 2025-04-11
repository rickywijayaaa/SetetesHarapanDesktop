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

// Register chart components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// API base URL
const API_BASE_URL = "https://backend-setetesharapandesktop.up.railway.app"; // Sesuaikan dengan URL backend Anda

// Interval refresh (dalam milidetik) - 1 detik
const REFRESH_INTERVAL = 100000;

// Data dummy untuk grafik
const DUMMY_DATA = {
  // Data untuk Pertambahan Stok Darah (berdasarkan golongan darah)
  pertambahan_stok: {
    A: 120,
    B: 95,
    AB: 45,
    O: 150,
  },

  // Data untuk Pengurangan Stok Darah (berdasarkan jenis darah)
  pengurangan_stok: {
    "Whole Blood": 85,
    "Packed Red Cells": 60,
    Plasma: 40,
    Platelet: 30,
    Cryoprecipitate: 15,
  },

  // Data untuk Perbandingan Stok Darah (berdasarkan rhesus)
  perbandingan_rhesus: {
    "Rhesus Positif": 85,
    "Rhesus Negatif": 15,
  },

  // Data untuk Perbandingan Kebutuhan Darah (berdasarkan umur stok)
  perbandingan_umur_stok: {
    "< 7 hari": 25,
    "7-21 hari": 45,
    "> 21 hari": 30,
  },
};

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
  const handleEmergencySearch = () => {
    navigate("/blastinginfo"); // Pindah ke halaman BlastingInfo
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
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

  // Replace the existing chart preparation functions with these updated versions that use red color variations

  // Fungsi untuk mendapatkan data grafik Pertambahan Stok Darah (berdasarkan golongan)
  const prepareBloodStockAdditionChart = () => {
    return {
      labels: Object.keys(DUMMY_DATA.pertambahan_stok),
      datasets: [
        {
          data: Object.values(DUMMY_DATA.pertambahan_stok),
          backgroundColor: "rgba(220, 53, 69, 0.6)", // Lighter red with transparency
          borderColor: "rgba(220, 53, 69, 1)", // Solid red border
          borderWidth: 1,
        },
      ],
    };
  };

  // Fungsi untuk mendapatkan data grafik Pengurangan Stok Darah (berdasarkan jenis)
  const prepareBloodStockReductionChart = () => {
    return {
      labels: Object.keys(DUMMY_DATA.pengurangan_stok),
      datasets: [
        {
          data: Object.values(DUMMY_DATA.pengurangan_stok),
          backgroundColor: "rgba(165, 42, 42, 0.6)", // Brown-red with transparency
          borderColor: "rgba(165, 42, 42, 1)", // Solid brown-red border
          borderWidth: 1,
        },
      ],
    };
  };

  // Fungsi untuk mendapatkan data grafik Perbandingan Stok Darah (berdasarkan rhesus)
  const prepareRhesusComparisonChart = () => {
    return {
      labels: Object.keys(DUMMY_DATA.perbandingan_rhesus),
      datasets: [
        {
          data: Object.values(DUMMY_DATA.perbandingan_rhesus),
          backgroundColor: [
            "rgba(220, 53, 69, 1)", // Bright red
            "rgba(128, 0, 0, 1)", // Dark red/maroon
          ],
          hoverOffset: 4,
        },
      ],
    };
  };

  // Fungsi untuk mendapatkan data grafik Perbandingan Kebutuhan Darah (berdasarkan umur stok)
  const prepareStockAgeComparisonChart = () => {
    return {
      labels: Object.keys(DUMMY_DATA.perbandingan_umur_stok),
      datasets: [
        {
          data: Object.values(DUMMY_DATA.perbandingan_umur_stok),
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

  const fetchDashboardData = async () => {
    if (!dashboardData) setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      // Instead of actual API call, we'll create dummy data
      const dummyData: DashboardData = {
        tanggal: new Date().toLocaleDateString("id-ID"),
        total_kantong: 5580000,
        total_darah_harian: 12750,
        total_pendonor: 1250000,
        stok_per_golongan: DUMMY_DATA.pertambahan_stok,
        stok_per_jenis: DUMMY_DATA.pengurangan_stok,
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
    } catch (err) {
      setError("Gagal memuat data dashboard.");
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
            <button
              onClick={() =>
                setGolonganFilter(prompt("Golongan darah (A, B, AB, O):") || "")
              }
            >
              {golonganFilter || "Golongan"}
            </button>
            <button
              onClick={() =>
                setJenisFilter(
                  prompt("Jenis darah (Whole, Plasma, etc):") || ""
                )
              }
            >
              {jenisFilter || "Jenis"}
            </button>
            {(cityFilter || golonganFilter || jenisFilter) && (
              <button onClick={clearFilters}>Hapus Filter</button>
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
                  {/* Chart 1: Pertambahan Stok Darah */}
                  <div className="chart-card-hp blood-chart">
                    <h3>Stok Darah Berdasarkan Golongan</h3>
                    <Bar
                      data={prepareBloodStockAdditionChart()}
                      options={{
                        indexAxis: "y", // Mengubah ke horizontal bar chart
                        scales: {
                          x: {
                            beginAtZero: true, // Pastikan sumbu X mulai dari 0
                          },
                        },
                        plugins: {
                          legend: {
                            display: false, // Menyembunyikan label/legend
                          },
                        },
                      }}
                    />
                  </div>

                  {/* Chart 2: Pengurangan Stok Darah */}
                  <div className="chart-card-hp blood-chart">
                    <h3>Stok Darah Berdasarkan Jenis</h3>
                    <Bar
                      data={prepareBloodStockReductionChart()}
                      options={{
                        indexAxis: "y", // Mengubah ke horizontal bar chart
                        scales: {
                          x: {
                            beginAtZero: true,
                          },
                        },
                        plugins: {
                          legend: {
                            display: false, // Menyembunyikan label/legend
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="blood-comparison-row">
                  {/* Chart 3: Perbandingan Stok Darah (Rhesus) */}
                  <div className="chart-card-hp blood-chart">
                    <h3>Perbandingan Stok Darah</h3>
                    <div className="chart-placeholder-hp">
                      <Pie
                        data={prepareRhesusComparisonChart()}
                        options={{
                          plugins: {
                            legend: {
                              display: true, // Menyembunyikan label/legend
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
                              display: true, // Menyembunyikan label/legend
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

              {/* Indonesia Map section - only visible for PMI and Kemenkes roles */}
              {userInfo?.role !== "Rumah Sakit" && (
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
    </div>
  );
};

export default Homepage;
