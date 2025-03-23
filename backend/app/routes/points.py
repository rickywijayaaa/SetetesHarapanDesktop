from fastapi import APIRouter, HTTPException, Query
from app.database import supabase
from datetime import datetime, timedelta
from pydantic import BaseModel

router = APIRouter()

class UpdatePointsRequest(BaseModel):
    total_points: int

@router.get("/user/points/{iduser}")
def get_user_points(iduser: int):
    response = supabase.table("users").select("iduser, total_points").eq("iduser", iduser).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="User tidak ditemukan")
    
    return {"iduser": iduser, "total_points": response.data[0]["total_points"]}

@router.get("/leaderboard")
def get_leaderboard():
    response = supabase.table("users").select("iduser, name, total_points").order("total_points", desc=True).execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="Leaderboard tidak ditemukan")

    return {"leaderboard": response.data}

@router.put("/user/points/{iduser}")
def update_user_points(iduser: int, request: UpdatePointsRequest):
    try:
        # Update total_points berdasarkan iduser
        response = supabase.table("users").update({
            "total_points": request.total_points
        }).eq("iduser", iduser).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="User tidak ditemukan")

        return {
            "message": "Berhasil update total points",
            "data": response.data[0]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
