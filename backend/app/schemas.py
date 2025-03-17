from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime

# User Schema
class UserSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone_number: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    role: str
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

class UserResponse(BaseModel):
    idUser: int
    name: str
    email: EmailStr
    role: str
    total_points: int

    class Config:
        orm_mode = True


# OTP Schema
class OtpSchema(BaseModel):
    idUser: int
    otpCode: str
    expires_at: datetime


# Questionnaire Schema
class QuestionnaireSchema(BaseModel):
    idPengguna: int
    results: bool


# Darah Schema
class DarahSchema(BaseModel):
    first_name: str
    last_name: str
    nik: str
    phone_number: str
    golongan_darah: str
    rhesus: str
    jenis_darah: str
    jumlah_darah: int
    idKantongDarah: str
    petugas: str
    tanggal_donor: date
    waktu_donor: str
    province_donor: str
    city_donor: str


# Notification Schema
class NotificationSchema(BaseModel):
    idUser: int
    golongan_darah: str
    rhesus: str
    deadline: datetime
    message: str


# Pesan Schema
class PesanSchema(BaseModel):
    idUser: int
    idDarah: int
    pesan: str
    penerima: int


# Voucher Schema
class VoucherSchema(BaseModel):
    points: int
    description: str
    expired_date: date
    nominal: float
    image_url: Optional[str] = None
    is_active: Optional[bool] = True


# Kegiatan Donor Schema
class KegiatanDonorSchema(BaseModel):
    tempat: str
    tanggal: date
    waktu_mulai: str
    waktu_berakhir: str
    description: str
    image_url: Optional[str] = None
    created_by: int
    max_participants: int
    current_participants: Optional[int] = 0


# Donor Darurat Schema
class DonorDaruratSchema(BaseModel):
    idUser: int
    tanggal_donor: date
    waktu_donor: str
    status: str
    notes: Optional[str] = None
