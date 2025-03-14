from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any

from crud import dashboard_crud
from schemas import DashboardResponse
from utils.db import get_db
from utils.auth import get_current_user, RoleChecker

router = APIRouter()

# Role-based access control
allow_kemenkes = RoleChecker(["kemenkes"])
allow_pmi = RoleChecker(["pmi"])
allow_hospital = RoleChecker(["hospital"])

@router.get("/dashboard", response_model=Dict[str, Any])
async def get_dashboard(
    current_user = Depends(get_current_user),
    supabase = Depends(get_db)
):
    # Route based on user role
    if current_user["role"] == "kemenkes":
        return dashboard_crud.get_kemenkes_dashboard(supabase)
    elif current_user["role"] == "pmi":
        return dashboard_crud.get_pmi_dashboard(supabase)
    elif current_user["role"] == "hospital":
        return dashboard_crud.get_hospital_dashboard(supabase, hospital_id=current_user["organization_id"])
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this dashboard"
        )