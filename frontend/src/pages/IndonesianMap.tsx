import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const IndonesiaMap = () => {
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Responsive sizing
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate responsive dimensions for the plot
  const getPlotDimensions = () => {
    const width =
      windowSize.width < 768
        ? windowSize.width * 0.95
        : windowSize.width < 1200
        ? windowSize.width * 0.9
        : windowSize.width * 0.85;

    const height = Math.min(600, width * 0.6);
    return { width, height };
  };

  // Data provinsi Indonesia dengan koordinat dan nama
  const provinceData = [
    { name: "Aceh", lon: 95.3, lat: 5.6, value: 1245, code: "ID-AC" },
    { name: "Sumatera Utara", lon: 98.7, lat: 3.6, value: 2850, code: "ID-SU" },
    {
      name: "Sumatera Barat",
      lon: 100.4,
      lat: 0.5,
      value: 1560,
      code: "ID-SB",
    },
    { name: "Riau", lon: 101.4, lat: 0.5, value: 1320, code: "ID-RI" },
    { name: "Jambi", lon: 103.6, lat: -1.6, value: 980, code: "ID-JA" },
    {
      name: "Sumatera Selatan",
      lon: 104.8,
      lat: -2.9,
      value: 1760,
      code: "ID-SS",
    },
    { name: "Bengkulu", lon: 102.3, lat: -3.8, value: 720, code: "ID-BE" },
    { name: "Lampung", lon: 105.3, lat: -5.4, value: 1440, code: "ID-LA" },
    {
      name: "Kepulauan Bangka Belitung",
      lon: 106.1,
      lat: -2.1,
      value: 540,
      code: "ID-BB",
    },
    { name: "Kepulauan Riau", lon: 104.0, lat: 0.9, value: 680, code: "ID-KR" },
    { name: "DKI Jakarta", lon: 106.8, lat: -6.2, value: 5280, code: "ID-JK" },
    { name: "Jawa Barat", lon: 107.6, lat: -6.9, value: 7650, code: "ID-JB" },
    { name: "Jawa Tengah", lon: 110.4, lat: -7.0, value: 4980, code: "ID-JT" },
    {
      name: "DI Yogyakarta",
      lon: 110.4,
      lat: -7.8,
      value: 1250,
      code: "ID-YO",
    },
    { name: "Jawa Timur", lon: 112.7, lat: -7.3, value: 6320, code: "ID-JI" },
    { name: "Banten", lon: 106.1, lat: -6.4, value: 2140, code: "ID-BT" },
    { name: "Bali", lon: 115.2, lat: -8.7, value: 1540, code: "ID-BA" },
    {
      name: "Nusa Tenggara Barat",
      lon: 116.3,
      lat: -8.6,
      value: 920,
      code: "ID-NB",
    },
    {
      name: "Nusa Tenggara Timur",
      lon: 120.2,
      lat: -8.7,
      value: 840,
      code: "ID-NT",
    },
    {
      name: "Kalimantan Barat",
      lon: 109.3,
      lat: -0.0,
      value: 1120,
      code: "ID-KB",
    },
    {
      name: "Kalimantan Tengah",
      lon: 113.9,
      lat: -1.5,
      value: 740,
      code: "ID-KT",
    },
    {
      name: "Kalimantan Selatan",
      lon: 114.6,
      lat: -3.3,
      value: 1050,
      code: "ID-KS",
    },
    {
      name: "Kalimantan Timur",
      lon: 117.2,
      lat: -0.5,
      value: 1380,
      code: "ID-KI",
    },
    {
      name: "Kalimantan Utara",
      lon: 116.7,
      lat: 3.0,
      value: 460,
      code: "ID-KU",
    },
    { name: "Sulawesi Utara", lon: 124.8, lat: 1.5, value: 870, code: "ID-SA" },
    {
      name: "Sulawesi Tengah",
      lon: 119.9,
      lat: -0.9,
      value: 640,
      code: "ID-ST",
    },
    {
      name: "Sulawesi Selatan",
      lon: 119.4,
      lat: -5.1,
      value: 1980,
      code: "ID-SN",
    },
    {
      name: "Sulawesi Tenggara",
      lon: 122.4,
      lat: -5.0,
      value: 580,
      code: "ID-SG",
    },
    { name: "Gorontalo", lon: 123.1, lat: 0.6, value: 320, code: "ID-GO" },
    {
      name: "Sulawesi Barat",
      lon: 119.2,
      lat: -3.0,
      value: 280,
      code: "ID-SR",
    },
    { name: "Maluku", lon: 128.2, lat: -3.2, value: 420, code: "ID-MA" },
    { name: "Maluku Utara", lon: 127.4, lat: 1.6, value: 380, code: "ID-MU" },
    { name: "Papua Barat", lon: 134.1, lat: -2.6, value: 310, code: "ID-PB" },
    { name: "Papua", lon: 140.7, lat: -2.6, value: 580, code: "ID-PA" },
  ];

  // Get responsive dimensions
  const dimensions = getPlotDimensions();

  // Konfigurasi layout untuk peta
  const layout = {
    title: "Peta Provinsi Indonesia",
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
      subunitcolor: "rgb(150, 150, 150)",
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
      projection: { type: "mercator" }, // Menambahkan proyeksi yang jelas
    },
    width: dimensions.width,
    height: dimensions.height,
    margin: {
      l: 10,
      r: 10,
      t: 50,
      b: 30,
    },
    paper_bgcolor: "white",
    plot_bgcolor: "white",
    hoverlabel: {
      bgcolor: "white",
      font: { size: 14 },
    },
    autosize: true,
  };

  // Tentukan ukuran marker berdasarkan nilai data
  const getMarkerSize = (value) => {
    // Normalisasi ukuran marker berdasarkan nilai
    const minValue = Math.min(...provinceData.map((p) => p.value));
    const maxValue = Math.max(...provinceData.map((p) => p.value));
    const normalizedSize = (value - minValue) / (maxValue - minValue);

    // Rentang ukuran marker dari 8 hingga 25
    return 8 + normalizedSize * 17;
  };

  // Buat data untuk markers provinsi (bubbles)
  const markersData = {
    type: "scattergeo",
    mode: "markers",
    lon: provinceData.map((p) => p.lon),
    lat: provinceData.map((p) => p.lat),
    text: provinceData.map((p) => `${p.name}: ${p.value} kantong`),
    marker: {
      size: provinceData.map((p) => getMarkerSize(p.value)),
      color: provinceData.map((p) => p.value),
      colorscale: [
        [0, "rgb(255, 200, 200)"],
        [0.2, "rgb(255, 150, 150)"],
        [0.4, "rgb(255, 100, 100)"],
        [0.6, "rgb(255, 50, 50)"],
        [0.8, "rgb(200, 20, 20)"],
        [1, "rgb(150, 0, 0)"],
      ],
      colorbar: {
        title: "Nilai",
        thickness: 15,
        len: 0.5,
        y: 0.5,
        yanchor: "middle",
      },
      line: {
        color: "black",
        width: 1,
      },
      opacity: 0.8,
    },
    name: "Provinsi Indonesia",
    hoverinfo: "text",
  };

  // Tambahkan label nama provinsi
  const labelData = {
    type: "scattergeo",
    mode: "text",
    lon: provinceData.map((p) => p.lon),
    lat: provinceData.map((p) => p.lat),
    text: provinceData.map((p) => p.name),
    textfont: {
      family: "Arial",
      size: 8,
      color: "black",
    },
    textposition: "middle center",
    hoverinfo: "none",
    showlegend: false,
  };

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

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-center map-container-inner">
        <Plot
          data={[markersData, labelData]}
          layout={layout}
          config={{
            responsive: true,
            displayModeBar: true,
            scrollZoom: true,
          }}
          className="w-full h-full"
          useResizeHandler={true}
        />
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Visualisasi jumlah kantong per provinsi di Indonesia</p>
      </div>
    </div>
  );
};

export default IndonesiaMap;
