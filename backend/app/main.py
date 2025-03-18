from fastapi import FastAPI
from app.routes import users, auth, health, news, donor_events, eligibility_check, notifications, profile, points, vouchers

app = FastAPI()

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(health.router, prefix="/api", tags=["Health Records"])
app.include_router(news.router, prefix="/api", tags=["News"])
app.include_router(donor_events.router, prefix="/api", tags=["Donor Events"])
app.include_router(eligibility_check.router, prefix="/api", tags=["Donor Eligibility Check"])
app.include_router(notifications.router, prefix="/api", tags=["Notifications"])
app.include_router(profile.router, prefix="/api", tags=["User Profile"])
app.include_router(points.router, prefix="/api", tags=["Points & Leaderboard"])
app.include_router(vouchers.router, prefix="/api", tags=["Vouchers"])


@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI with Supabase"}
