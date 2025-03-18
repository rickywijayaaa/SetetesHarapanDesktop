from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas import UserProfileRequest, UserProfileResponse
from datetime import datetime

router = APIRouter()

@router.get("/user/profile/{iduser}", response_model=UserProfileResponse)
def get_user_profile(iduser: int):
    try:
        response = supabase.table("users").select("*").eq("iduser", iduser).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="User tidak ditemukan")

        user = response.data[0]

        user_data = {
            "iduser": user.get("iduser"),
            "name": user.get("name"),
            "email": user.get("email"),
            "phone_number": user.get("phone_number"),
            "address": user.get("address", ""),
            "city": user.get("city", ""),
            "province": user.get("province", ""),
            "role": user.get("role", "")
        }

        return user_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.put("/user/profile/{iduser}", response_model=UserProfileResponse)
def update_user_profile(iduser: int, request: UserProfileRequest):
    try:
        update_data = {
            "name": request.name,
            "email": request.email,
            "phone_number": request.phone_number,
            "address": request.address,
            "city": request.city,
            "province": request.province,
            "role": request.role
        }

        updated = supabase.table("users").update(update_data).eq("iduser", iduser).execute()

        if updated.data:
            return updated.data[0]
        else:
            raise HTTPException(status_code=500, detail="Gagal memperbarui profil user")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.post("/user/profile", response_model=UserProfileResponse)
def create_user_profile(request: UserProfileRequest):
    new_user = {
        "name": request.name,
        "email": request.email,
        "password": request.password, 
        "phone_number": request.phone_number,
        "address": request.address,
        "city": request.city,
        "province": request.province,
        "role": request.role
    }

    try:
        inserted = supabase.table("users").insert(new_user).execute()

        if inserted.data:
            return inserted.data[0]
        else:
            raise HTTPException(status_code=500, detail="Gagal membuat user baru")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
