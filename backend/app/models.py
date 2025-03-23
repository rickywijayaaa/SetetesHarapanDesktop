# Models.py : struktur database menggunakan SQLAlchemy (library ORM untuk database relational python)

from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship, declarative_base
from enum import Enum as PyEnum

Base = declarative_base()

# ENUM untuk Role
class UserRole(str, PyEnum):
    kemenkes = "Kemenkes"
    pmi = "PMI"
    rumah_sakit = "Rumah Sakit"
    masyarakat = "Masyarakat"

class User(Base):
    __tablename__ = "users"

    idUser = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    province = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)

    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    nik = Column(String, unique=True, nullable=True)
    birth_date = Column(Date, nullable=True)
    jenis_kelamin = Column(String, nullable=True)
    golongan_darah = Column(String, nullable=True)
    rhesus = Column(String, nullable=True)
    riwayat_result = Column(Boolean, nullable=True)

class Otp(Base):
    __tablename__ = "otp"

    idOTP = Column(Integer, primary_key=True, index=True)
    idUser = Column(Integer, ForeignKey("users.idUser"), nullable=False)
    otpCode = Column(String, nullable=False)

    user = relationship("User", back_populates="otps")

User.otps = relationship("Otp", back_populates="user")

class Questionnaire(Base):
    __tablename__ = "questionnaire"

    idPengguna = Column(Integer, ForeignKey("users.idUser"), primary_key=True)
    results = Column(Boolean, nullable=False)

    user = relationship("User", back_populates="questionnaires")

User.questionnaires = relationship("Questionnaire", back_populates="user")

class Darah(Base):
    __tablename__ = "darah"

    idDarah = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    nik = Column(String, unique=True, nullable=False)
    phone_number = Column(String, nullable=False)
    golongan_darah = Column(String, nullable=False)
    rhesus = Column(String, nullable=False)
    jenis_darah = Column(String, nullable=False)
    jumlah_darah = Column(Integer, nullable=False)
    idKantongDarah = Column(String, nullable=False)
    petugas = Column(String, nullable=False)
    tanggal_donor = Column(Date, nullable=False)
    waktu_donor = Column(String, nullable=False)
    province_donor = Column(String, nullable=False)
    city_donor = Column(String, nullable=False)


class DarahRumahSakit(Base):
    __tablename__ = "darah_rumahsakit"

    idRumahSakit = Column(Integer, ForeignKey("users.idUser"), primary_key=True)
    idDarah = Column(Integer, ForeignKey("darah.idDarah"), primary_key=True)

    rumah_sakit = relationship("User")
    darah = relationship("Darah")

class DarahPMI(Base):
    __tablename__ = "darah_pmi"

    idPMI = Column(Integer, ForeignKey("users.idUser"), primary_key=True)
    idDarah = Column(Integer, ForeignKey("darah.idDarah"), primary_key=True)

    pmi = relationship("User")
    darah = relationship("Darah")

class Notification(Base):
    __tablename__ = "notification"

    idNotification = Column(Integer, primary_key=True, index=True)
    idUser = Column(Integer, ForeignKey("users.idUser"), nullable=False)
    golongan_darah = Column(String, nullable=False)
    rhesus = Column(String, nullable=False)
    deadline = Column(Date, nullable=False)
    message = Column(String, nullable=False)

    user = relationship("User", back_populates="notifications")

User.notifications = relationship("Notification", back_populates="user")

class Pesan(Base):
    __tablename__ = "pesan"

    idPesan = Column(Integer, primary_key=True, index=True)
    idUser = Column(Integer, ForeignKey("users.idUser"), nullable=False)
    idDarah = Column(Integer, ForeignKey("darah.idDarah"), nullable=False)
    pesan = Column(String, nullable=False)
    penerima = Column(Integer, ForeignKey("users.idUser"), nullable=False)

    user = relationship("User", foreign_keys=[idUser])
    darah = relationship("Darah")
    receiver = relationship("User", foreign_keys=[penerima])

class Voucher(Base):
    __tablename__ = "voucher"

    idVoucher = Column(Integer, primary_key=True, index=True)
    points = Column(Integer, nullable=False)
    description = Column(String, nullable=False)
    expired_date = Column(Date, nullable=False)
    nominal = Column(Integer, nullable=False)

class KegiatanDonor(Base):
    __tablename__ = "kegiatan_donor"

    idKegiatan = Column(Integer, primary_key=True, index=True)
    tempat = Column(String, nullable=False)
    tanggal = Column(Date, nullable=False)
    waktu_mulai = Column(String, nullable=False)
    waktu_berakhir = Column(String, nullable=False)
    description = Column(String, nullable=False)

class DonorDarurat(Base):
    __tablename__ = "donor_darurat"

    idDonorDarurat = Column(Integer, primary_key=True, index=True)
    idUser = Column(Integer, ForeignKey("users.idUser"), nullable=False)
    tanggal_donor = Column(Date, nullable=False)
    waktu_donor = Column(String, nullable=False)

    user = relationship("User", back_populates="donor_darurat")

User.donor_darurat = relationship("DonorDarurat", back_populates="user")
