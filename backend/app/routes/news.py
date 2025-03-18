from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas import NewsRequest, NewsResponse

router = APIRouter()

@router.get("/home/news", response_model=list[NewsResponse])
def get_news():
    response = supabase.table("berita").select("*").execute()
    return response.data

@router.post("/home/news", response_model=NewsResponse)
def create_news(news: NewsRequest):
    inserted = supabase.table("berita").insert(news.dict()).execute()
    return inserted.data[0]
