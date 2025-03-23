import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

// List of blood product types
const BLOOD_PRODUCT_TYPES = [
  "AHF", "BC", "FFP", "FFP 450", "FFP Aferesis", "FFP Fraksionasi", 
  "FFP Konvalesen", "FFP PKC", "FP", "FP72", "Lekosit Eferesis", 
  "Lekosit Apheresis", "Leucodepleted", "Leucoreduce", "LP", 
  "LP Aferesis", "LP Apheresis", "LP PKC", "PCL", "PCR", "PF", "PK", 
  "Plasma Konvalesen", "PRC", "PRC - LC", "PRC 450", "PRC Eferesis", 
  "PRC BCR", "PRC CPD", "PRC Leucodepleted", "PRC Leucodepletet", 
  "PRC, Leucoreduce", "PRC SAGM", "PRC-BCR", "PRC-NAT", "PRP", "SAGM", 
  "TC", "TC Aferesis", "TC Apheresi", "TC Apheresis", "TC APR", 
  "TC Tromboferesis", "TC-APH", "TCP", "WB", "WB Fresh", 
  "WB Leucodepletet", "WE", "WE Leucodepleted"
];

// Static data from stok_darah.py with added blood product types
const BLOOD_INVENTORY_DATA = [
  // Jakarta Blood Data
  { city: "Jakarta", blood_type: "A+", blood_product: "PRC", stock: 35 },
  { city: "Jakarta", blood_type: "A+", blood_product: "WB", stock: 25 },
  { city: "Jakarta", blood_type: "A+", blood_product: "FFP", stock: 20 },
  { city: "Jakarta", blood_type: "A+", blood_product: "TC", stock: 20 },
  { city: "Jakarta", blood_type: "A-", blood_product: "PRC", stock: 10 },
  { city: "Jakarta", blood_type: "A-", blood_product: "WB", stock: 8 },
  { city: "Jakarta", blood_type: "A-", blood_product: "FFP", stock: 7 },
  { city: "Jakarta", blood_type: "B+", blood_product: "PRC", stock: 30 },
  { city: "Jakarta", blood_type: "B+", blood_product: "WB", stock: 25 },
  { city: "Jakarta", blood_type: "B+", blood_product: "TC", stock: 25 },
  { city: "Jakarta", blood_type: "B-", blood_product: "PRC", stock: 8 },
  { city: "Jakarta", blood_type: "B-", blood_product: "WB", stock: 6 },
  { city: "Jakarta", blood_type: "B-", blood_product: "FFP", stock: 6 },
  { city: "Jakarta", blood_type: "O+", blood_product: "PRC", stock: 50 },
  { city: "Jakarta", blood_type: "O+", blood_product: "WB", stock: 40 },
  { city: "Jakarta", blood_type: "O+", blood_product: "FFP", stock: 30 },
  { city: "Jakarta", blood_type: "O+", blood_product: "TC", stock: 30 },
  { city: "Jakarta", blood_type: "O-", blood_product: "PRC", stock: 15 },
  { city: "Jakarta", blood_type: "O-", blood_product: "WB", stock: 10 },
  { city: "Jakarta", blood_type: "O-", blood_product: "FFP", stock: 10 },
  { city: "Jakarta", blood_type: "AB+", blood_product: "PRC", stock: 15 },
  { city: "Jakarta", blood_type: "AB+", blood_product: "WB", stock: 15 },
  { city: "Jakarta", blood_type: "AB+", blood_product: "FFP", stock: 10 },
  { city: "Jakarta", blood_type: "AB-", blood_product: "PRC", stock: 5 },
  { city: "Jakarta", blood_type: "AB-", blood_product: "WB", stock: 5 },
  { city: "Jakarta", blood_type: "AB-", blood_product: "FFP", stock: 5 },

  // Surabaya Blood Data
  { city: "Surabaya", blood_type: "A+", blood_product: "PRC", stock: 25 },
  { city: "Surabaya", blood_type: "A+", blood_product: "WB", stock: 20 },
  { city: "Surabaya", blood_type: "A+", blood_product: "FFP", stock: 15 },
  { city: "Surabaya", blood_type: "A+", blood_product: "TC", stock: 10 },
  { city: "Surabaya", blood_type: "A-", blood_product: "PRC", stock: 5 },
  { city: "Surabaya", blood_type: "A-", blood_product: "WB", stock: 5 },
  { city: "Surabaya", blood_type: "A-", blood_product: "FFP", stock: 5 },
  { city: "Surabaya", blood_type: "B+", blood_product: "PRC", stock: 25 },
  { city: "Surabaya", blood_type: "B+", blood_product: "WB", stock: 20 },
  { city: "Surabaya", blood_type: "B+", blood_product: "PRC SAGM", stock: 20 },
  { city: "Surabaya", blood_type: "B-", blood_product: "PRC", stock: 8 },
  { city: "Surabaya", blood_type: "B-", blood_product: "WB", stock: 5 },
  { city: "Surabaya", blood_type: "B-", blood_product: "FFP", stock: 5 },
  { city: "Surabaya", blood_type: "O+", blood_product: "PRC", stock: 30 },
  { city: "Surabaya", blood_type: "O+", blood_product: "WB", stock: 30 },
  { city: "Surabaya", blood_type: "O+", blood_product: "FFP", stock: 15 },
  { city: "Surabaya", blood_type: "O+", blood_product: "TC", stock: 15 },
  { city: "Surabaya", blood_type: "O-", blood_product: "PRC", stock: 10 },
  { city: "Surabaya", blood_type: "O-", blood_product: "WB", stock: 8 },
  { city: "Surabaya", blood_type: "O-", blood_product: "FFP", stock: 7 },
  { city: "Surabaya", blood_type: "AB+", blood_product: "PRC", stock: 12 },
  { city: "Surabaya", blood_type: "AB+", blood_product: "WB", stock: 10 },
  { city: "Surabaya", blood_type: "AB+", blood_product: "FFP", stock: 8 },
  { city: "Surabaya", blood_type: "AB-", blood_product: "PRC", stock: 4 },
  { city: "Surabaya", blood_type: "AB-", blood_product: "WB", stock: 3 },
  { city: "Surabaya", blood_type: "AB-", blood_product: "FFP", stock: 3 },

  // Bandung Blood Data
  { city: "Bandung", blood_type: "A+", blood_product: "PRC", stock: 22 },
  { city: "Bandung", blood_type: "A+", blood_product: "WB", stock: 20 },
  { city: "Bandung", blood_type: "A+", blood_product: "FFP", stock: 12 },
  { city: "Bandung", blood_type: "A+", blood_product: "TC", stock: 6 },
  { city: "Bandung", blood_type: "A-", blood_product: "PRC", stock: 4 },
  { city: "Bandung", blood_type: "A-", blood_product: "WB", stock: 4 },
  { city: "Bandung", blood_type: "A-", blood_product: "FFP", stock: 4 },
  { city: "Bandung", blood_type: "B+", blood_product: "PRC", stock: 20 },
  { city: "Bandung", blood_type: "B+", blood_product: "WB", stock: 20 },
  { city: "Bandung", blood_type: "B+", blood_product: "FFP", stock: 15 },
  { city: "Bandung", blood_type: "B-", blood_product: "PRC", stock: 5 },
  { city: "Bandung", blood_type: "B-", blood_product: "WB", stock: 5 },
  { city: "Bandung", blood_type: "B-", blood_product: "FFP", stock: 5 },
  { city: "Bandung", blood_type: "O+", blood_product: "PRC", stock: 25 },
  { city: "Bandung", blood_type: "O+", blood_product: "WB", stock: 25 },
  { city: "Bandung", blood_type: "O+", blood_product: "FFP", stock: 20 },
  { city: "Bandung", blood_type: "O+", blood_product: "TC", stock: 10 },
  { city: "Bandung", blood_type: "O-", blood_product: "PRC", stock: 8 },
  { city: "Bandung", blood_type: "O-", blood_product: "WB", stock: 7 },
  { city: "Bandung", blood_type: "O-", blood_product: "FFP", stock: 5 },
  { city: "Bandung", blood_type: "AB+", blood_product: "PRC", stock: 10 },
  { city: "Bandung", blood_type: "AB+", blood_product: "WB", stock: 8 },
  { city: "Bandung", blood_type: "AB+", blood_product: "FFP", stock: 7 },
  { city: "Bandung", blood_type: "AB-", blood_product: "PRC", stock: 3 },
  { city: "Bandung", blood_type: "AB-", blood_product: "WB", stock: 3 },
  { city: "Bandung", blood_type: "AB-", blood_product: "FFP", stock: 2 },
];

// Interface untuk definisi tipe data
interface BloodStock {
  city: string;
  blood_type: string;
  blood_product: string;
  stock: number;
}

interface BloodStockResponse {
  total_stock: number;
  stock_by_type: Record<string, number>;
  detailed_stock: BloodStock[];
}

export default function PencarianStok() {
  const router = useRouter();

  // State untuk menyimpan data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bloodData, setBloodData] = useState<BloodStockResponse | null>(null);
  const [cityInput, setCityInput] = useState<string>("");
  const [selectedBloodType, setSelectedBloodType] = useState<string | null>(null);
  const [selectedBloodProduct, setSelectedBloodProduct] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);
  const [showProductDropdown, setShowProductDropdown] = useState<boolean>(false);

  // Ambil data awal dan daftar kota saat komponen dimuat
  useEffect(() => {
    fetchBloodStock();
    fetchCities();
  }, []);

  // Fungsi untuk mengambil data stok darah dari data statis
  const fetchBloodStock = (city?: string, bloodType?: string, bloodProduct?: string) => {
    setLoading(true);
    setError(null);

    try {
      // Filter data berdasarkan kota, golongan darah, dan jenis darah
      let filteredData = [...BLOOD_INVENTORY_DATA];

      if (city && city.trim() !== "") {
        filteredData = filteredData.filter((item) => item.city === city);
      }

      if (bloodType && bloodType !== "Semua") {
        filteredData = filteredData.filter(
          (item) => item.blood_type === bloodType
        );
      }

      if (bloodProduct && bloodProduct !== "Semua") {
        filteredData = filteredData.filter(
          (item) => item.blood_product === bloodProduct
        );
      }

      // Hitung total stok
      const total_stock = filteredData.reduce(
        (sum, item) => sum + item.stock,
        0
      );

      // Hitung stok per golongan darah
      const stock_by_type: Record<string, number> = {};

      filteredData.forEach((item) => {
        if (stock_by_type[item.blood_type]) {
          stock_by_type[item.blood_type] += item.stock;
        } else {
          stock_by_type[item.blood_type] = item.stock;
        }
      });

      const response: BloodStockResponse = {
        total_stock,
        stock_by_type,
        detailed_stock: filteredData,
      };

      setBloodData(response);
    } catch (err: any) {
      console.error("Error processing blood stock data:", err);
      setError("Terjadi kesalahan dalam memproses data stok darah");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengambil daftar kota dari data statis
  const fetchCities = () => {
    try {
      // Extract unique cities from the blood inventory data
      const uniqueCities = Array.from(
        new Set(BLOOD_INVENTORY_DATA.map((item) => item.city))
      ).sort();
      setCities(uniqueCities);
    } catch (err: any) {
      console.error("Error processing cities data:", err);
      setError("Terjadi kesalahan dalam memproses data kota");
    }
  };

  // Fungsi untuk melakukan pencarian
  const handleSearch = () => {
    fetchBloodStock(
      cityInput.trim() !== "" ? cityInput : undefined,
      selectedBloodType !== "Semua" ? selectedBloodType : undefined,
      selectedBloodProduct !== "Semua" ? selectedBloodProduct : undefined
    );
    setShowCityDropdown(false);
    setShowProductDropdown(false);
  };

  // Fungsi untuk menangani pemilihan kota
  const handleCitySelect = (city: string) => {
    setCityInput(city);
    setShowCityDropdown(false);
    fetchBloodStock(
      city.trim() !== "" ? city : undefined,
      selectedBloodType !== "Semua" ? selectedBloodType : undefined,
      selectedBloodProduct !== "Semua" ? selectedBloodProduct : undefined
    );
  };

  // Fungsi untuk menangani pemilihan produk darah
  const handleBloodProductSelect = (product: string) => {
    setSelectedBloodProduct(product);
    setShowProductDropdown(false);
    fetchBloodStock(
      cityInput.trim() !== "" ? cityInput : undefined,
      selectedBloodType !== "Semua" ? selectedBloodType : undefined,
      product !== "Semua" ? product : undefined
    );
  };

  // Mendapatkan jumlah stok untuk setiap golongan darah
  const getBloodTypeStock = (bloodType: string): number => {
    if (!bloodData || !bloodData.stock_by_type) return 0;
    return bloodData.stock_by_type[bloodType] || 0;
  };

  // Function to close dropdowns when clicking outside
  const handleOutsidePress = () => {
    if (showCityDropdown || showProductDropdown) {
      setShowCityDropdown(false);
      setShowProductDropdown(false);
    }
  };

  // Reset city and blood type filters
  const handleReset = () => {
    setCityInput("");
    setSelectedBloodType(null);
    setSelectedBloodProduct(null);
    fetchBloodStock();
  };

  return (
    <View style={styles.container}>
      {/* Invisible touchable area to close dropdowns */}
      {(showCityDropdown || showProductDropdown) && (
        <TouchableOpacity
          style={styles.outsideOverlay}
          activeOpacity={0}
          onPress={handleOutsidePress}
        />
      )}

      {/* Header - White background with red text */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Informasi Darah</Text>
      </View>

      {/* Total Blood Card - Dark red background */}
      <View style={styles.totalBloodCard}>
        <View style={styles.bloodInfoContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/images/blood-donation.png")}
              style={styles.bloodIcon}
            />
          </View>
          <View style={styles.bloodTextContainer}>
            <Text style={styles.bloodInfoTitle}>Total Darah</Text>
            <View style={styles.bloodCountContainer}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Text style={styles.bloodCount}>
                    {bloodData?.total_stock || 0}
                  </Text>
                  <Text style={styles.kantongText}>Kantong</Text>
                </>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchFilterContainer}>
        {/* Search City Input */}
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari Kota"
            placeholderTextColor="#888"
            value={cityInput}
            onChangeText={setCityInput}
            onFocus={() => {
              setShowCityDropdown(true);
              setShowProductDropdown(false);
            }}
          />
          <TouchableOpacity
            style={styles.searchIconButton}
            onPress={handleSearch}
          >
            <Text style={styles.searchIcon}>⌕</Text>
          </TouchableOpacity>

          {/* City Dropdown */}
          {showCityDropdown && (
            <View style={styles.dropdown}>
              <ScrollView
                style={{ maxHeight: 200 }}
                keyboardShouldPersistTaps="handled"
              >
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCitySelect("")}
                >
                  <Text style={styles.dropdownItemText}>Semua Kota</Text>
                </TouchableOpacity>
                {cities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={styles.dropdownItem}
                    onPress={() => handleCitySelect(city)}
                  >
                    <Text style={styles.dropdownItemText}>{city}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Blood Product Dropdown */}
        <TouchableOpacity
          style={styles.productDropdown}
          onPress={() => {
            setShowProductDropdown(!showProductDropdown);
            setShowCityDropdown(false);
          }}
        >
          <Text style={styles.typeDropdownText}>
            {selectedBloodProduct || "Jenis"}
          </Text>
          <Text style={styles.dropdownIcon}>▼</Text>

          {/* Blood Product Dropdown Menu */}
          {showProductDropdown && (
            <View style={[styles.dropdown, styles.productDropdownMenu]}>
              <ScrollView
                style={{ maxHeight: 200 }}
                keyboardShouldPersistTaps="handled"
              >
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleBloodProductSelect("Semua")}
                >
                  <Text style={styles.dropdownItemText}>Semua</Text>
                </TouchableOpacity>
                {BLOOD_PRODUCT_TYPES.map((product) => (
                  <TouchableOpacity
                    key={product}
                    style={styles.dropdownItem}
                    onPress={() => handleBloodProductSelect(product)}
                  >
                    <Text style={styles.dropdownItemText}>{product}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Filter indicator and reset button */}
      {(cityInput || selectedBloodType || selectedBloodProduct) && (
        <View style={styles.filterIndicatorContainer}>
          <Text style={styles.filterIndicatorText}>
            Filter: {cityInput ? cityInput : "Semua Kota"}
            {selectedBloodType ? ` • ${selectedBloodType}` : ""}
            {selectedBloodProduct ? ` • ${selectedBloodProduct}` : ""}
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Error message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Loading indicator for initial load */}
      {loading && !bloodData && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* Blood Type Grid */}
      {!loading && bloodData && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Row 1: O+ and O- */}
          <View style={styles.bloodTypeRow}>
            <View style={styles.bloodTypeCard}>
              <Text style={styles.bloodTypeLabel}>O +</Text>
              <Text style={styles.bloodTypeCount}>
                {getBloodTypeStock("O+")}
              </Text>
              <Text style={styles.kantongLabel}>Kantong</Text>
            </View>
            <View style={styles.bloodTypeCard}>
              <Text style={styles.bloodTypeLabel}>O -</Text>
              <Text style={styles.bloodTypeCount}>
                {getBloodTypeStock("O-")}
              </Text>
              <Text style={styles.kantongLabel}>Kantong</Text>
            </View>
          </View>

          {/* Row 2: A+ and A- */}
          <View style={styles.bloodTypeRow}>
            <View style={styles.bloodTypeCard}>
              <Text style={styles.bloodTypeLabel}>A +</Text>
              <Text style={styles.bloodTypeCount}>
                {getBloodTypeStock("A+")}
              </Text>
              <Text style={styles.kantongLabel}>Kantong</Text>
            </View>
            <View style={styles.bloodTypeCard}>
              <Text style={styles.bloodTypeLabel}>A -</Text>
              <Text style={styles.bloodTypeCount}>
                {getBloodTypeStock("A-")}
              </Text>
              <Text style={styles.kantongLabel}>Kantong</Text>
            </View>
          </View>

          {/* Row 3: B+ and B- */}
          <View style={styles.bloodTypeRow}>
            <View style={styles.bloodTypeCard}>
              <Text style={styles.bloodTypeLabel}>B +</Text>
              <Text style={styles.bloodTypeCount}>
                {getBloodTypeStock("B+")}
              </Text>
              <Text style={styles.kantongLabel}>Kantong</Text>
            </View>
            <View style={styles.bloodTypeCard}>
              <Text style={styles.bloodTypeLabel}>B -</Text>
              <Text style={styles.bloodTypeCount}>
                {getBloodTypeStock("B-")}
              </Text>
              <Text style={styles.kantongLabel}>Kantong</Text>
            </View>
          </View>

          {/* Row 4: AB+ and AB- */}
          <View style={styles.bloodTypeRow}>
            <View style={styles.bloodTypeCard}>
              <Text style={styles.bloodTypeLabel}>AB +</Text>
              <Text style={styles.bloodTypeCount}>
                {getBloodTypeStock("AB+")}
              </Text>
              <Text style={styles.kantongLabel}>Kantong</Text>
            </View>
            <View style={styles.bloodTypeCard}>
              <Text style={styles.bloodTypeLabel}>AB -</Text>
              <Text style={styles.bloodTypeCount}>
                {getBloodTypeStock("AB-")}
              </Text>
              <Text style={styles.kantongLabel}>Kantong</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B01E1E",
  },
  outsideOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  headerSection: {
    backgroundColor: "#fff",
    paddingVertical: 40,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#8E1616",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  totalBloodCard: {
    backgroundColor: "#B01E1E",
    borderRadius: 16,
    padding: 25,
    marginHorizontal: 20,
    marginTop: -30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bloodInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bloodIcon: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  bloodTextContainer: {
    alignItems: "flex-end",
  },
  bloodInfoTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  bloodCountContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  bloodCount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 8,
  },
  kantongText: {
    fontSize: 18,
    color: "#fff",
  },
  searchFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    zIndex: 10,
  },
  searchInputContainer: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    position: "relative",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  searchIconButton: {
    padding: 10,
  },
  searchIcon: {
    fontSize: 20,
    color: "#888",
  },
  productDropdown: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "30%",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 11,
  },
  typeDropdownText: {
    fontSize: 16,
    color: "#000",
  },
  dropdownIcon: {
    fontSize: 12,
    color: "#888",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bloodTypeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  bloodTypeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    width: "48%",
    alignItems: "center",
    paddingVertical: 20,
  },
  bloodTypeLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8E1616",
    marginBottom: 10,
  },
  bloodTypeCount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  kantongLabel: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  typeDropdownMenu: {
    left: -70,
    width: 150,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 1,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 107, 107, 0.8)",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  filterIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    padding: 8,
  },
  filterIndicatorText: {
    color: "#fff",
    fontSize: 14,
  },
  resetButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
