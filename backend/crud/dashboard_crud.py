def get_kemenkes_dashboard(supabase):
    # Get overview for Kemenkes dashboard
    total_donors = supabase.table("donors").select("count", count="exact").execute()
    total_hospitals = supabase.table("organizations").select("count", count="exact").eq("type", "hospital").execute()
    total_pmi = supabase.table("organizations").select("count", count="exact").eq("type", "pmi").execute()
    
    # Get blood type distribution
    blood_types = supabase.table("donors").select("blood_type, count").group_by("blood_type").execute()
    
    # Get donation trends over time
    donation_trends = supabase.rpc("get_donation_trends_monthly").execute()
    
    return {
        "total_donors": total_donors.count,
        "total_hospitals": total_hospitals.count,
        "total_pmi": total_pmi.count,
        "blood_type_distribution": blood_types.data,
        "donation_trends": donation_trends.data
    }

def get_pmi_dashboard(supabase):
    # Get overview for PMI dashboard
    total_donors = supabase.table("donors").select("count", count="exact").execute()
    low_stock_blood_types = supabase.rpc("get_low_stock_blood_types").execute()
    
    # Get blood type distribution
    blood_types = supabase.table("donors").select("blood_type, count").group_by("blood_type").execute()
    
    # Get donation trends over time
    donation_trends = supabase.rpc("get_donation_trends_monthly").execute()
    
    # Get recent broadcasts from hospitals
    recent_broadcasts = supabase.table("broadcasts").\
        select("*").\
        order("created_at", desc=True).\
        limit(10).\
        execute()
    
    return {
        "total_donors": total_donors.count,
        "low_stock_blood_types": low_stock_blood_types.data,
        "blood_type_distribution": blood_types.data,
        "donation_trends": donation_trends.data,
        "recent_broadcasts": recent_broadcasts.data
    }

def get_hospital_dashboard(supabase, hospital_id: str):
    # Get overview for Hospital dashboard
    total_hospital_donors = supabase.table("donors").\
        select("count", count="exact").\
        eq("organization_id", hospital_id).\
        execute()
    
    # Get hospital's blood type inventory
    blood_inventory = supabase.table("donors").\
        select("blood_type, count").\
        eq("organization_id", hospital_id).\
        group_by("blood_type").\
        execute()
    
    # Get hospital's donation trends
    hospital_donation_trends = supabase.rpc("get_hospital_donation_trends_monthly", {"hospital_id_param": hospital_id}).execute()
    
    # Get hospital's active broadcasts
    active_broadcasts = supabase.table("broadcasts").\
        select("*").\
        eq("hospital_id", hospital_id).\
        eq("status", "active").\
        order("created_at", desc=True).\
        execute()
    
    return {
        "total_hospital_donors": total_hospital_donors.count,
        "blood_inventory": blood_inventory.data,
        "donation_trends": hospital_donation_trends.data,
        "active_broadcasts": active_broadcasts.data
    }