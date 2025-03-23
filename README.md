# SetetesHarapan

## Author
1. Nasywaa Anggun Athiefah (https://github.com/nasywaanaa)
2. Naomi Pricilla Agustine (https://github.com/naomipricillaa)
3. Ricky Wijaya (https://github.com/rickywijayaaa)
4. Micky Valentino (https://github.com/MickyV18)

**SetetesHarapan** merupakan platform digital yang bertujuan membantu pemerataan distribusi stok darah di Indonesia dan mempermudah pencarian donor darah dalam keadaan darurat. Proyek ini menggabungkan teknologi **Machine Learning**, **Notifikasi Real-Time**, dan **Komunikasi Emosional** antara pendonor dan penerima darah.

## SetetesHarapan Project

[H4H_Sandbox_HappyFamily_SetetesHarapan_Document](./H4H_Sandbox_HappyFamily_SetetesHarapan_Document.pdf)

## Deployment and Repository Links

| Description              | Link                                                                 |
|--------------------------|----------------------------------------------------------------------|
| Access SetetesHarapan Website (Kemenkes & PMI)             | (https://setetesharapan.vercel.app/) |
| Access SetetesHarapan Android Mobile App (Masyarakat)      | [(Aplikasi SetetesHarapan)](https://drive.google.com/file/d/16WzFaCPO40StXmj0RyaDuEMth2-PzlcL/view?usp=sharing) |
| Access SetetesHarapan IoS Mobile App (Masyarakat)          | (coming soon) |
| Demo Video     | (coming soon)                                                         |
| Deployment Frontend Website     | (https://setetesharapan.vercel.app/)                                                         |
| Deployment Backend Website & Mobile App      | (https://backend-setetesharapandesktop.up.railway.app) |
| GitHub          | (https://github.com/nasywaanaa/SetetesHarapan.git)                                               |
| Prototype untuk Mobile          | (https://bit.ly/SetetesHarapanPrototypeMobile)                                               |
| Prototype untuk Mobile          | (https://bit.ly/SetetesHarapanPrototypeDesktop)                                               |

## What's Inside?
Platform ini terdiri dari:
- **Frontend Desktop** (untuk RS, PMI, Kemenkes)
- **Frontend Mobile (React Native)** untuk masyarakat
- **Backend API** (FastAPI + Supabase)


```
SetetesHarapanDesktop/
├── backend/               # FastAPI + Supabase
├── frontend-desktop/      # Web admin panel (React.js)
└── frontend-mobile/       # Mobile app (React Native + Expo)
```


## Table of Contents
- [How to Run](#how-to-run)
  - [Backend](#1-backend)
  - [Frontend desktop](#2-frontend-desktop)
  - [Frontend mobile](#3-frontend-mobile)
- [Tech Stack](#tech-stack)
- [Endpoints Table](#endpoints-table)
- [Detailed Endpoints](#detailed-endpoints)
  - [Users](#users)
  - [Authentication](#authentication)
  - [Dashboard](#dashboard)
  - [Donor Events](#donor-events)
  - [Eligibility Check](#eligibility-check)
  - [News](#news)
  - [Notifications](#notifications)
  - [Points](#points)
  - [Leaderboard](#leaderboard)
  - [Profile](#profile)
  - [Vouchers](#vouchers)
  - [Blood Donations](#blood-donations)
  - [Blood Inventory](#blood-inventory)

---

## How to Run

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate                    # untuk MacOS
venv\Scripts\activate                       # untuk Windows
pip install -r requirements.txt
python3 -m uvicorn app.main:app --reload
```

---

### 2. Frontend desktop 

```bash
cd frontend-desktop
npm install
npm run dev
```

---

### 3. Frontend mobile

```bash
cd frontend-mobile
npm install
npx start
```


## Tech Stack

| Komponen        | Teknologi                              |
|----------------|-----------------------------------------|
| Backend         | FastAPI, Supabase                      |
| Frontend Web    | React.js (Vite), TailwindCSS           |
| Frontend Mobile | React Native (Expo), ShadCN UI         |
| Database        | PostgreSQL (Supabase)                  |
| ML Integration  | Python (Scikit Learn, Pandas)          |
| Deployment      | Railway, Vercel, Docker                |
| Design          | Figma                                  |


## API Documentation


### Endpoints Table

| Method | Endpoint                                                  | Description                         |
|--------|-----------------------------------------------------------|-------------------------------------|
| POST   | `/users/register`                                         | Register a new user                 |
| POST   | `/users/login`                                            | Login user                          |
| POST   | `/users/logout`                                           | Logout user                         |
| GET    | `/users/me`                                               | Get current logged-in user          |
| GET    | `/users/test-hash`                                        | Test password hashing               |
| GET    | `/api/dashboard`                                          | Get dashboard data                  |
| GET    | `/api/donor/events`                                       | Get all donor events                |
| GET    | `/api/donor/events/{idkegiatan}`                          | Get donor event by ID               |
| POST   | `/api/donor/register`                                     | Create new donor event              |
| POST   | `/api/donor/eligibility-check`                            | Save eligibility check              |
| GET    | `/api/donor/eligibility-check/{idpengguna}`               | Get eligibility check by user ID    |
| GET    | `/api/home/news`                                          | Get all news                        |
| POST   | `/api/home/news`                                          | Create news                         |
| GET    | `/api/notification`                                       | Get all notifications               |
| POST   | `/api/notification`                                       | Create a notification               |
| PUT    | `/api/notifications/{idnotification}/read`                | Mark notification as read           |
| GET    | `/api/user/points/{iduser}`                               | Get user points by ID               |
| PUT    | `/api/user/points/{iduser}`                               | Update user points by ID            |
| GET    | `/api/leaderboard`                                        | Get leaderboard data                |
| GET    | `/api/user/profile/{iduser}`                              | Get user profile by ID              |
| PUT    | `/api/user/profile/{iduser}`                              | Update user profile by ID           |
| POST   | `/api/user/profile`                                       | Create user profile                 |
| GET    | `/api/vouchers/{idvoucher}`                               | Get voucher detail by ID            |
| POST   | `/api/vouchers/`                                          | Create voucher                      |
| POST   | `/api/user/redeem-voucher/{idpengguna}/{idvoucher}`       | Redeem voucher                      |
| GET    | `/api/cities`                                             | Get available cities                |
| GET    | `/api/blood-stock`                                        | Get blood stock                     |
| GET    | `/api/blood-stock/total`                                  | Get total blood stock               |
| GET    | `/donor/`                                                 | Get all blood donations             |
| POST   | `/donor/`                                                 | Add a blood donation                |
| DELETE | `/donor/{iddarah}`                                        | Delete a blood donation             |

---

## Detailed Endpoints

### Eligibility Check

#### `POST /api/donor/eligibility-check`
- **Description**: Save eligibility check results for a user.
- **Request Body**:
```json
{
  "idpengguna": 1,
  "jawaban1": "Yes",
  "jawaban2": "No",
  "jawaban3": "Yes"
}
```
- **Response**:
```json
{
  "idpengguna": 1,
  "results": true,
  "created_at": "2025-03-23T11:53:08.419Z"
}
```

#### `GET /api/donor/eligibility-check/{idpengguna}`
- **Description**: Get eligibility check result by user ID.
- **Response**:
```json
{
  "idpengguna": 1,
  "results": true,
  "created_at": "2025-03-23T11:53:14.633Z"
}
```

### News

#### `GET /api/home/news`
- **Description**: Get all news.
- **Response**:
```json
[
  {
    "idberita": 1,
    "description": "Update jadwal donor terbaru"
  }
]
```

#### `POST /api/home/news`
- **Request Body**:
```json
{
  "description": "Donor darah massal pekan depan"
}
```
- **Response**:
```json
{
  "idberita": 2,
  "description": "Donor darah massal pekan depan"
}
```

### Notifications

#### `GET /api/notification`
- **Response**:
```json
[
  {
    "idnotification": 1,
    "iduser": 1,
    "golongan_darah": "A",
    "rhesus": "+",
    "deadline": "2025-03-23T11:53:37.835Z",
    "message": "Butuh donor segera di Bandung",
    "created_at": "2025-03-23T11:53:37.835Z"
  }
]
```

#### `POST /api/notification`
- **Request Body**:
```json
{
  "iduser": 1,
  "golongan_darah": "B",
  "rhesus": "-",
  "deadline": "2025-03-24T11:00:00.000Z",
  "message": "Donor dibutuhkan di Jakarta"
}
```

### Points

#### `GET /api/user/points/{iduser}`
- **Description**: Get user's total points.
- **Response**:
```json
"120"
```

#### `PUT /api/user/points/{iduser}`
- **Request Body**:
```json
{
  "total_points": 150
}
```
- **Response**:
```json
"Updated successfully"
```

### Leaderboard

#### `GET /api/leaderboard`
- **Response**:
```json
[
  {
    "iduser": 1,
    "name": "John Doe",
    "total_points": 200
  }
]
```

### Profile

#### `GET /api/user/profile/{iduser}`
- **Response**:
```json
{
  "iduser": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone_number": "08123456789",
  "address": "Jl. Mawar",
  "city": "Bandung",
  "province": "Jawa Barat",
  "role": "Masyarakat"
}
```

#### `PUT /api/user/profile/{iduser}`
- **Request Body**:
```json
{
  "name": "John Updated",
  "email": "john@example.com",
  "password": "newpassword",
  "phone_number": "08123456789",
  "address": "Jl. Mawar",
  "city": "Bandung",
  "province": "Jawa Barat",
  "role": "Masyarakat"
}
```

### Blood Inventory

#### `GET /api/blood-stock/total`
- **Optional Query**: `?city=Bandung`
- **Response**:
```json
"Total stok darah di Bandung: 120 kantong"
```
---

> **Copyright © 2025 SetetesHarapan**
