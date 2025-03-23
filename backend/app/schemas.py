# Schemas.py : request & response API menggunakan Pydantic untuk validate data

from pydantic import BaseModel, EmailStr, field_validator # Validation data yang diterima dan dikembalikan sesuai dengan tipe yang diharapkan
from typing import Optional
from datetime import datetime, time
from enum import Enum

class UserRole(str, Enum):
    kemenkes = "Kemenkes"
    pmi = "PMI"
    rumah_sakit = "Rumah Sakit"
    masyarakat = "Masyarakat"

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    phone_number: str
    address: str
    city: str
    province: str
    role: UserRole
    password: str  

    first_name: Optional[str] = None
    last_name: Optional[str] = None
    nik: Optional[str] = None
    birth_date: Optional[datetime] = None
    jenis_kelamin: Optional[str] = None
    golongan_darah: Optional[str] = None
    rhesus: Optional[str] = None
    riwayat_result: Optional[bool] = None

    @field_validator("first_name", "last_name", "nik", "birth_date", "jenis_kelamin", "golongan_darah", "rhesus", "riwayat_result", mode="before")
    @classmethod
    def validate_masyarakat_fields(cls, v, info):
        if info.data.get("role") == UserRole.masyarakat and v is None:
            raise ValueError(f"{info.field_name} wajib diisi untuk role Masyarakat.")
        return v

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    name: str
    email: EmailStr
    phone_number: str
    address: str
    city: str
    province: str
    role: UserRole

class OtpSchema(BaseModel):
    idUser: int
    otpCode: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class QuestionnaireSchema(BaseModel):
    idPengguna: int
    results: bool 

class HealthRecordRequest(BaseModel):
    idpengguna: int
    jawaban1: str
    jawaban2: str
    jawaban3: str

class HealthRecordResponse(BaseModel):
    idquestionnaire: int
    idpengguna: int
    results: bool
    created_at: datetime

class DarahSchema(BaseModel):
    first_name: str
    last_name: str
    nik: str
    phone_number: str
    golongan_darah: str
    rhesus: str
    jenis_darah: str
    jumlah_darah: int
    iddarah: str
    petugas: str
    tanggal_donor: datetime
    waktu_donor: str
    province_donor: str
    city_donor: str

class DarahRumahSakitSchema(BaseModel):
    idRumahSakit: int
    idDarah: int

class DarahPMISchema(BaseModel):
    idPMI: int
    idDarah: int

class NotificationSchema(BaseModel):
    idUser: int
    golongan_darah: str
    rhesus: str
    deadline: datetime
    message: str

class PesanSchema(BaseModel):
    idUser: int
    idDarah: int
    pesan: str
    penerima: int

class VoucherSchema(BaseModel):
    points: int
    description: str
    expired_date: datetime
    nominal: float

class KegiatanDonorSchema(BaseModel):
    tempat: str
    tanggal: datetime
    waktu_mulai: str
    waktu_berakhir: str
    description: str

class DonorDaruratSchema(BaseModel):
    idUser: int
    tanggal_donor: datetime
    waktu_donor: str

class NewsRequest(BaseModel):
    description: str

class NewsResponse(BaseModel):
    idberita: int
    description: str

class DonorEventRequest(BaseModel):
    tempat: str
    tanggal: datetime
    waktu_mulai: time
    waktu_berakhir: time
    description: str
    image_url: str
    created_by: int

class DonorEventResponse(DonorEventRequest):
    idkegiatan: int

class EligibilityCheckRequest(BaseModel):
    idpengguna: int
    jawaban1: str
    jawaban2: str
    jawaban3: str

class EligibilityCheckResponse(BaseModel):
    idpengguna: int
    results: bool
    created_at: datetime

class NotificationCreate(BaseModel):
    iduser: int
    golongan_darah: str
    rhesus: str
    deadline: datetime
    message: str

class NotificationResponse(BaseModel):
    idnotification: int
    iduser: int
    golongan_darah: str
    rhesus: str
    deadline: datetime
    message: str
    created_at: datetime

    class Config:
        from_attributes = True


class NotificationUpdate(BaseModel):
    is_read: bool
    read_at: Optional[datetime] = None

class UserProfileRequest(BaseModel):
    name: str
    email: EmailStr
    password: Optional[str] = None 
    phone_number: str
    address: str
    city: str
    province: str
    role: str  

class UserProfileResponse(BaseModel):
    iduser: int
    name: str
    email: EmailStr
    phone_number: str
    address: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    role: Optional[str] = None

class VoucherCreate(BaseModel):
    points: int
    description: str
    expired_date: datetime
    nominal: float
    image_url: str
    is_active: bool

class VoucherResponse(VoucherCreate):
    idvoucher: int