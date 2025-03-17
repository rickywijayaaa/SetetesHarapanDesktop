from pydantic import BaseModel
from typing import Optional
from datetime import date
from enum import Enum

# ENUM untuk Role
class UserRole(str, Enum):
    kemenkes = "Kemenkes"
    pmi = "PMI"
    rumah_sakit = "Rumah sakit"
    masyarakat = "Masyarakat"

# Model untuk User (Menyesuaikan dengan Database)
class User(BaseModel):
    idUser: int
    name: str
    email: str
    password: str  # Password yang disimpan sudah dalam bentuk hash
    phone_number: str
    address: str
    city: str
    province: str
    role: UserRole  # Role hanya bisa 'Kemenkes', 'PMI', 'Rumah sakit', 'Masyarakat'

    # **Field khusus untuk "Masyarakat"**
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    nik: Optional[str] = None
    birth_date: Optional[date] = None
    points_transaction: Optional[int] = 0
    total_points: Optional[int] = 0
    jenis_kelamin: Optional[str] = None
    golongan_darah: Optional[str] = None
    rhesus: Optional[str] = None
    riwayat_result: Optional[bool] = None

    class Config:
        from_attributes = True  # Untuk mendukung Pydantic V2
