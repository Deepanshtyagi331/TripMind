# 🧠 TripMind — AI-Powered Travel Itinerary Generator

<p align="center">
  <strong>Upload your booking documents. Get a smart, day-by-day travel itinerary in seconds.</strong>
</p>

---

## ✨ Features

- **📤 Document Upload** — Drag-and-drop PDFs and images of flight confirmations, hotel bookings, and travel plans
- **🔍 Smart Extraction** — Automatically extracts text from PDFs (pdf-parse) and images (Tesseract.js OCR)
- **🤖 AI Itinerary Generation** — OpenAI GPT-4o-mini analyzes your documents and creates structured, day-by-day itineraries
- **📅 Day-wise Planning** — Activities organized chronologically with times, locations, and notes
- **✈️ Flight & Hotel Cards** — Beautiful display of all booking details
- **🔗 Shareable Links** — Generate public links to share itineraries with travel companions
- **🔒 Secure Authentication** — JWT-based auth with httpOnly cookies
- **📱 Fully Responsive** — Mobile-first design that works on all devices

---

## 🏗️ Architecture

```
tripmind/
├── client/                  # React frontend (Vite + TailwindCSS v4)
│   └── src/
│       ├── api/             # Axios instances & API calls
│       ├── components/      # Reusable UI components
│       │   ├── auth/        # Login/Register forms
│       │   ├── dashboard/   # Dashboard cards, lists, empty states
│       │   ├── itinerary/   # Tabs, timeline, flight/hotel cards
│       │   ├── upload/      # Dropzone, file preview, progress
│       │   └── shared/      # Navbar, Footer, Spinner, ErrorBoundary
│       ├── context/         # AuthContext, ItineraryContext
│       ├── hooks/           # useAuth, useItineraries
│       ├── pages/           # Landing, Login, Register, Dashboard, Itinerary, Share
│       └── routes/          # Protected routes setup
├── server/                  # Node.js + Express backend
│   ├── config/              # DB, Cloudinary, Multer configs
│   ├── controllers/         # Auth, Upload, Itinerary, Share controllers
│   ├── middleware/          # Auth protection, error handling, rate limiting
│   ├── models/              # User, Document, Itinerary Mongoose schemas
│   ├── routes/              # API route definitions
│   ├── services/            # AI, Extraction, Storage services
│   └── server.js            # Express app entry point
├── .env.example
├── package.json             # Root with concurrently
└── README.md
```

---

## ⚙️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite, TailwindCSS v4, React Router v6, Framer Motion, Axios |
| **Backend** | Node.js, Express.js, MongoDB + Mongoose |
| **Auth** | JWT (jsonwebtoken), bcryptjs, httpOnly cookies |
| **AI** | OpenAI API (GPT-4o-mini) |
| **File Processing** | Multer, pdf-parse, Tesseract.js (OCR) |
| **Storage** | Cloudinary (default), AWS S3 (optional) |
| **Security** | Helmet, express-rate-limit, express-validator, CORS |
| **UI** | Lucide React icons, React Dropzone, React Hot Toast |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- OpenAI API key
- Cloudinary account

### 1. Clone & Install

```bash
git clone <your-repo-url> tripmind
cd tripmind
npm run install:all
```

### 2. Configure Environment

```bash
cp .env.example server/.env
```

Edit `server/.env` with your credentials:

```env
MONGO_URI=mongodb://localhost:27017/tripmind
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d
OPENAI_API_KEY=sk-your-openai-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLIENT_URL=http://localhost:5173
PORT=5001
```

### 3. Run Development Server

```bash
npm run dev
```

This starts both:
- **Server** → http://localhost:5001
- **Client** → http://localhost:5173

---

## 📡 API Documentation

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login, returns JWT | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOi...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

### Documents

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/documents/upload` | Upload up to 5 files (PDF/images) | ✅ |

**Upload:** Send as `multipart/form-data` with field name `files`. Max 10MB per file.

### Itineraries

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/itineraries/generate` | Generate itinerary from documents | ✅ |
| GET | `/api/itineraries` | List user's itineraries (paginated) | ✅ |
| GET | `/api/itineraries/:id` | Get single itinerary | ✅ |
| DELETE | `/api/itineraries/:id` | Delete itinerary | ✅ |

**Generate Request:**
```json
{
  "documentIds": ["doc_id_1", "doc_id_2"]
}
```

### Sharing

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/itineraries/:id/share` | Toggle public sharing | ✅ |
| GET | `/api/share/:shareToken` | View shared itinerary | ❌ |

---

## 🎨 Design System

- **Primary Background**: Deep Navy (`#0F172A`)
- **Accent Color**: Teal (`#0D9488`)
- **Text**: White / White with opacity
- **Cards**: Glassmorphism (backdrop-blur + translucent borders)
- **Font**: Inter (Google Fonts)
- **Animations**: Framer Motion page transitions & micro-interactions

---

## 🔒 Security

- Passwords hashed with bcrypt (salt rounds: 12)
- JWT stored in httpOnly cookies
- Helmet.js for HTTP security headers
- Rate limiting on auth routes (10 requests per 15 minutes)
- Input validation with express-validator
- CORS restricted to frontend origin
- AI output sanitized before database storage

---

## 📦 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret for JWT signing |
| `JWT_EXPIRE` | ✅ | JWT expiration (e.g., `7d`) |
| `OPENAI_API_KEY` | ✅ | OpenAI API key |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API secret |
| `CLIENT_URL` | ✅ | Frontend URL for CORS |
| `PORT` | ❌ | Server port (default: 5001) |
| `USE_S3` | ❌ | Set `true` to use AWS S3 instead of Cloudinary |
| `AWS_ACCESS_KEY_ID` | ❌ | AWS access key (if using S3) |
| `AWS_SECRET_ACCESS_KEY` | ❌ | AWS secret key (if using S3) |
| `AWS_BUCKET_NAME` | ❌ | S3 bucket name |
| `AWS_REGION` | ❌ | AWS region (default: us-east-1) |

---

## 📝 License

MIT © TripMind
