import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

const BlastingInfo: React.FC = () => {
  return (
    <div className="blasting-container">
      {/* Navbar */}
      <div className="navbar-blasting">
        <div className="navbar-left-blasting">
          <Link to="/">
            <img src={logo} alt="Setetes Harapan" className="logo-blasting" />
          </Link>
          <span className="app-title-blasting">SetetesHarapan</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="blasting-card">
        <div className="blasting-content">
          {/* Left Section */}
          <div className="blasting-left">
            <div className="form-group-blasting">
              <label className="blasting-label">Nama Rumah Sakit</label>
              <select className="blasting-select">
                <option>RS. Borromeus</option>
              </select>
            </div>

            <div className="form-group-blasting">
              <label className="blasting-label">Kota / Kabupaten Rumah Sakit</label>
              <select className="blasting-select">
                <option>Depok</option>
                <option>Bandung</option>
                <option>Jakarta</option>
              </select>
            </div>

            <div className="form-group-blasting">
              <label className="blasting-label">Golongan Darah</label>
              <select className="blasting-select">
                <option>A</option>
                <option>B</option>
                <option>AB</option>
                <option>O</option>
              </select>
            </div>
          </div>

          {/* Right Section */}
          <div className="blasting-right">
            <div className="form-group-blasting">
              <label className="blasting-label">Alamat Rumah Sakit</label>
              <select className="blasting-select">
                <option>Jl. Ir. H. Djuanda No 100</option>
              </select>
            </div>

            <div className="form-group-blasting">
              <label className="blasting-label">Provinsi Rumah Sakit</label>
              <select className="blasting-select">
                <option>Jawa Barat</option>
              </select>
            </div>

            <div className="form-group-blasting">
              <label className="blasting-label">Rhesus</label>
              <select className="blasting-select">
                <option>+</option>
                <option>-</option>
              </select>
            </div>
          </div>
        </div>

        {/* Full Width Textarea */}
        <div className="form-group-blasting full-width">
          <label className="blasting-label">Tambahan Pesan</label>
          <textarea className="blasting-textarea" placeholder="Tambahan pesan jika ada"></textarea>
        </div>

        {/* Submit Button */}
        <button className="blasting-button">Sebarkan Notifikasi Sekarang</button>
      </div>
    </div>
  );
};

export default BlastingInfo;
