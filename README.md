# Activity Booking API

A modern activity booking system built with Next.js, Supabase, and Tailwind CSS. This application allows users to browse activities, make bookings, and manage their reservations.

## 🚀 Features

- **User Authentication**: Secure signup and login using Supabase Auth
- **Activity Management**: Browse, search, and filter 150+ diverse activities
- **Advanced Search**: Search by title, description, location, price range, and sort options
- **Booking System**: Book activities with real-time slot availability and date selection
- **User Dashboard**: View and manage personal bookings with cancel functionality
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Real-time Updates**: Live updates for activity availability and booking management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **ORM**: Prisma (optional, for advanced database operations)
- **Deployment**: Vercel (optional)

## 📋 Prerequisites

Before running this application, you need:

1. **Node.js** (version 18 or higher)
2. **Supabase Account** - Create a new project at [supabase.com](https://supabase.com)
3. **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd activity-booking-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database URL (for Prisma)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Database Setup

#### Option A: Using Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Execute the SQL commands

#### Option B: Using Prisma

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio
npm run db:studio
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 API Endpoints

### Authentication

#### POST `/api/signup`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

#### POST `/api/login`
Authenticate and log in an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

### Activities

#### GET `/api/activities`
Fetch all available activities with pagination and filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for title/description
- `location` (optional): Filter by location

**Response:**
```json
{
  "activities": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "hasMore": true
  }
}
```

#### GET `/api/activities/:id`
Fetch a single activity by ID.

**Response:**
```json
{
  "activity": {
    "id": "uuid",
    "title": "Activity Title",
    "description": "Activity description",
    "location": "Location",
    "price": 99.99,
    "available_slots": 5
  }
}
```

### Bookings

#### POST `/api/book`
Book an activity (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "activityId": "activity_uuid"
}
```

**Response:**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": "booking_uuid",
    "user_id": "user_uuid",
    "activity_id": "activity_uuid"
  }
}
```

#### GET `/api/my-bookings`
Fetch all bookings for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "bookings": [
    {
      "id": "booking_uuid",
      "created_at": "2024-01-01T00:00:00Z",
      "activities": {
        "id": "activity_uuid",
        "title": "Activity Title",
        "description": "Description",
        "location": "Location",
        "price": 99.99,
        "available_slots": 4
      }
    }
  ]
}
```

#### DELETE `/api/cancel-booking`
Cancel a user's booking.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
```
id: <booking_uuid>
```

**Response:**
```json
{
  "message": "Booking cancelled successfully",
  "bookingId": "booking_uuid"
}
```

**Features:**
- Only allows cancellation of future bookings
- Automatically increases available slots for the activity
- Requires user authentication and ownership verification
- Cannot cancel past or completed activities

## 🗄️ Database Schema

### Users Table
- `id`: UUID (Primary Key)
- `email`: VARCHAR(255) UNIQUE
- `password`: VARCHAR(255) - Hashed
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Activities Table
- `id`: UUID (Primary Key)
- `title`: VARCHAR(255)
- `description`: TEXT
- `location`: VARCHAR(255)
- `price`: DECIMAL(10,2)
- `available_slots`: INTEGER
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Bookings Table
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key → users.id)
- `activity_id`: UUID (Foreign Key → activities.id)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## 🔒 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **CORS Protection**: Built-in Next.js CORS handling

## 🎨 UI Components

- **AuthForm**: Login and signup forms
- **ActivityList**: Browse and search activities
- **MyBookings**: View personal bookings
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Environment Variables for Production

Make sure to set these in your production environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

## 🧪 Testing

### Using Postman

Import the provided Postman collection or use these curl commands:

#### Signup
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### Get Activities
```bash
curl http://localhost:3000/api/activities
```

#### Book Activity
```bash
curl -X POST http://localhost:3000/api/book \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"activityId":"ACTIVITY_UUID"}'
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

### Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
├── lib/                    # Utility libraries
├── database/               # Database schema
├── prisma/                 # Prisma configuration
└── README.md              # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/activity-booking-api/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the excellent backend services
- Tailwind CSS for the utility-first CSS framework
- The open-source community for inspiration and tools
