from pydantic import BaseModel, EmailStr, field_validator, ValidationError
from typing import Optional
from datetime import date
from enum import Enum

# ENUM untuk Role
class UserRole(str, Enum):
    kemenkes = "Kemenkes"
    pmi = "PMI"
    rumah_sakit = "Rumah sakit"
    masyarakat = "Masyarakat"

# Schema untuk User
class UserSchema(BaseModel):
    idUser: int  # Tidak optional karena harus diisi
    name: str
    email: EmailStr
    password: str
    phone_number: str
    address: str
    city: str
    province: str
    role: UserRole  # Hanya bisa 'Kemenkes', 'PMI', 'Rumah sakit', atau 'Masyarakat'

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

    # **Validasi untuk memastikan bahwa field wajib diisi jika role adalah "Masyarakat"**
    @field_validator("first_name", "last_name", "nik", "birth_date", "jenis_kelamin", "golongan_darah", "rhesus", "riwayat_result", mode="before")
    @classmethod
    def validate_masyarakat_fields(cls, v, values, field):
        if values.get("role") == UserRole.masyarakat and v is None:
            raise ValueError(f"{field.name} harus diisi untuk role 'Masyarakat'")
        return v

    class Config:
        from_attributes = True  # Untuk mendukung Pydantic V2
