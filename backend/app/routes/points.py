from fastapi import APIRouter, HTTPException, Query
from app.database import supabase
from datetime import datetime, timedelta

router = APIRouter()

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