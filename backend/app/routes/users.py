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
    # Check if email is already used
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
        "role": user.role.value,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "nik": user.nik,
        "birth_date": str(user.birth_date) if user.birth_date else None,
        "jenis_kelamin": user.jenis_kelamin,
        "golongan_darah": user.golongan_darah,
        "rhesus": user.rhesus,
        "riwayat_result": user.riwayat_result,
        "total_points": 0  # ✅ default point
    }

    # Insert user without specifying iduser
    try:
        response = supabase.table("users").insert(new_user).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal menyimpan user: {str(e)}")



    inserted_user = response.data[0]  # Get auto-generated user
    return UserResponse(
        iduser=inserted_user["iduser"],
        name=inserted_user["name"],
        email=inserted_user["email"],
        phone_number=inserted_user["phone_number"],
        address=inserted_user["address"],
        city=inserted_user["city"],
        province=inserted_user["province"],
        role=inserted_user["role"]
    )

