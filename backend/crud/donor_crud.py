from schemas import DonorCreate

def get_donor(supabase, donor_id: str):
    response = supabase.table("donors").select("*").eq("id", donor_id).execute()
    return response.data[0] if response.data else None

def get_donors(supabase, page: int = 1, page_size: int = 100, user_role: str = None, user_id: str = None):
    # Calculate offset
    offset = (page - 1) * page_size
    
    # PMI can see all donors
    if user_role == "pmi":
        response = supabase.table("donors").select("*").range(offset, offset + page_size - 1).execute()
    # Hospital can only see their own donors
    elif user_role == "hospital":
        response = supabase.table("donors").select("*").eq("organization_id", user_id).range(offset, offset + page_size - 1).execute()
    else:
        return []

    return response.data

def create_donor(supabase, donor: DonorCreate, organization_id: str):
    # Add organization_id to the donor data
    donor_data = donor.dict()
    donor_data["organization_id"] = organization_id
    
    response = supabase.table("donors").insert(donor_data).execute()
    return response.data[0]

def delete_donor(supabase, donor_id: str):
    supabase.table("donors").delete().eq("id", donor_id).execute()