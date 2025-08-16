# Activity Booking API - Setup Guide

## 🚀 Quick Setup Instructions

### 1. Environment Configuration

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

### 2. Supabase Project Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and API keys from the project settings
3. Go to SQL Editor and run the contents of `database/schema.sql`

### 3. Run the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 4. Test the API

Use the provided Postman collection (`postman_collection.json`) or curl commands from the README.

## 🔧 Troubleshooting

### Common Issues:

1. **Port 3000 already in use**: Change the port in `package.json` scripts
2. **Supabase connection errors**: Verify your environment variables
3. **Database errors**: Ensure the schema has been created in Supabase

### Getting Help:

- Check the README.md for detailed documentation
- Review the API endpoints in the README
- Use the Postman collection for testing
