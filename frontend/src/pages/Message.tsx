import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

const Message: React.FC = () => {
  const [formData, setFormData] = useState({
    utd_pengirim: "",
    utd_penerima: "",
    jumlah: "",
    tanggal: "",
    pesan: "",
  });

  const [utds, setUtds] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<{
    iduser: string;
    name: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    const fetchUtdList = async () => {
      try {
        const response = await axios.get(
          "https://backend-setetesharapandesktop.up.railway.app/api/users/pmi"
        );
        const utdList =
          response.data?.pmi_users?.map((u: { name: string }) =>
            u.name.trim()
          ) || [];
        setUtds(utdList);
      } catch (error) {
        console.error("Failed to fetch UTD list:", error);
      }
    };
    fetchUtdList();

    const stored = localStorage.getItem("user_info");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserInfo(parsed);
      } catch (err) {
        console.error("❌ Failed to parse user_info:", err);
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Change endpoint and payload to match the backend API
      await axios.post(
        "https://backend-setetesharapandesktop.up.railway.app/api/messages",
        {
          utd_pengirim: formData.utd_pengirim,
          utd_penerima: formData.utd_penerima,
          jumlah: parseInt(formData.jumlah),
          tanggal: new Date(formData.tanggal).toISOString().split("T")[0], // Format as YYYY-MM-DD
          pesan: formData.pesan,
        }
      );

      alert("Notifikasi berhasil dikirim!");
      setFormData({
        utd_pengirim: "",
        utd_penerima: "",
        jumlah: "",
        tanggal: "",
        pesan: "",
      });
    } catch (error) {
      console.error("Error submitting notification:", error);
      alert("Gagal mengirim notifikasi.");
    }
  };

  return (
    <div className="blasting-info-container">
      <div className="blasting-card1">
        <div className="navbar-blasting">
          <div className="navbar-left-blasting">
            <Link to="/">
              <img src={logo} alt="Setetes Harapan" className="logo-blasting" />
            </Link>
            <span className="app-title-blasting">SetetesHarapan</span>
          </div>
          <div className="navbar-right-blasting">
            <span className="navbar-text-ed">
              {userInfo
                ? `${
                    userInfo.role === "Kemenkes"
                      ? "Kementerian Kesehatan Indonesia"
                      : userInfo.role === "PMI"
                      ? "Palang Merah Indonesia"
                      : "Rumah Sakit"
                  } - ${userInfo.name}`
                : "Memuat user..."}
            </span>
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
        </div>

        <div className="form-container-blasting">
          <h2 className="form-title-blasting">Form Pengiriman Darah</h2>

          <form onSubmit={handleSubmit}>
            <div className="blasting-content">
              <div className="form-group-blasting">
                <label className="blasting-label">UTD Pengirim</label>
                <select
                  className="blasting-select"
                  name="utd_pengirim"
                  value={formData.utd_pengirim}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Pilih UTD Pengirim</option>
                  {utds.map((utd) => (
                    <option key={utd} value={utd}>
                      {utd}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-blasting">
                <label className="blasting-label">UTD Penerima</label>
                <select
                  className="blasting-select"
                  name="utd_penerima"
                  value={formData.utd_penerima}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Pilih UTD Penerima</option>
                  {utds.map((utd) => (
                    <option key={utd} value={utd}>
                      {utd}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group-blasting">
                <label className="blasting-label">Jumlah Kantong Darah</label>
                <input
                  type="number"
                  className="blasting-input"
                  name="jumlah"
                  value={formData.jumlah}
                  onChange={handleInputChange}
                  placeholder="Masukkan jumlah kantong darah"
                  required
                />
              </div>

              <div className="form-group-blasting">
                <label className="blasting-label">Tanggal</label>
                <input
                  type="date"
                  className="blasting-select"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group-blasting full-width">
                <label className="blasting-label">Pesan Tambahan</label>
                <textarea
                  className="blasting-textarea"
                  name="pesan"
                  placeholder="Tambahkan pesan jika ada"
                  value={formData.pesan}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button type="submit" className="submit-button-message">
                Kirim Permintaan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;
