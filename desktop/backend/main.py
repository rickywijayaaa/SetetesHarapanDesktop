from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth_router, donor_router, broadcast_router, dashboard_router

app = FastAPI(title="Blood Donation Management System")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router.router, tags=["Authentication"])
app.include_router(dashboard_router.router, tags=["Dashboard"])
app.include_router(donor_router.router, tags=["Donor Management"])
app.include_router(broadcast_router.router, tags=["Broadcast"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Blood Donation Management System API"}