from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas import VoucherCreate, VoucherResponse
from datetime import datetime

router = APIRouter()

@router.get("/vouchers/{idvoucher}", response_model=VoucherResponse)
def get_voucher_detail(idvoucher: int):
    response = supabase.table("voucher").select("*").eq("idvoucher", idvoucher).execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="Voucher tidak ditemukan")

    return response.data[0]

@router.post("/vouchers/", response_model=VoucherResponse)
def create_voucher(request: VoucherCreate):
    new_voucher = {
        "points": request.points,
        "description": request.description,
        "expired_date": request.expired_date.isoformat(),
        "nominal": request.nominal,
        "image_url": request.image_url,
        "is_active": request.is_active
    }

    try:
        inserted = supabase.table("voucher").insert(new_voucher).execute()

        if inserted.data:
            return inserted.data[0]
        else:
            raise HTTPException(status_code=500, detail="Gagal menyimpan voucher")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.post("/user/redeem-voucher/{idpengguna}/{idvoucher}")
def redeem_voucher(idpengguna: int, idvoucher: int):
    user_response = supabase.table("users").select("iduser, total_points").eq("iduser", idpengguna).execute()
    
    if not user_response.data:
        raise HTTPException(status_code=404, detail="User tidak ditemukan")
    
    user = user_response.data[0]

    voucher_response = supabase.table("voucher").select("*").eq("idvoucher", idvoucher).execute()
    
    if not voucher_response.data:
        raise HTTPException(status_code=404, detail="Voucher tidak ditemukan")
    
    voucher = voucher_response.data[0]

    if user["total_points"] < voucher["points"]:
        raise HTTPException(status_code=400, detail="Points tidak cukup untuk menukarkan voucher")

    new_points = user["total_points"] - voucher["points"]
    update_response = supabase.table("users").update({"total_points": new_points}).eq("iduser", idpengguna).execute()

    redemption_data = {
        "iduser": idpengguna,
        "idvoucher": idvoucher,
        "redeemed_at": datetime.utcnow().isoformat()
    }
    supabase.table("redeemed_vouchers").insert(redemption_data).execute()

    return {
        "message": "Voucher berhasil ditukarkan!",
        "iduser": idpengguna,
        "idvoucher": idvoucher,
        "remaining_points": new_points
    }