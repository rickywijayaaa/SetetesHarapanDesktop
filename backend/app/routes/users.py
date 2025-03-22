from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas import UserRegister, UserResponse
from passlib.context import CryptContext
from uuid import uuid4

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

@router.post("/register", response_model=UserResponse)
def register_user(user: UserRegister):
    response = supabase.table("users").select("email").eq("email", user.email).execute()
    if response.data:
        raise HTTPException(status_code=400, detail="Email sudah terdaftar")

    hashed_password = hash_password(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "phone_number": user.phone_number,
        "address": user.address,
        "city": user.city,
        "province": user.province,
        "role": user.role,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "nik": user.nik,
        "birth_date": str(user.birth_date) if user.birth_date else None,
        "jenis_kelamin": user.jenis_kelamin,
        "golongan_darah": user.golongan_darah,
        "rhesus": user.rhesus,
        "riwayat_result": user.riwayat_result,
        "total_points": 0
    }

    response = supabase.table("users").insert(new_user).execute()
    if hasattr(response, 'error') and response.error:
        raise HTTPException(status_code=500, detail="Gagal menyimpan user")

    return UserResponse(
        name=new_user["name"],
        email=new_user["email"],
        phone_number=new_user["phone_number"],
        address=new_user["address"],
        city=new_user["city"],
        province=new_user["province"],
        role=new_user["role"]
    )