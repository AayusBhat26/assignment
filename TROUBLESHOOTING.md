# 🔧 Troubleshooting Guide

## 🚨 Common Issues and Solutions

### **1. "Could not find the table 'public.users' in the schema cache"**

**Problem**: Database tables don't exist in Supabase.

**Solution**:
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Copy the entire contents of `database/schema.sql`
4. Paste and execute the SQL commands
5. Verify tables are created in **Table Editor**

**Quick Check**:
```bash
npm run verify-setup
```

### **2. "supabaseUrl is required" Error**

**Problem**: Missing or invalid Supabase environment variables.

**Solution**:
1. Create `.env.local` file in project root
2. Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
JWT_SECRET=your-secret-key-here
```

3. Restart your development server

### **3. "Invalid API key" Error**

**Problem**: Incorrect Supabase API keys.

**Solution**:
1. Go to Supabase project **Settings** → **API**
2. Copy the correct keys:
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **Anon key**: Public key for client-side
   - **Service role key**: Secret key for server-side
3. Update `.env.local`
4. Restart server

### **4. "Table does not exist" Error**

**Problem**: Database schema not properly created.

**Solution**:
1. **Verify tables exist**:
   - Go to Supabase **Table Editor**
   - Check for: `users`, `activities`, `bookings`

2. **Recreate schema if needed**:
   - Go to **SQL Editor**
   - Run the complete `database/schema.sql`

3. **Check for errors**:
   - Look for SQL execution errors
   - Ensure all commands completed successfully

### **5. Authentication Errors**

**Problem**: User registration/login failing.

**Solution**:
1. **Check Supabase Auth settings**:
   - Go to **Authentication** → **Settings**
   - Ensure email auth is enabled
   - Check email templates

2. **Verify database permissions**:
   - Go to **Authentication** → **Policies**
   - Ensure RLS policies are correct

3. **Check environment variables**:
   - Verify `JWT_SECRET` is set
   - Ensure Supabase keys are correct

### **6. Build Errors**

**Problem**: Application won't build or deploy.

**Solution**:
1. **Clean build**:
```bash
rm -rf .next
npm run build
```

2. **Check dependencies**:
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Verify TypeScript**:
```bash
npm run lint
```

### **7. Port Already in Use**

**Problem**: Port 3000 is occupied.

**Solution**:
1. **Find and kill process**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

2. **Use different port**:
```bash
npm run dev -- -p 3001
```

### **8. Database Connection Issues**

**Problem**: Can't connect to Supabase database.

**Solution**:
1. **Check network connectivity**
2. **Verify project status** in Supabase dashboard
3. **Check database password** in connection string
4. **Ensure IP allowlist** includes your IP

## 🔍 **Diagnostic Commands**

### **Check Setup Status**
```bash
npm run verify-setup
```

### **Test Database Connection**
```bash
# Test basic connectivity
curl -X GET "https://your-project-ref.supabase.co/rest/v1/activities" \
  -H "apikey: your-anon-key"
```

### **Check Environment Variables**
```bash
# Windows
echo %NEXT_PUBLIC_SUPABASE_URL%

# Mac/Linux
echo $NEXT_PUBLIC_SUPABASE_URL
```

## 📋 **Setup Checklist**

- [ ] Supabase project created
- [ ] Environment variables set in `.env.local`
- [ ] Database schema executed in SQL Editor
- [ ] Tables visible in Table Editor
- [ ] Sample data loaded
- [ ] Development server running
- [ ] API endpoints responding

## 🆘 **Getting Help**

### **1. Check Logs**
- Browser console for frontend errors
- Terminal for backend errors
- Supabase dashboard for database errors

### **2. Verify Each Step**
- Use `npm run verify-setup` to check status
- Test individual API endpoints
- Check database tables manually

### **3. Common Solutions**
- Restart development server after env changes
- Clear browser cache and local storage
- Verify Supabase project is active
- Check API key permissions

### **4. Still Stuck?**
- Check the [README.md](README.md) for detailed setup
- Review [setup.md](setup.md) for quick start
- Use the Postman collection to test APIs
- Verify database schema matches requirements

## 🎯 **Quick Recovery Steps**

If everything is broken:

1. **Stop all processes**
2. **Delete `.next` folder**
3. **Verify `.env.local` exists and is correct**
4. **Re-run database schema in Supabase**
5. **Reinstall dependencies**: `npm install`
6. **Start fresh**: `npm run dev`

## 🔄 **Environment Reset**

```bash
# Clean everything
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

Remember: Most issues are related to missing environment variables or database setup. The verification script will help identify the exact problem!
