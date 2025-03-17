from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas import UserSchema

router = APIRouter()

@router.post("/register")
async def register_user(user: UserSchema):
    data = {"username": user.username, "email": user.email, "password": user.password}
    
    # Simpan user ke Supabase
    response = supabase.table("users").insert(data).execute()
    
    if response.get("error"):
        raise HTTPException(status_code=400, detail="Failed to register user")

    return {"message": "User registered successfully"}
