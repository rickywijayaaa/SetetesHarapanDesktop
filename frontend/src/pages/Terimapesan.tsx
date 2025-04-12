import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const TerimaPesan: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      sender: "Kemenkes",
      content: "Kirimkan 100 kantong darah ke UTD Padang",
      date: "2025-04-12",
    },
    {
      sender: "Kemenkes",
      content: "Kirimkan 50 kantong darah ke UTD Bandung",
      date: "2025-04-13",
    },
    {
      sender: "PMI",
      content: "Kirimkan 150 kantong darah ke UTD Medan",
      date: "2025-04-14",
    },
  ]);

  return (
    <div className="distribusi-container">
      {/* Navbar */}
      <div className="navbar-ed">
        <div className="navbar-left-ed">
          <Link to="/homepage" style={{ textDecoration: "none", color: "inherit" }}>
            <img src={logo} alt="Setetes Harapan" className="logo-ed" />
          </Link>
          <Link to="/homepage" className="app-title-ed" style={{ textDecoration: "none", color: "inherit" }}>
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

      {/* Messages section */}
      <div className="distribusi-card-ed">
        <h2>Inbox Pesan</h2>
        
        {/* List of messages */}
        <table className="distribusi-table">
          <thead>
            <tr>
              <th>Pengirim</th>
              <th>Pesan</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr key={index}>
                <td>{message.sender}</td>
                <td>{message.content}</td>
                <td>{message.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TerimaPesan;
