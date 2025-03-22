from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from supabase import create_client, Client
from app.routes import users
from app.schemas import DarahSchema
from datetime import date
from fastapi import FastAPI
from app.routes.users import router as users_router  # Import the users router
from app.routes.auth import router as auth_router  # Import the users router

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
    allow_origins=["*"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)




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

        response = supabase.table("donor").insert({
            "first_name": data.first_name,
            "last_name": data.last_name,
            "nik": data.nik,
            "phone_number": data.phone_number,
            "golongan_darah": data.golongan_darah,
            "rhesus": data.rhesus,
            "jenis_darah": data.jenis_darah,
            "jumlah_darah": data.jumlah_darah,
            "iddarah": data.iddarah,  # ← updated key
            "petugas": data.petugas,
            "tanggal_donor": tanggal_donor_str,
            "waktu_donor": waktu_donor_str,
            "province_donor": data.province_donor,
            "city_donor": data.city_donor
        }).execute()


        # If the insertion is successful, return a success message with the response
        return {"message": "Blood donation record added successfully!", "data": response.data}

    except Exception as e:
        return {"error": str(e)}

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

# Include the users router with a prefix (optional)
app.include_router(users_router, prefix="/users", tags=["users"])

# Include the users router with a prefix (optional)
app.include_router(auth_router, prefix="/users", tags=["auth"])