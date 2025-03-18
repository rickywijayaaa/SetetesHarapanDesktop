from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas import DonorEventRequest, DonorEventResponse
from datetime import datetime

router = APIRouter()

@router.get("/donor/events", response_model=list[DonorEventResponse])
def get_all_donor_events():
    try:
        response = supabase.table("kegiatan").select("*").execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Tidak ada event donor ditemukan")

        return response.data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("/donor/events/{idkegiatan}", response_model=DonorEventResponse)
def get_donor_event_by_id(idkegiatan: int):
    try:
        response = supabase.table("kegiatan").select("*").eq("idkegiatan", idkegiatan).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Event donor tidak ditemukan")

        return response.data[0]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.post("/donor/register", response_model=DonorEventResponse)
def create_donor_event(event: DonorEventRequest):
    new_event = {
        "tempat": event.tempat,
        "tanggal": event.tanggal.isoformat(),
        "waktu_mulai": str(event.waktu_mulai),
        "waktu_berakhir": str(event.waktu_berakhir),
        "description": event.description,
        "image_url": event.image_url,
        "created_by": event.created_by
    }

    try:
        inserted = supabase.table("kegiatan").insert(new_event).execute()

        if inserted.data:
            return inserted.data[0]
        else:
            raise HTTPException(status_code=500, detail="Gagal menyimpan event donor")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
