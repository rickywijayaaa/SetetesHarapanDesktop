from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from crud import auth_crud
from schemas import UserCreate, UserLogin, Token, UserResponse
from utils.db import get_db
from utils.auth import create_access_token, get_current_user

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, supabase = Depends(get_db)):
    # Check if user exists
    existing_user = auth_crud.get_user_by_email(supabase, email=user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    return auth_crud.create_user(supabase=supabase, user=user)

@router.post("/login", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), supabase = Depends(get_db)):
    # Authenticate with Supabase
    try:
        response = supabase.auth.sign_in_with_password({
            "email": form_data.username,
            "password": form_data.password
        })
        user_data = auth_crud.get_user_by_email(supabase, form_data.username)
        
        # Create JWT token with role information
        access_token = create_access_token(
            data={"sub": form_data.username, "role": user_data["role"]}
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.post("/logout")
def logout_user(supabase = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        # Sign out from Supabase
        supabase.auth.sign_out()
        return {"message": "Successfully logged out"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Logout failed: {str(e)}"
        )