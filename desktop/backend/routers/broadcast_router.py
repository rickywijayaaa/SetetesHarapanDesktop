from fastapi import APIRouter, Depends, HTTPException, status, Path, Query
from typing import List

from crud import broadcast_crud
from schemas import BroadcastCreate, BroadcastResponse
from utils.db import get_db
from utils.auth import get_current_user, RoleChecker

router = APIRouter()

# Only hospitals can send broadcasts
allow_hospital = RoleChecker(["hospital"])

@router.post("/broadcast", response_model=BroadcastResponse)
async def create_broadcast(
    broadcast: BroadcastCreate,
    current_user = Depends(allow_hospital),
    supabase = Depends(get_db)
):
    return broadcast_crud.create_broadcast(
        supabase=supabase, 
        broadcast=broadcast, 
        hospital_id=current_user["organization_id"]
    )

@router.delete("/broadcast/{broadcast_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_broadcast(
    broadcast_id: str = Path(..., title="The ID of the broadcast to delete"),
    current_user = Depends(allow_hospital),
    supabase = Depends(get_db)
):
    broadcast = broadcast_crud.get_broadcast(supabase, broadcast_id=broadcast_id)
    if not broadcast:
        raise HTTPException(status_code=404, detail="Broadcast not found")
    
    # Check if user has rights to delete this broadcast
    if broadcast["hospital_id"] == current_user["organization_id"]:
        broadcast_crud.delete_broadcast(supabase=supabase, broadcast_id=broadcast_id)
        return None
    else:
        raise HTTPException(status_code=403, detail="Not authorized to delete this broadcast")