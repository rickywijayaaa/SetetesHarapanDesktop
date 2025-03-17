from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from app.database import supabase
from app.schemas import UserSchema
from passlib.context import CryptContext
import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Setup hashing password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Setup JWT
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")  # Load secret key dari .env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # Token berlaku 1 jam

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Fungsi untuk hashing password
def hash_password(password: str):
    return pwd_context.hash(password)

# Fungsi untuk verifikasi password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Fungsi untuk membuat JWT token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ENDPOINT REGISTER USER
@router.post("/register")
async def register_user(user: UserSchema):
    # Hash password sebelum disimpan
    hashed_password = hash_password(user.password)

    # Data yang akan dikirim ke Supabase
    data = user.dict()
    data["password"] = hashed_password  # Simpan password dalam bentuk hash

    response = supabase.table("users").insert(data).execute()

    if response.get("error"):
        raise HTTPException(status_code=400, detail="Failed to register user")

    return {"message": "User registered successfully"}

# ENDPOINT LOGIN USER
@router.post("/login")
async def login_user(email: str, password: str):
    response = supabase.table("users").select("*").eq("email", email).execute()

    if not response["data"]:
        raise HTTPException(status_code=400, detail="User not found")

    user = response["data"][0]  # Ambil user pertama yang ditemukan

    if not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")

    # Buat token JWT
    token = create_access_token({"sub": user["email"], "idUser": user["idUser"]})
    
    return {"access_token": token, "token_type": "bearer"}

# ENDPOINT LOGOUT USER (Client-side Logout)
@router.post("/logout")
async def logout_user():
    return {"message": "Successfully logged out. Please remove token from client."}
