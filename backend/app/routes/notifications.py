from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas import NotificationCreate, NotificationResponse
from datetime import datetime
import traceback

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

import traceback

@router.post("/notification", response_model=NotificationResponse)
def create_notification(request: NotificationCreate):
    # Ensure address is not None, set a default if missing
    address = request.address if request.address else "Unknown Address"
    
    # Prepare the new notification data
    new_notification = {
        "iduser": request.iduser,
        "golongan_darah": request.golongan_darah,
        "rhesus": request.rhesus,
        "deadline": request.deadline.isoformat(),
        "message": request.message,
        "address": address,  # Use the address value with default if None
        "is_read": False,  # Set notification as unread initially
        "read_at": None,  # Set read_at as None initially
        "created_at": datetime.utcnow().isoformat()  # Set creation timestamp
    }

    try:
        # Insert the new notification into the database
        inserted = supabase.table("notifikasi").insert(new_notification).execute()

        if inserted.data:
            return inserted.data[0]  # Return the created notification
        else:
            raise HTTPException(status_code=500, detail="Failed to save notification")

    except Exception as e:
        # Capture and log full traceback for debugging
        full_traceback = traceback.format_exc()
        print("❌ Full traceback:", full_traceback)
        
        # Raise HTTPException with the full traceback in the detail
        raise HTTPException(
            status_code=500,
            detail=f"Error occurred while creating notification: {str(e)}\n\nFull Traceback:\n{full_traceback}"
        )


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
