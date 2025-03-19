from fastapi import FastAPI
from app.routes import users
from app.schemas import DarahSchema
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from datetime import date
from supabase import create_client, Client

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
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(users.router, prefix="/users", tags=["Users"])

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI with Supabase"}

# Endpoint to handle blood donation data and insert it into Supabase
@app.post("/donor/")
async def add_blood_donation(data: DarahSchema):
    try:
        # Convert tanggal_donor (date) to string in YYYY-MM-DD format
        tanggal_donor_str = data.tanggal_donor.strftime('%Y-%m-%d')  # Convert date to string
        
        # Ensure waktu_donor is a valid string in HH:MM:SS format
        # If it's already in the right format, this step can be skipped
        waktu_donor_str = data.waktu_donor  # Assuming it's already in HH:MM:SS format

        # Insert data into Supabase "donor" table
        response = supabase.table("donor").insert({
            "first_name": data.first_name,
            "last_name": data.last_name,
            "nik": data.nik,
            "phone_number": data.phone_number,
            "golongan_darah": data.golongan_darah,
            "rhesus": data.rhesus,
            "jenis_darah": data.jenis_darah,
            "jumlah_darah": data.jumlah_darah,
            "idkantongdarah": data.idkantongdarah,  # Correct column name
            "petugas": data.petugas,
            "tanggal_donor": tanggal_donor_str,  # Use formatted string for tanggal_donor
            "waktu_donor": waktu_donor_str,  # Assuming waktu_donor is already in HH:MM:SS format
            "province_donor": data.province_donor,
            "city_donor": data.city_donor
        }).execute()

        # If the insertion is successful, return a success message with the response
        return {"message": "Blood donation record added successfully!", "data": response.data}

    except Exception as e:
        return {"error": str(e)}
