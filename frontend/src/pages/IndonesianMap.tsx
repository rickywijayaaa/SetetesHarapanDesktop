import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const IndonesiaMap = () => {
  const [loading, setLoading] = useState(true);

  // Data dummy untuk distribusi darah per provinsi
  // Dalam kasus nyata, ini bisa diambil dari API
  const provinceData = {
    Aceh: 1245,
    "Sumatera Utara": 2850,
    "Sumatera Barat": 1560,
    Riau: 1320,
    Jambi: 980,
    "Sumatera Selatan": 1760,
    Bengkulu: 720,
    Lampung: 1440,
    "Kepulauan Bangka Belitung": 540,
    "Kepulauan Riau": 680,
    "DKI Jakarta": 5280,
    "Jawa Barat": 7650,
    "Jawa Tengah": 4980,
    "DI Yogyakarta": 1250,
    "Jawa Timur": 6320,
    Banten: 2140,
    Bali: 1540,
    "Nusa Tenggara Barat": 920,
    "Nusa Tenggara Timur": 840,
    "Kalimantan Barat": 1120,
    "Kalimantan Tengah": 740,
    "Kalimantan Selatan": 1050,
    "Kalimantan Timur": 1380,
    "Kalimantan Utara": 460,
    "Sulawesi Utara": 870,
    "Sulawesi Tengah": 640,
    "Sulawesi Selatan": 1980,
    "Sulawesi Tenggara": 580,
    Gorontalo: 320,
    "Sulawesi Barat": 280,
    Maluku: 420,
    "Maluku Utara": 380,
    "Papua Barat": 310,
    Papua: 580,
  };

  // Konfigurasi layout untuk peta
  const layout = {
    title: "",
    geo: {
      scope: "asia",
      resolution: 50,
      lonaxis: {
        range: [94, 142], // Batasan longitude Indonesia dari Sabang sampai Merauke
      },
      lataxis: {
        range: [-11, 6], // Batasan latitude Indonesia
      },
      showland: true,
      landcolor: "rgb(243, 243, 243)",
      countrycolor: "rgb(204, 204, 204)",
      countrywidth: 0.5,
      subunitcolor: "rgb(230, 230, 230)",
      subunitwidth: 0.5,
      showlakes: true,
      lakecolor: "rgb(255, 255, 255)",
      showocean: true,
      oceancolor: "rgb(230, 252, 255)",
      showcountries: true,
      showsubunits: true,
      showcoastlines: true,
      coastlinecolor: "rgb(128, 128, 128)",
      coastlinewidth: 1,
    },
    autosize: true,
    height: 500,
    margin: {
      l: 0,
      r: 0,
      t: 10,
      b: 0,
    },
    paper_bgcolor: "white",
    plot_bgcolor: "white",
    hoverlabel: {
      bgcolor: "white",
      font: { size: 14 },
    },
  };

  // Data untuk peta choropleth
  const mapData = [
    {
      type: "choropleth",
      locationmode: "country names",
      locations: ["Indonesia"],
      z: [1], // Nilai dummy untuk colorscale
      text: ["Indonesia"],
      colorscale: [
        [0, "rgb(242, 242, 242)"],
        [1, "rgb(142, 23, 22)"],
      ],
      showscale: false,
      marker: {
        line: {
          color: "rgb(100, 100, 100)",
          width: 1,
        },
      },
    },
  ];

  // Data untuk sebaran stok darah per kota
  const scatterData = [
    {
      type: "scattergeo",
      mode: "markers",
      lon: [
        95.3, 98.7, 100.4, 101.4, 103.6, 104.8, 102.3, 105.3, 106.1, 104.0,
        106.8, 107.6, 110.4, 110.4, 112.7, 106.1, 115.2, 116.3, 120.2, 109.3,
        113.9, 114.6, 117.2, 116.7, 124.8, 119.9, 119.4, 122.4, 123.1, 119.2,
        128.2, 127.4, 134.1, 140.7,
      ],
      lat: [
        5.6, 3.6, 0.5, 0.5, -1.6, -2.9, -3.8, -5.4, -2.1, 0.9, -6.2, -6.9, -7.0,
        -7.8, -7.3, -6.4, -8.7, -8.6, -8.7, -0.0, -1.5, -3.3, -0.5, 3.0, 1.5,
        -0.9, -5.1, -5.0, 0.6, -3.0, -3.2, 1.6, -2.6, -2.6,
      ],
      text: Object.keys(provinceData).map(
        (province) => `${province}: ${provinceData[province]} kantong`
      ),
      marker: {
        size: Object.values(provinceData).map(
          (value) => Math.sqrt(value) * 0.4
        ),
        color: Object.values(provinceData).map((value) => {
          // Warna berdasarkan jumlah stok darah
          if (value > 4000) return "rgb(255, 0, 0)";
          if (value > 2000) return "rgb(255, 50, 50)";
          if (value > 1000) return "rgb(255, 100, 100)";
          return "rgb(255, 150, 150)";
        }),
        line: {
          width: 1,
          color: "rgb(100, 100, 100)",
        },
        opacity: 0.8,
        sizemode: "area",
      },
      name: "Stok Darah per Provinsi",
    },
  ];

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-t-red-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-600">Memuat peta Indonesia...</p>
        </div>
      </div>
    );
  }

  // Menggabungkan data peta dan scatter
  const data = [...mapData, ...scatterData];

  return (
    <div className="map-content">
      <div className="plot-container">
        <Plot
          data={data}
          layout={layout}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="map-legend">
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color bg-red-600"></span>
            <span className="legend-text">{">"} 4000 kantong</span>
          </div>
          <div className="legend-item">
            <span className="legend-color bg-red-400"></span>
            <span className="legend-text">2000-4000 kantong</span>
          </div>
          <div className="legend-item">
            <span className="legend-color bg-red-300"></span>
            <span className="legend-text">1000-2000 kantong</span>
          </div>
          <div className="legend-item">
            <span className="legend-color bg-red-200"></span>
            <span className="legend-text">{"<"} 1000 kantong</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndonesiaMap;
