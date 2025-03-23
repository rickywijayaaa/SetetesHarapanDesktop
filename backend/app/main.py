from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from app.routes import users
from app.schemas import DarahSchema
from datetime import date
from fastapi import FastAPI
from app.routes.users import router as users_router  
from app.routes.auth import router as auth_router 
from app.routes.dashboard import router as dashboard_router  
from app.routes.donor_events import router as donor_events_router  
from app.routes.eligibility_check import router as eligibility_check_router  
from app.routes.health import router as health_router  
from app.routes.news import router as news_router  
from app.routes.notifications import router as notifications_router
from app.routes.points import router as points_router  
from app.routes.profile import router as profile_router  
from app.routes.vouchers import router as vouchers_router
from app.routes.stok_darah import router as stok_darah_router  # Import router stok darah
from fastapi import Request
from fastapi import HTTPException
import json


app = FastAPI()

# Get Supabase credentials from environment variables
load_dotenv()  # To load environment variables from the .env file

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Allow cross-origin requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8081"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)




@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI with Supabase"}

# Endpoint to handle blood donation data and insert it into Supabase
@app.post("/donor/")
async def add_blood_donation(data: DarahSchema, request: Request):
    try:
        # Get user_info from session/cookie/localStorage, here assumed to be passed in headers
        user_info = request.headers.get("x-user-info")
        if not user_info:
            raise HTTPException(status_code=400, detail="User info not provided")
        
        user_info = json.loads(user_info)
        user_id = user_info["iduser"]
        role = user_info["role"].lower()

        tanggal_donor_str = data.tanggal_donor.strftime('%Y-%m-%d')
        waktu_donor_str = data.waktu_donor

        # Insert into main donor table
        supabase.table("donor").insert({
            "first_name": data.first_name,
            "last_name": data.last_name,
            "nik": data.nik,
            "phone_number": data.phone_number,
            "golongan_darah": data.golongan_darah,
            "rhesus": data.rhesus,
            "jenis_darah": data.jenis_darah,
            "jumlah_darah": data.jumlah_darah,
            "iddarah": data.iddarah,
            "petugas": data.petugas,
            "tanggal_donor": tanggal_donor_str,
            "waktu_donor": waktu_donor_str,
            "province_donor": data.province_donor,
            "city_donor": data.city_donor
        }).execute()

        # Insert into role-based table
        if role == "pmi":
            supabase.table("darah_pmi").insert({
                "idpmi": user_id,
                "iddarah": data.iddarah,
                "tanggal_donor": tanggal_donor_str,
                "waktu_donor": waktu_donor_str
            }).execute()
        elif role == "rumah sakit":
            supabase.table("darah_rs").insert({
                "idrumahsakit": user_id,
                "iddarah": data.iddarah,
                "tanggal_donor": tanggal_donor_str,
                "waktu_donor": waktu_donor_str
            }).execute()

        return {"message": "Blood donation inserted successfully."}

    except Exception as e:
        import traceback
        print("❌ Full traceback:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.delete("/donor/{iddarah}/")
async def delete_blood_donation(iddarah: str):
    try:
        # Delete the record from the "donor" table using the iddarah
        response = supabase.table("donor").delete().match({"iddarah": iddarah}).execute()

        # Check if the record exists and was deleted
        if response.data:
            return {"message": f"Blood donation record with ID {iddarah} deleted successfully."}
        else:
            raise HTTPException(status_code=404, detail="Donor not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/donor/")
async def get_donors():
    try:
        # Query data from Supabase
        response = supabase.table("donor").select("*").execute()

        # Return the response data
        if response.data:
            return response.data  # Should be a list of donor records
        else:
            raise HTTPException(status_code=404, detail="No donors found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

app.include_router(users_router, prefix="/users", tags=["users"])
app.include_router(auth_router, prefix="/users", tags=["auth"])
app.include_router(dashboard_router, prefix="/api", tags=["dashboard"])
app.include_router(donor_events_router, prefix="/api", tags=["donor_events"])
app.include_router(eligibility_check_router, prefix="/api", tags=["eligibility_check"])
app.include_router(health_router, prefix="/api", tags=["health"])
app.include_router(news_router, prefix="/api", tags=["news"])
app.include_router(notifications_router, prefix="/api", tags=["notifications"])
app.include_router(points_router, prefix="/api", tags=["points"])
app.include_router(profile_router, prefix="/api", tags=["profile"])
app.include_router(vouchers_router, prefix="/api", tags=["vouchers"])
app.include_router(stok_darah_router, prefix="/api", tags=["blood_inventory"])  # Tambahkan router stok darah