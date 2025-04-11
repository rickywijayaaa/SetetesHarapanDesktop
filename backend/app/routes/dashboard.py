# app/routes/dashboard.py
from fastapi import APIRouter, HTTPException, Query, Depends
from typing import Optional
from app.database import supabase
from datetime import datetime
from fastapi import Request
import json
# from app.auth import get_current_user

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard(
    request: Request,
    golongan: Optional[str] = Query(None),
    jenis: Optional[str] = Query(None),
    rhesus: Optional[str] = Query(None),  # Added rhesus as a query parameter
    city: Optional[str] = Query(None),
    tanggal: Optional[str] = Query(None),
):
    try:
        # ✅ Get user_info from headers
        user_info_str = request.headers.get("x-user-info")
        if not user_info_str:
            raise HTTPException(status_code=400, detail="User info not found in request headers")
        
        user_info = json.loads(user_info_str)
        user_role = user_info["role"]
        full_name = user_info["name"]

        # ✅ Role-based table selection and filtering
        if user_role.lower() == "kemenkes":
            # For Kemenkes, use the donor table directly
            table_name = "donor"
            query = supabase.table(table_name).select("*")
        elif user_role.lower() == "pmi":
            # For PMI, use donor table but filter entries where iddarah exists in darah_pmi
            table_name = "donor"
            
            # First get all iddarah values from darah_pmi
            darah_pmi_response = supabase.table("darah_pmi").select("iddarah").execute()
            
            if hasattr(darah_pmi_response, 'error') and darah_pmi_response.error:
                raise HTTPException(status_code=500, detail=f"Database error: {darah_pmi_response.error.message}")
            
            # Extract iddarah values
            pmi_iddarah_list = [item["iddarah"] for item in darah_pmi_response.data if "iddarah" in item and item["iddarah"]]
            
            if not pmi_iddarah_list:
                # If no matching iddarah found, return empty response
                return {
                    "tanggal": tanggal or datetime.now().strftime("%Y-%m-%d"),
                    "total_kantong": 0,
                    "total_darah_harian": 0,
                    "total_pendonor": 0,
                    "stok_per_golongan": {},
                    "stok_per_jenis": {},
                    "stok_per_rhesus": {},
                    "distribusi_per_kota": {},
                    "user_info": {
                        "role": user_role,
                        "full_name": full_name
                    }
                }
            
            # Use Supabase's in filter to get records that match the iddarah list
            query = supabase.table(table_name).select("*").in_("iddarah", pmi_iddarah_list)
            
        elif user_role.lower() == "rumah sakit":
            # For Rumah Sakit, use donor table but filter entries where iddarah exists in darah_rs
            table_name = "donor"
            
            # First get all iddarah values from darah_rs
            darah_rs_response = supabase.table("darah_rs").select("iddarah").execute()
            
            if hasattr(darah_rs_response, 'error') and darah_rs_response.error:
                raise HTTPException(status_code=500, detail=f"Database error: {darah_rs_response.error.message}")
            
            # Extract iddarah values
            rs_iddarah_list = [item["iddarah"] for item in darah_rs_response.data if "iddarah" in item and item["iddarah"]]
            
            if not rs_iddarah_list:
                # If no matching iddarah found, return empty response
                return {
                    "tanggal": tanggal or datetime.now().strftime("%Y-%m-%d"),
                    "total_kantong": 0,
                    "total_darah_harian": 0,
                    "total_pendonor": 0,
                    "stok_per_golongan": {},
                    "stok_per_jenis": {},
                    "stok_per_rhesus": {},
                    "distribusi_per_kota": {},
                    "user_info": {
                        "role": user_role,
                        "full_name": full_name
                    }
                }
            
            # Use Supabase's in filter to get records that match the iddarah list
            query = supabase.table(table_name).select("*").in_("iddarah", rs_iddarah_list)
        else:
            raise HTTPException(status_code=403, detail=f"Invalid role: {user_role}")
        
        # Jika tanggal tidak disediakan, gunakan tanggal hari ini
        if not tanggal:
            tanggal = datetime.now().strftime("%Y-%m-%d")
            
        # Terapkan filter tambahan jika ada
        if golongan:
            query = query.eq("golongan_darah", golongan)
        
        if jenis:
            query = query.eq("jenis_darah", jenis)
        
        if rhesus:  # Add filter for rhesus
            query = query.eq("rhesus", rhesus)
        
        if city:
            query = query.eq("city_donor", city)
        
        # Eksekusi query
        response = query.execute()
        
        # For daily data, apply the date filter to the already filtered query
        response_harian = query.eq("tanggal_donor", tanggal).execute()
        
        if hasattr(response, 'error') and response.error:
            raise HTTPException(status_code=500, detail=f"Database error: {response.error.message}")
        
        if hasattr(response_harian, 'error') and response_harian.error:
            raise HTTPException(status_code=500, detail=f"Database error: {response_harian.error.message}")
        
        data = response.data
        data_harian = response_harian.data
        
        # Jika tidak ada data, kembalikan response kosong
        if not data:
            return {
                "tanggal": tanggal,
                "total_kantong": 0,
                "total_darah_harian": 0,
                "total_pendonor": 0,
                "stok_per_golongan": {},
                "stok_per_jenis": {},
                "stok_per_rhesus": {},  # Added empty rhesus stats
                "distribusi_per_kota": {},
                "user_info": {
                    "role": user_role,
                    "full_name": full_name
                }
            }
        
        # Hitung total kantong darah harian
        total_darah_harian = len(data_harian)
        
        # Hitung total pendonor unik
        pendonor_unik = set()
        for item in data_harian:
            # Cek field iddarah untuk identifikasi unik pendonor
            donor_id = None
            if "iddarah" in item and item["iddarah"]:
                donor_id = item["iddarah"]
            elif "idUser" in item and item["idUser"]:
                donor_id = item["idUser"]
            elif "petugas" in item and item["petugas"]:
                donor_id = item["petugas"]
            elif "first_name" in item and "last_name" in item:
                # Jika tidak ada ID, gunakan kombinasi nama sebagai identifikasi unik
                donor_id = f"{item['first_name']}_{item['last_name']}"
                
            if donor_id:
                pendonor_unik.add(donor_id)
        
        # Jika set pendonor_unik masih kosong, gunakan jumlah kantong darah
        # dengan asumsi minimal ada 1 pendonor
        total_pendonor = len(pendonor_unik) if pendonor_unik else 0
        
        # Hitung total kantong
        total_kantong = len(data)
        
        # Hitung stok per golongan darah (berdasarkan jumlah kantong)
        golongan_darah = {}
        for item in data:
            gol = item.get("golongan_darah")
            if gol:
                golongan_darah[gol] = golongan_darah.get(gol, 0) + 1  # Increment by 1 for each bag
        
        # Hitung stok per jenis darah (berdasarkan jumlah kantong)
        jenis_darah = {}
        for item in data:
            jns = item.get("jenis_darah")
            if jns:
                jenis_darah[jns] = jenis_darah.get(jns, 0) + 1  # Increment by 1 for each bag
        
        # Hitung stok berdasarkan rhesus (berdasarkan jumlah kantong)
        rhesus_darah = {}
        for item in data:
            rh = item.get("rhesus")
            if rh:
                rhesus_darah[rh] = rhesus_darah.get(rh, 0) + 1  # Increment by 1 for each bag
        
        # Distribusi per kota (berdasarkan jumlah kantong)
        distribusi_kota = {}
        for item in data:
            kota = item.get("city_donor")
            if kota:
                distribusi_kota[kota] = distribusi_kota.get(kota, 0) + 1  # Increment by 1 for each bag
        
        # Bentuk response
        dashboard_summary = {
            "tanggal": tanggal,
            "total_kantong": total_kantong,  # Total kantong darah keseluruhan
            "total_darah_harian": total_darah_harian,  # Total kantong darah pada hari tersebut
            "total_pendonor": total_pendonor,  # Total pendonor unik pada hari tersebut
            "stok_per_golongan": golongan_darah,  # Jumlah kantong per golongan
            "stok_per_jenis": jenis_darah,  # Jumlah kantong per jenis
            "stok_per_rhesus": rhesus_darah,  # Jumlah kantong per rhesus
            "distribusi_per_kota": distribusi_kota,  # Jumlah kantong per kota
            "user_info": {
                "role": user_role,
                "full_name": full_name
            }
        }
        
        return dashboard_summary
    except Exception as e:
        print(f"Error accessing dashboard: {str(e)}")
        raise HTTPException(status_code=500, detail="Terjadi kesalahan saat mengakses data dashboard")


@router.get("/users/pmi")
def get_pmi_users():
    response = supabase.table("users").select("name").eq("role", "PMI").execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="No PMI users found")
    
    return {"pmi_users": response.data}

@router.get("/combined-blood-distribution")
def get_combined_blood_distribution():
    try:
        # Fetch users with role 'PMI'
        users_response = supabase.table("users").select("iduser, name").eq("role", "PMI").execute()

        if not users_response.data:
            raise HTTPException(status_code=404, detail="No PMI users found")

        # Fetch data from darah_pmi table to count donations per idpmi
        darah_pmi_response = supabase.table("darah_pmi").select("idpmi, iddarah").execute()

        if not darah_pmi_response.data:
            raise HTTPException(status_code=404, detail="No blood donation data found")

        # Aggregate blood donations by idpmi
        total_donations = {}
        for item in darah_pmi_response.data:
            idpmi = item["idpmi"]
            total_donations[idpmi] = total_donations.get(idpmi, 0) + 1

        # Combine users with blood donation count
        combined_data = []
        for user in users_response.data:
            idpmi = user["iduser"]
            total_donated = total_donations.get(idpmi, 0)  # Default to 0 if no donations
            combined_data.append({
                "name": user["name"],
                "idpmi": idpmi,
                "total_donations": total_donated
            })

        return {"combined_blood_distribution": combined_data}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching combined data: {str(e)}")