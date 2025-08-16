-- Fix Timestamp Issues in Activity Booking API
-- Run this script in Supabase SQL Editor

-- 1. Check current table structure
\d bookings;

-- 2. Drop existing triggers
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
DROP TRIGGER IF EXISTS update_activities_updated_at ON activities;

-- 3. Drop the function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- 4. Recreate the function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Recreate triggers
CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at 
    BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Fix existing invalid timestamps
UPDATE bookings 
SET created_at = NOW(), updated_at = NOW() 
WHERE created_at IS NULL OR created_at = '1970-01-01 00:00:00+00';

-- 7. Remove extra timestamp column if it exists
ALTER TABLE bookings DROP COLUMN IF EXISTS timestamp;

-- 8. Verify the table structure
\d bookings;

-- 9. Check if timestamps are now valid
SELECT 
    id,
    created_at,
    updated_at,
    booking_date
FROM bookings 
LIMIT 5;

