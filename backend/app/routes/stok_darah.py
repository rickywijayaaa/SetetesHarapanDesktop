from fastapi import APIRouter, Query, HTTPException
from typing import List, Dict, Optional
from enum import Enum

# Membuat router dengan tag
router = APIRouter(tags=["blood_inventory"])

# Enum untuk golongan darah yang valid
class BloodType(str, Enum):
    A_POS = "A+"
    A_NEG = "A-"
    B_POS = "B+"
    B_NEG = "B-"
    O_POS = "O+"
    O_NEG = "O-"
    AB_POS = "AB+"
    AB_NEG = "AB-"

# Database simulasi (dalam aplikasi nyata, gunakan database seperti PostgreSQL, MongoDB, dll.)
blood_inventory_db = [
    {"city": "Jakarta", "blood_type": BloodType.A_POS, "stock": 100},
    {"city": "Jakarta", "blood_type": BloodType.A_NEG, "stock": 25},
    {"city": "Jakarta", "blood_type": BloodType.B_POS, "stock": 80},
    {"city": "Jakarta", "blood_type": BloodType.B_NEG, "stock": 20},
    {"city": "Jakarta", "blood_type": BloodType.O_POS, "stock": 150},
    {"city": "Jakarta", "blood_type": BloodType.O_NEG, "stock": 35},
    {"city": "Jakarta", "blood_type": BloodType.AB_POS, "stock": 40},
    {"city": "Jakarta", "blood_type": BloodType.AB_NEG, "stock": 15},
    
    {"city": "Surabaya", "blood_type": BloodType.A_POS, "stock": 70},
    {"city": "Surabaya", "blood_type": BloodType.A_NEG, "stock": 15},
    {"city": "Surabaya", "blood_type": BloodType.B_POS, "stock": 65},
    {"city": "Surabaya", "blood_type": BloodType.B_NEG, "stock": 18},
    {"city": "Surabaya", "blood_type": BloodType.O_POS, "stock": 90},
    {"city": "Surabaya", "blood_type": BloodType.O_NEG, "stock": 25},
    {"city": "Surabaya", "blood_type": BloodType.AB_POS, "stock": 30},
    {"city": "Surabaya", "blood_type": BloodType.AB_NEG, "stock": 10},
    
    {"city": "Bandung", "blood_type": BloodType.A_POS, "stock": 60},
    {"city": "Bandung", "blood_type": BloodType.A_NEG, "stock": 12},
    {"city": "Bandung", "blood_type": BloodType.B_POS, "stock": 55},
    {"city": "Bandung", "blood_type": BloodType.B_NEG, "stock": 15},
    {"city": "Bandung", "blood_type": BloodType.O_POS, "stock": 80},
    {"city": "Bandung", "blood_type": BloodType.O_NEG, "stock": 20},
    {"city": "Bandung", "blood_type": BloodType.AB_POS, "stock": 25},
    {"city": "Bandung", "blood_type": BloodType.AB_NEG, "stock": 8},
]

# Endpoint untuk mendapatkan daftar kota yang tersedia
@router.get("/cities")
def get_cities():
    """
    Mendapatkan daftar kota yang tersedia pada sistem
    """
    cities = sorted(set(item["city"] for item in blood_inventory_db))
    return {"cities": cities}

# Endpoint untuk mendapatkan stok darah dengan filter
@router.get("/blood-stock")
def get_blood_stock(
    city: Optional[str] = Query(None, description="Filter berdasarkan kota"),
    blood_type: Optional[BloodType] = Query(None, description="Filter berdasarkan golongan darah")
):
    """
    Mendapatkan informasi stok darah dengan filter opsional:
    - city: Filter berdasarkan kota
    - blood_type: Filter berdasarkan golongan darah
    
    Respons mencakup total stok darah, stok per golongan darah, dan detail stok
    """
    # Filter data berdasarkan kota dan/atau golongan darah
    filtered_data = blood_inventory_db
    
    if city:
        # Periksa apakah kota ada dalam database
        available_cities = set(item["city"] for item in blood_inventory_db)
        if city not in available_cities:
            raise HTTPException(status_code=404, detail=f"Kota '{city}' tidak ditemukan")
        filtered_data = [item for item in filtered_data if item["city"] == city]
    
    if blood_type:
        filtered_data = [item for item in filtered_data if item["blood_type"] == blood_type]
    
    # Hitung total stok
    total_stock = sum(item["stock"] for item in filtered_data)
    
    # Hitung stok per golongan darah
    stock_by_type = {blood_type.value: 0 for blood_type in BloodType}
    for item in filtered_data:
        stock_by_type[item["blood_type"]] += item["stock"]
    
    # Hapus golongan darah dengan stok 0 dari respons
    stock_by_type = {k: v for k, v in stock_by_type.items() if v > 0}
    
    return {
        "total_stock": total_stock,
        "stock_by_type": stock_by_type,
        "detailed_stock": filtered_data
    }

# Endpoint untuk mendapatkan total stok darah
@router.get("/blood-stock/total")
def get_total_blood_stock(
    city: Optional[str] = Query(None, description="Filter berdasarkan kota")
):
    """
    Mendapatkan total stok darah, opsional difilter berdasarkan kota
    """
    filtered_data = blood_inventory_db
    
    if city:
        available_cities = set(item["city"] for item in blood_inventory_db)
        if city not in available_cities:
            raise HTTPException(status_code=404, detail=f"Kota '{city}' tidak ditemukan")
        filtered_data = [item for item in filtered_data if item["city"] == city]
    
    total_stock = sum(item["stock"] for item in filtered_data)
    
    return {
        "total_stock": total_stock
    }