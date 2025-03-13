from schemas import BroadcastCreate

def get_broadcast(supabase, broadcast_id: str):
    response = supabase.table("broadcasts").select("*").eq("id", broadcast_id).execute()
    return response.data[0] if response.data else None

def get_broadcasts(supabase, page: int = 1, page_size: int = 100):
    # Calculate offset
    offset = (page - 1) * page_size
    response = supabase.table("broadcasts").select("*").range(offset, offset + page_size - 1).execute()
    return response.data

def create_broadcast(supabase, broadcast: BroadcastCreate, hospital_id: str):
    # Add hospital_id to the broadcast data
    broadcast_data = broadcast.dict()
    broadcast_data["hospital_id"] = hospital_id
    broadcast_data["created_at"] = "now()"  # Use PostgreSQL function for current timestamp
    
    response = supabase.table("broadcasts").insert(broadcast_data).execute()
    return response.data[0]

def delete_broadcast(supabase, broadcast_id: str):
    supabase.table("broadcasts").delete().eq("id", broadcast_id).execute()