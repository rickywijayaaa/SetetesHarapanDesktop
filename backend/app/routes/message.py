from fastapi import APIRouter, HTTPException
from app.database import supabase
from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional
import traceback

router = APIRouter()

# Model untuk pembuatan pesan baru
class MessageCreate(BaseModel):
    utd_pengirim: str
    utd_penerima: str
    jumlah: int
    tanggal: date
    pesan: str

# Model untuk respons pesan
class MessageResponse(BaseModel):
    idmessage: int
    utd_pengirim: str
    utd_penerima: str
    jumlah: int
    tanggal: date
    pesan: str

@router.get("/messages", response_model=list[MessageResponse])
def get_all_messages():
    """
    Mengambil semua pesan dari database
    """
    try:
        response = supabase.table("messages").select("*").execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Tidak ada pesan ditemukan")

        return response.data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("/messages/sent/{utd_pengirim}", response_model=list[MessageResponse])
def get_sent_messages(utd_pengirim: str):
    """
    Mengambil pesan yang dikirim oleh UTD tertentu
    """
    try:
        response = supabase.table("messages").select("*").eq("utd_pengirim", utd_pengirim).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail=f"Tidak ada pesan dari UTD {utd_pengirim}")

        return response.data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("/messages/received/{utd_penerima}", response_model=list[MessageResponse])
def get_received_messages(utd_penerima: str):
    """
    Mengambil pesan yang diterima oleh UTD tertentu
    """
    try:
        response = supabase.table("messages").select("*").eq("utd_penerima", utd_penerima).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail=f"Tidak ada pesan untuk UTD {utd_penerima}")

        return response.data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.post("/messages", response_model=MessageResponse)
def create_message(request: MessageCreate):
    """
    Membuat pesan baru
    """
    new_message = {
        "utd_pengirim": request.utd_pengirim,
        "utd_penerima": request.utd_penerima,
        "jumlah": request.jumlah,
        "tanggal": request.tanggal.isoformat(),
        "pesan": request.pesan
    }

    try:
        inserted = supabase.table("messages").insert(new_message).execute()

        if inserted.data:
            return inserted.data[0]
        else:
            raise HTTPException(status_code=500, detail="Gagal menyimpan pesan")

    except Exception as e:
        full_traceback = traceback.format_exc()
        print("❌ Full traceback:", full_traceback)
        
        raise HTTPException(
            status_code=500,
            detail=f"Error saat membuat pesan: {str(e)}\n\nFull Traceback:\n{full_traceback}"
        )

@router.get("/messages/{idmessage}", response_model=MessageResponse)
def get_message_by_id(idmessage: int):
    """
    Mengambil pesan berdasarkan ID
    """
    try:
        response = supabase.table("messages").select("*").eq("idmessage", idmessage).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Pesan tidak ditemukan")

        return response.data[0]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.delete("/messages/{idmessage}", response_model=dict)
def delete_message(idmessage: int):
    """
    Menghapus pesan berdasarkan ID
    """
    try:
        # Periksa apakah pesan ada
        check = supabase.table("messages").select("idmessage").eq("idmessage", idmessage).execute()
        
        if not check.data:
            raise HTTPException(status_code=404, detail="Pesan tidak ditemukan")
        
        # Hapus pesan
        deleted = supabase.table("messages").delete().eq("idmessage", idmessage).execute()
        
        return {"message": f"Pesan dengan ID {idmessage} berhasil dihapus"}
        
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")