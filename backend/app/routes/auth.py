from fastapi import APIRouter, HTTPException, Response
from app.database import supabase
from app.schemas import LoginRequest
from passlib.context import CryptContext
from datetime import datetime, timedelta
import uuid

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



SESSION_EXPIRE_MINUTES = 60  

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/login")
def login_user(user: LoginRequest, response: Response):
    response_data = supabase.table("users").select("iduser, email, password, role, name").eq("email", user.email).execute()
    
    if not response_data.data:
        raise HTTPException(status_code=400, detail="Email tidak terdaftar")

    user_data = response_data.data[0]
    # 🔍 Debug logs
    print("Input Password:", user.password)
    print("Stored Hashed Password:", user_data["password"])
    print("Password Match:", verify_password(user.password, user_data["password"]))

    if not verify_password(user.password, user_data["password"]):
        raise HTTPException(status_code=401, detail="Password salah")

    session_id = str(uuid.uuid4())
    expire_time = datetime.utcnow() + timedelta(minutes=SESSION_EXPIRE_MINUTES)

    session_data = {
        "session_id": session_id,
        "user_id": user_data["iduser"],
        "expires_at": expire_time.isoformat()
    }
    supabase.table("sessions").insert(session_data).execute()

    response.set_cookie(key="session_id", value=session_id, httponly=True, max_age=SESSION_EXPIRE_MINUTES * 60)

    # ⬇ Return additional user info to frontend
    return {
        "message": "Login berhasil",
        "session_id": session_id,
        "user_info": {
            "iduser": user_data["iduser"],
            "name": user_data["name"],
            "role": user_data["role"]
        }
    }

@router.post("/logout")
def logout_user(response: Response):
    session_id = response.delete_cookie("session_id")  
    if session_id:
        supabase.table("sessions").delete().eq("session_id", session_id).execute()
    return {"message": "Logout berhasil"}