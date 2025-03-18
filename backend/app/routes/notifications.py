from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas import NotificationCreate, NotificationResponse
from datetime import datetime

router = APIRouter()

@router.get("/notification", response_model=list[NotificationResponse])
def get_all_notifications():
    try:
        response = supabase.table("notifikasi").select("*").execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Tidak ada notifikasi ditemukan")

        return response.data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.post("/notification", response_model=NotificationResponse)
def create_notification(request: NotificationCreate):
    new_notification = {
        "iduser": request.iduser,
        "golongan_darah": request.golongan_darah,
        "rhesus": request.rhesus,
        "deadline": request.deadline.isoformat(),
        "message": request.message,
        "created_at": datetime.utcnow().isoformat()
    }

    try:
        inserted = supabase.table("notifikasi").insert(new_notification).execute()

        if inserted.data:
            return inserted.data[0]
        else:
            raise HTTPException(status_code=500, detail="Gagal menyimpan notifikasi")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.put("/notifications/{idnotification}/read", response_model=dict)
def mark_notification_as_read(idnotification: int):
    try:
        response = supabase.table("notifikasi").select("*").eq("idnotification", idnotification).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Notifikasi tidak ditemukan")

        update_data = {
            "is_read": True,  
            "read_at": datetime.utcnow().isoformat()
        }

        updated = supabase.table("notifikasi").update(update_data).eq("idnotification", idnotification).execute()

        if updated.data:
            return {"message": "Notifikasi berhasil diperbarui", "data": updated.data[0]}
        else:
            raise HTTPException(status_code=500, detail="Gagal memperbarui notifikasi")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
