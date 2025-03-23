import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

interface Donor {
  iddarah: string;
  tanggal_donor: string;
  first_name: string;
  last_name: string;
  golongan_darah: string;
  rhesus: string;
  jenis_darah: string;
  jumlah_darah: string;
}

interface UserInfo {
  iduser: string;
  name: string;
  role: string;
}

const KurangDarah: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [golonganFilter, setGolonganFilter] = useState("");
  const [rhesusFilter, setRhesusFilter] = useState("");
  const [jenisFilter, setJenisFilter] = useState("");

  // Load user info
  useEffect(() => {
    const stored = localStorage.getItem("user_info");
    if (stored) {
      try {
        setUserInfo(JSON.parse(stored));
      } catch (err) {
        console.error("❌ Failed to parse user_info", err);
      }
    }
  }, []);

  // Fetch donor data
  const fetchDonorData = () => {
    fetch("https://backend-setetesharapandesktop.up.railway.app/donor/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDonors(data);
        } else {
          console.error("❌ Unexpected donor data:", data);
        }
      })
      .catch((err) => {
        console.error("❌ Failed to fetch donor data:", err);
      });
  };

  useEffect(() => {
    fetchDonorData();
  }, []);

  const handleDelete = (iddarah: string) => {
    fetch(`https://backend-setetesharapandesktop.up.railway.app/donor/${iddarah}/`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          fetchDonorData(); // Refresh data after delete
        }
      })
      .catch((err) => {
        console.error("❌ Failed to delete donor:", err);
      });
  };

  const filteredBloodData = donors.filter((blood) => {
    const matchName =
      blood.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blood.last_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGolongan = golonganFilter ? blood.golongan_darah === golonganFilter : true;
    const matchRhesus = rhesusFilter ? blood.rhesus === rhesusFilter : true;
    const matchJenis = jenisFilter ? blood.jenis_darah === jenisFilter : true;
    return matchName && matchGolongan && matchRhesus && matchJenis;
  });

  return (
    <div className="kurang-darah-container-kd">
      {/* ✅ Navbar */}
      <div className="navbar-kd">
        <div className="navbar-left-kd">
          <Link to="/homepage">
            <img src={logo} alt="Setetes Harapan" className="logo-kd" />
          </Link>
          <Link to="/homepage" className="app-title-kd" style={{ textDecoration: 'none', color: 'inherit' }}>
            SetetesHarapan
          </Link>
        </div>
        <span className="navbar-text-kd">
          {userInfo?.role === "kemenkes"
            ? "Kementerian Kesehatan Indonesia"
            : userInfo?.role === "pmi"
            ? "Palang Merah Indonesia"
            : "Rumah Sakit"}{" "}
          - {userInfo?.name}
        </span>
        <button
          className="logout-button-kd"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* Card */}
      <div className="card-kd">
        <div className="tabs-kd">
          <Link to="/edit" className="tab-kd" style={{ textDecoration: 'none', color: 'inherit' }}>
            Penambahan
          </Link>
          <button className="tab-kd active-kd">Pengurangan</button>
        </div>

        <h2 className="section-title-kd">Informasi Ketersediaan Darah</h2>

        <div className="filters-container-kd">
          <input
            type="text"
            className="search-input-kd"
            placeholder="Cari Pendonor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="filters-right-kd">
            <select value={golonganFilter} onChange={(e) => setGolonganFilter(e.target.value)}>
              <option value="">Pilih Golongan</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>

            <select value={rhesusFilter} onChange={(e) => setRhesusFilter(e.target.value)}>
              <option value="">Pilih Rhesus</option>
              <option value="Positif">Positif</option>
              <option value="Negatif">Negatif</option>
            </select>

            <select value={jenisFilter} onChange={(e) => setJenisFilter(e.target.value)}>
              <option value="">Jenis Darah</option>
              <option value="AHF">AHF</option>
              <option value="BC">BC</option>
              <option value="FFP">FFP</option>
              <option value="FFP 450">FFP 450</option>
              <option value="FFP Aferesis">FFP Aferesis</option>
              <option value="FFP Fraksionasi">FFP Fraksionasi</option>
              <option value="FFP Konvalesen">FFP Konvalesen</option>
              <option value="FFP PKC">FFP PKC</option>
              <option value="FP">FP</option>
              <option value="FP72">FP72</option>
              <option value="Lekosit Eferesis">Lekosit Eferesis</option>
              <option value="Lekosit Apheresis">Lekosit Apheresis</option>
              <option value="Leucodepleted">Leucodepleted</option>
              <option value="Leucoreduce">Leucoreduce</option>
              <option value="LP">LP</option>
              <option value="LP Aferesis">LP Aferesis</option>
              <option value="LP Apheresis">LP Apheresis</option>
              <option value="LP PKC">LP PKC</option>
              <option value="PCL">PCL</option>
              <option value="PCR">PCR</option>
              <option value="PF">PF</option>
              <option value="PK">PK</option>
              <option value="Plasma Konvalesen">Plasma Konvalesen</option>
              <option value="PRC">PRC</option>
              <option value="PRC - LC">PRC - LC</option>
              <option value="PRC 450">PRC 450</option>
              <option value="PRC Eferesis">PRC Eferesis</option>
              <option value="PRC BCR">PRC BCR</option>
              <option value="PRC CPD">PRC CPD</option>
              <option value="PRC Leucodepleted">PRC Leucodepleted</option>
              <option value="PRC Leucodepletet">PRC Leucodepletet</option>
              <option value="PRC, Leucoreduce">PRC, Leucoreduce</option>
              <option value="PRC SAGM">PRC SAGM</option>
              <option value="PRC-BCR">PRC-BCR</option>
              <option value="PRC-NAT">PRC-NAT</option>
              <option value="PRP">PRP</option>
              <option value="SAGM">SAGM</option>
              <option value="TC">TC</option>
              <option value="TC Aferesis">TC Aferesis</option>
              <option value="TC Apheresi">TC Apheresi</option>
              <option value="TC Apheresis">TC Apheresis</option>
              <option value="TC APR">TC APR</option>
              <option value="TC Tromboferesis">TC Tromboferesis</option>
              <option value="TC-APH">TC-APH</option>
              <option value="TCP">TCP</option>
              <option value="WB">WB</option>
              <option value="WB Fresh">WB Fresh</option>
              <option value="WB Leucodepletet">WB Leucodepletet</option>
              <option value="WE">WE</option>
              <option value="WE Leucodepleted">WE Leucodepleted</option>
            </select>

          </div>
        </div>

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
                <td>{blood.iddarah}</td>
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
    </div>
  );
};

export default KurangDarah;
