from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas import EligibilityCheckRequest, EligibilityCheckResponse
from datetime import datetime

router = APIRouter()

@router.post("/donor/eligibility-check", response_model=EligibilityCheckResponse)
def save_eligibility_check(request: EligibilityCheckRequest):
    results = (
        request.jawaban1.strip().lower() == "iya" and
        request.jawaban2.strip().lower() == "iya" and
        request.jawaban3.strip().lower() == "iya"
    )

    response = supabase.table("eligibility").select("*").eq("idpengguna", request.idpengguna).execute()
    print(f"Supabase Response: {response}")

    if response.data:
        update_data = {
            "results": results,
            "created_at": datetime.utcnow().isoformat()
        }
        updated = supabase.table("eligibility").update(update_data).eq("idpengguna", request.idpengguna).execute()
        print(f"🔥 Updated Data: {updated}")

        if updated.data:
            return updated.data[0]
        else:
            raise HTTPException(status_code=500, detail="Gagal memperbarui data di Supabase")

    else:
        new_data = {
            "idpengguna": request.idpengguna,
            "results": results,
            "created_at": datetime.utcnow().isoformat()
        }
        inserted = supabase.table("eligibility").insert(new_data).execute()
        print(f"Inserted Data: {inserted}")

        if inserted.data:
            return inserted.data[0]
        else:
            raise HTTPException(status_code=500, detail="Gagal menyimpan data di Supabase")

@router.get("/donor/eligibility-check/{idpengguna}", response_model=EligibilityCheckResponse)
def get_eligibility_check(idpengguna: int):
    response = supabase.table("eligibility").select("*").eq("idpengguna", idpengguna).execute()
    print(f"GET Response from Supabase: {response}")

    if not response.data:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")

    return response.data[0]
