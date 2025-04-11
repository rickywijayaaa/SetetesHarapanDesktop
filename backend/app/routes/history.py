from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas import DonorHistoryResponse, DonorHistoryItem
from datetime import datetime

router = APIRouter()

@router.get("/user/donor-history/{iduser}", response_model=DonorHistoryResponse)
def get_user_donor_history(iduser: int):
    try:
        # Ambil user berdasarkan iduser, untuk dapatkan NIK-nya
        user_response = supabase.table("users").select("nik").eq("iduser", iduser).execute()

        if not user_response.data:
            raise HTTPException(status_code=404, detail="User tidak ditemukan")

        nik = user_response.data[0].get("nik")
        if not nik:
            raise HTTPException(status_code=400, detail="User tidak memiliki NIK")

        # Ambil riwayat donor berdasarkan NIK
        donor_response = supabase.table("donor").select("tanggal_donor").eq("nik", nik).order("tanggal_donor", desc=True).execute()

        if donor_response is None or donor_response.data is None:
            raise HTTPException(status_code=500, detail="No response from Supabase")


        # Format response
        donations = [DonorHistoryItem(tanggal_donor=entry["tanggal_donor"]) for entry in donor_response.data]
        return {"donations": donations}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
