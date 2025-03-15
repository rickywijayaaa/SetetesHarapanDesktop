from schemas import UserCreate

def get_user(supabase, user_id: str):
    response = supabase.table("users").select("*").eq("id", user_id).execute()
    return response.data[0] if response.data else None

def get_user_by_email(supabase, email: str):
    response = supabase.table("users").select("*").eq("email", email).execute()
    return response.data[0] if response.data else None

def get_users(supabase, page: int = 1, page_size: int = 100):
    # Calculate offset
    offset = (page - 1) * page_size
    response = supabase.table("users").select("*").range(offset, offset + page_size - 1).execute()
    return response.data

def create_user(supabase, user: UserCreate):
    # Create auth user with Supabase Auth
    auth_response = supabase.auth.sign_up({
        "email": user.email,
        "password": user.password
    })
    
    # Insert additional user data into users table
    user_data = {
        "id": auth_response.user.id,
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role,
        "organization_id": user.organization_id
    }
    
    data_response = supabase.table("users").insert(user_data).execute()
    return data_response.data[0]