-- Activity Booking API Database Schema
-- This file contains the SQL commands to create the required tables
-- Note: Users are managed by Supabase Auth, so no custom users table is needed

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    available_slots INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
-- Note: user_id references Supabase Auth users (auth.users)
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- This will reference Supabase Auth users
    activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL, -- Date when the user wants to book the activity
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, activity_id, booking_date) -- Prevent duplicate bookings on same date
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_activities_location ON activities(location);
CREATE INDEX IF NOT EXISTS idx_activities_available_slots ON activities(available_slots);
CREATE INDEX IF NOT EXISTS idx_activities_price ON activities(price);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_activity_id ON bookings(activity_id);

-- Insert extensive sample activities
INSERT INTO activities (title, description, location, price, available_slots) VALUES
-- Outdoor Adventures
('Mountain Hiking Adventure', 'Experience the thrill of mountain hiking with our expert guides. Breathtaking views and unforgettable memories await!', 'Rocky Mountains', 89.99, 15),
('Beach Yoga Session', 'Start your day with peaceful beach yoga. Perfect for beginners and experienced practitioners alike.', 'Coastal Beach', 25.50, 30),
('Rock Climbing Workshop', 'Learn rock climbing basics in a safe, controlled environment. All equipment provided.', 'Indoor Gym', 75.00, 12),
('Sunset Kayaking', 'Paddle through calm waters while watching a beautiful sunset. Perfect for couples and families.', 'Lake View', 65.00, 18),
('Forest Camping Experience', 'Spend a night under the stars in our guided forest camping experience. Includes tent setup and campfire cooking.', 'National Forest', 120.00, 8),
('Mountain Biking Trail', 'Explore scenic mountain trails with our guided mountain biking adventure. Various difficulty levels available.', 'Mountain Trails', 95.00, 20),
('River Rafting Adventure', 'Experience the excitement of white water rafting on class II-III rapids. Safety equipment and guides included.', 'River Rapids', 150.00, 16),
('Zipline Adventure', 'Soar through the treetops on our thrilling zipline course. Multiple lines with varying heights and speeds.', 'Adventure Park', 85.00, 25),

-- Food & Culinary
('City Food Tour', 'Discover the best local cuisine on our guided food tour. Taste authentic dishes from top-rated restaurants.', 'Downtown', 45.00, 20),
('Cooking Masterclass', 'Learn to cook gourmet dishes from professional chefs. Hands-on experience with premium ingredients.', 'Culinary Institute', 125.00, 12),
('Wine Tasting Experience', 'Sample fine wines from local vineyards with expert sommeliers. Includes cheese pairing and vineyard tour.', 'Wine Valley', 75.00, 18),
('Brewery Tour & Tasting', 'Explore local craft breweries and sample their finest beers. Learn about brewing process and history.', 'Brewery District', 55.00, 22),
('Farm-to-Table Cooking', 'Harvest fresh ingredients from our organic farm and learn to cook seasonal dishes.', 'Organic Farm', 95.00, 15),
('Sushi Making Workshop', 'Master the art of sushi making with our expert sushi chefs. All ingredients and tools provided.', 'Sushi Academy', 110.00, 10),
('Chocolate Making Class', 'Create delicious handmade chocolates and truffles. Perfect for chocolate lovers and beginners.', 'Chocolate Factory', 65.00, 16),
('BBQ Masterclass', 'Learn the secrets of perfect BBQ from pit masters. Includes meat selection, seasoning, and cooking techniques.', 'BBQ School', 85.00, 14),

-- Arts & Culture
('Pottery Workshop', 'Create beautiful ceramic pieces in our pottery studio. All materials and equipment provided.', 'Art Studio', 70.00, 12),
('Photography Workshop', 'Learn photography fundamentals and advanced techniques. Includes field trips and photo editing.', 'Photo Studio', 90.00, 18),
('Painting Class', 'Express your creativity in our painting workshop. Various styles and techniques taught.', 'Art Gallery', 60.00, 20),
('Glass Blowing Experience', 'Learn the ancient art of glass blowing. Create your own unique glass piece to take home.', 'Glass Studio', 180.00, 8),
('Jewelry Making Workshop', 'Design and create your own jewelry pieces. Learn various techniques including wire wrapping and beading.', 'Jewelry Studio', 80.00, 15),
('Calligraphy Class', 'Master the art of beautiful handwriting. Learn traditional and modern calligraphy styles.', 'Calligraphy Studio', 55.00, 16),
('Dance Workshop', 'Learn various dance styles from professional dancers. Suitable for all skill levels.', 'Dance Studio', 45.00, 25),
('Music Production Class', 'Learn music production and recording techniques. Use professional equipment and software.', 'Music Studio', 120.00, 10),

-- Wellness & Fitness
('Meditation Retreat', 'Find inner peace with our guided meditation retreat. Includes mindfulness practices and relaxation techniques.', 'Wellness Center', 95.00, 20),
('Pilates Class', 'Strengthen your core and improve flexibility with our Pilates instructor. Equipment provided.', 'Fitness Studio', 35.00, 18),
('CrossFit Training', 'High-intensity functional fitness training. Suitable for all fitness levels with modifications.', 'CrossFit Gym', 50.00, 20),
('Swimming Lessons', 'Learn to swim or improve your technique with certified swimming instructors.', 'Community Pool', 40.00, 15),
('Yoga Retreat', 'Immerse yourself in yoga practice with experienced instructors. Multiple styles and levels available.', 'Yoga Retreat Center', 180.00, 12),
('Personal Training Session', 'One-on-one fitness training tailored to your goals. Includes fitness assessment and program design.', 'Fitness Center', 75.00, 8),
('Nutrition Workshop', 'Learn about healthy eating and meal planning. Includes recipe demonstrations and tasting.', 'Nutrition Center', 45.00, 20),
('Stress Management Class', 'Learn techniques to manage stress and improve mental well-being. Includes relaxation exercises.', 'Wellness Clinic', 60.00, 18),

-- Technology & Learning
('Coding Bootcamp', 'Learn web development from scratch. HTML, CSS, JavaScript, and modern frameworks covered.', 'Tech Academy', 299.00, 15),
('AI & Machine Learning', 'Introduction to artificial intelligence and machine learning concepts. Hands-on projects included.', 'Tech Institute', 250.00, 12),
('Digital Marketing Course', 'Master digital marketing strategies including SEO, social media, and content marketing.', 'Marketing School', 180.00, 20),
('3D Printing Workshop', 'Learn 3D modeling and printing techniques. Create your own 3D objects to take home.', 'Maker Space', 95.00, 16),
('Cybersecurity Basics', 'Learn essential cybersecurity practices to protect yourself online. Practical demonstrations included.', 'Security Academy', 120.00, 18),
('Data Analysis Course', 'Learn to analyze and visualize data using modern tools and techniques.', 'Data Institute', 200.00, 15),
('Mobile App Development', 'Build your own mobile app from concept to deployment. iOS and Android development covered.', 'App Academy', 350.00, 10),
('Blockchain Workshop', 'Understand blockchain technology and cryptocurrency basics. Hands-on blockchain development.', 'Blockchain Lab', 150.00, 12),

-- Entertainment & Fun
('Escape Room Challenge', 'Solve puzzles and escape from themed rooms. Multiple difficulty levels and themes available.', 'Escape Room Center', 35.00, 30),
('Karaoke Night', 'Sing your heart out in our private karaoke rooms. Professional sound system and song selection.', 'Karaoke Bar', 25.00, 40),
('Board Game Tournament', 'Compete in various board games with other players. Prizes for winners and fun for everyone.', 'Game Cafe', 20.00, 35),
('Comedy Workshop', 'Learn stand-up comedy techniques and perform in front of a supportive audience.', 'Comedy Club', 65.00, 18),
('Magic Show & Workshop', 'Watch amazing magic tricks and learn some simple magic yourself.', 'Magic Theater', 45.00, 25),
('Movie Night Out', 'Watch the latest blockbuster in our premium theater with snacks and drinks included.', 'Cinema Complex', 30.00, 50),
('Bowling Tournament', 'Compete in our bowling tournament with prizes and fun for all skill levels.', 'Bowling Alley', 40.00, 30),
('Arcade Gaming', 'Unlimited access to classic and modern arcade games. Perfect for gamers of all ages.', 'Arcade Center', 35.00, 40),

-- Business & Professional
('Public Speaking Workshop', 'Overcome stage fright and improve your public speaking skills. Practice in a supportive environment.', 'Business Center', 85.00, 20),
('Leadership Training', 'Develop essential leadership skills for the workplace. Interactive exercises and case studies.', 'Corporate Training Center', 150.00, 15),
('Time Management Seminar', 'Learn effective time management strategies to boost productivity and reduce stress.', 'Business Institute', 65.00, 25),
('Networking Event', 'Connect with professionals in your industry. Includes networking tips and structured activities.', 'Business Club', 45.00, 30),
('Resume Writing Workshop', 'Create a compelling resume that stands out to employers. Individual feedback provided.', 'Career Center', 55.00, 20),
('Interview Preparation', 'Master job interview techniques and practice with mock interviews. Build confidence and skills.', 'Career Institute', 75.00, 18),
('Business Plan Workshop', 'Learn to create a comprehensive business plan for your startup or business idea.', 'Entrepreneurship Center', 95.00, 15),
('Financial Planning Seminar', 'Learn personal finance management and investment strategies from financial experts.', 'Financial Center', 70.00, 22),

-- Sports & Athletics
('Tennis Lessons', 'Learn tennis fundamentals with certified instructors. All skill levels welcome.', 'Tennis Club', 60.00, 16),
('Golf Academy', 'Master your golf swing with professional golf coaches. Includes course access.', 'Golf Course', 120.00, 12),
('Basketball Training', 'Improve your basketball skills with drills and game practice.', 'Sports Complex', 45.00, 20),
('Soccer Clinic', 'Develop soccer techniques and team play skills.', 'Soccer Field', 50.00, 25),
('Volleyball Workshop', 'Learn volleyball fundamentals and advanced techniques.', 'Sports Center', 40.00, 18),
('Badminton Training', 'Master badminton skills with professional coaching.', 'Badminton Court', 35.00, 22),
('Table Tennis Tournament', 'Compete in friendly table tennis matches with prizes.', 'Recreation Center', 25.00, 30),
('Archery Class', 'Learn archery basics in a safe, controlled environment.', 'Archery Range', 75.00, 15),

-- Nature & Wildlife
('Bird Watching Tour', 'Discover local bird species with expert ornithologists.', 'Nature Reserve', 35.00, 25),
('Wildlife Photography', 'Capture stunning wildlife photos with professional photographers.', 'National Park', 95.00, 12),
('Nature Walk', 'Explore scenic trails and learn about local flora and fauna.', 'Botanical Garden', 20.00, 40),
('Butterfly Garden Visit', 'Experience the beauty of butterflies in their natural habitat.', 'Butterfly Garden', 25.00, 35),
('Stargazing Night', 'Observe celestial objects through telescopes with astronomers.', 'Observatory', 45.00, 20),
('Fossil Hunting', 'Search for fossils and learn about prehistoric life.', 'Fossil Site', 65.00, 18),
('Cave Exploration', 'Explore underground caves with experienced guides.', 'Cave System', 85.00, 15),
('Mountain Peak Climbing', 'Reach mountain summits with professional mountaineers.', 'Mountain Range', 200.00, 8),

-- Water Sports & Marine
('Scuba Diving Course', 'Learn scuba diving from certified instructors. Equipment provided.', 'Diving Center', 180.00, 10),
('Surfing Lessons', 'Master the waves with experienced surfing instructors.', 'Beach Resort', 95.00, 15),
('Sailing Adventure', 'Learn to sail on beautiful waters with expert sailors.', 'Marina', 150.00, 12),
('Jet Ski Experience', 'Experience the thrill of jet skiing on open waters.', 'Water Sports Center', 120.00, 14),
('Parasailing Adventure', 'Soar above the water with breathtaking views.', 'Beach Resort', 85.00, 20),
('Water Skiing', 'Learn water skiing techniques with professional instructors.', 'Lake Resort', 75.00, 16),
('Snorkeling Tour', 'Explore underwater marine life with guided snorkeling.', 'Coral Reef', 45.00, 25),
('Deep Sea Fishing', 'Experience deep sea fishing with experienced captains.', 'Fishing Charter', 200.00, 12),

-- Creative Arts & Crafts
('Origami Workshop', 'Learn the ancient art of paper folding with expert instructors.', 'Art Studio', 30.00, 25),
('Candle Making', 'Create beautiful handmade candles with various scents and colors.', 'Craft Studio', 55.00, 18),
('Soap Making Class', 'Learn to make natural, handmade soaps with essential oils.', 'Craft Center', 65.00, 16),
('Tie-Dye Workshop', 'Create unique tie-dye designs on clothing and fabric.', 'Art Studio', 40.00, 20),
('Mosaic Art', 'Create beautiful mosaic artwork with glass and ceramic tiles.', 'Art Gallery', 75.00, 15),
('Wood Carving', 'Learn traditional wood carving techniques with master carvers.', 'Woodworking Studio', 90.00, 12),
('Leather Crafting', 'Create leather goods like wallets and belts with expert guidance.', 'Craft Studio', 80.00, 14),
('Beadwork & Jewelry', 'Design and create unique beaded jewelry pieces.', 'Jewelry Studio', 45.00, 20),

-- Health & Wellness
('Reiki Healing Session', 'Experience energy healing and relaxation with certified practitioners.', 'Wellness Center', 80.00, 16),
('Aromatherapy Workshop', 'Learn about essential oils and their therapeutic benefits.', 'Wellness Clinic', 55.00, 20),
('Sound Healing', 'Experience healing through sound therapy and meditation.', 'Wellness Center', 70.00, 18),
('Crystal Healing', 'Learn about crystal properties and healing techniques.', 'Metaphysical Shop', 60.00, 15),
('Chakra Balancing', 'Balance your energy centers with guided meditation.', 'Wellness Studio', 75.00, 16),
('Breathwork Class', 'Master breathing techniques for stress relief and energy.', 'Wellness Center', 45.00, 22),
('Forest Bathing', 'Immerse yourself in nature for mental and physical healing.', 'Forest Reserve', 35.00, 25),
('Hot Stone Massage', 'Relax with therapeutic hot stone massage therapy.', 'Spa Center', 120.00, 10),

-- Adventure & Extreme Sports
('Skydiving Experience', 'Experience the ultimate thrill of freefall from 10,000 feet.', 'Skydiving Center', 250.00, 8),
('Bungee Jumping', 'Take the leap with professional bungee jumping instructors.', 'Adventure Park', 180.00, 12),
('Rock Climbing', 'Scale challenging rock faces with certified climbing guides.', 'Climbing Gym', 95.00, 15),
('Mountain Biking', 'Navigate challenging mountain trails with experienced riders.', 'Mountain Resort', 85.00, 18),
('White Water Rafting', 'Navigate thrilling rapids with professional rafting guides.', 'River Rapids', 150.00, 16),
('Paragliding', 'Soar through the skies with certified paragliding instructors.', 'Paragliding School', 200.00, 10),
('Cave Diving', 'Explore underwater caves with professional cave divers.', 'Diving Center', 300.00, 6),
('Ice Climbing', 'Climb frozen waterfalls with experienced ice climbing guides.', 'Ice Climbing Center', 180.00, 12),

-- Cricket & Team Sports
('Cricket Match', 'Join friendly cricket matches with players of all skill levels.', 'Cricket Ground', 30.00, 22),
('Cricket Coaching', 'Learn cricket techniques from professional coaches. Batting, bowling, and fielding.', 'Cricket Academy', 80.00, 15),
('Cricket Tournament', 'Compete in organized cricket tournaments with prizes and trophies.', 'Sports Complex', 50.00, 20),
('Cricket Practice Session', 'Improve your cricket skills with focused practice sessions.', 'Cricket Nets', 25.00, 25),
('Cricket Equipment Training', 'Learn to use cricket equipment properly and safely.', 'Cricket Center', 40.00, 18),

-- Dance & Movement
('Bollywood Dance Class', 'Learn energetic Bollywood dance moves with professional instructors.', 'Dance Studio', 45.00, 20),
('Hip Hop Dance', 'Master hip hop dance techniques and choreography.', 'Dance Academy', 50.00, 18),
('Salsa Dancing', 'Learn sensual salsa moves and partner dancing skills.', 'Dance Club', 55.00, 16),
('Contemporary Dance', 'Express yourself through modern contemporary dance.', 'Dance Studio', 60.00, 15),
('Ballet Class', 'Learn classical ballet techniques and graceful movements.', 'Ballet Academy', 70.00, 12),
('Street Dance', 'Master street dance styles including breaking and popping.', 'Dance Center', 45.00, 20),
('Zumba Fitness', 'High-energy dance fitness class combining Latin and international music.', 'Fitness Studio', 35.00, 25),
('Belly Dancing', 'Learn the art of belly dancing with traditional and modern styles.', 'Dance Studio', 50.00, 18),

-- Cycling & Outdoor Sports
('Cycling Tour', 'Explore scenic routes on guided cycling tours with varying difficulty levels.', 'Cycling Center', 65.00, 20),
('Mountain Biking Adventure', 'Navigate challenging mountain trails with experienced guides.', 'Mountain Resort', 85.00, 18),
('Road Cycling', 'Improve your road cycling skills and endurance.', 'Cycling Academy', 55.00, 22),
('BMX Training', 'Learn BMX tricks and techniques in a safe environment.', 'BMX Park', 45.00, 20),
('Cycling Race', 'Participate in organized cycling races and competitions.', 'Race Track', 75.00, 25),
('Family Cycling', 'Enjoy family-friendly cycling routes and activities.', 'Family Center', 40.00, 30),
('Electric Bike Tour', 'Explore the city on electric bikes with guided tours.', 'E-Bike Center', 80.00, 15),
('Cycling Maintenance', 'Learn to maintain and repair your bicycle properly.', 'Bike Shop', 35.00, 20),

-- Travel & Exploration
('City Walking Tour', 'Discover hidden gems and historical sites on guided walking tours.', 'City Center', 25.00, 35),
('Cultural Heritage Tour', 'Explore local culture, traditions, and historical landmarks.', 'Heritage Center', 45.00, 25),
('Food & Culture Tour', 'Experience local cuisine and cultural traditions in one tour.', 'Cultural Center', 55.00, 20),
('Photography Tour', 'Capture stunning photos while exploring beautiful locations.', 'Photo Studio', 70.00, 18),
('Adventure Travel', 'Embark on thrilling adventure travel experiences.', 'Adventure Center', 120.00, 15),
('Eco Tourism', 'Explore nature while learning about environmental conservation.', 'Eco Center', 65.00, 20),
('Historical Tour', 'Journey through time with expert historians and guides.', 'History Museum', 40.00, 25),
('Local Market Tour', 'Experience local markets and authentic shopping experiences.', 'Market Square', 30.00, 30),

-- Music & Performance
('Guitar Lessons', 'Learn to play guitar with personalized instruction for all levels.', 'Music School', 60.00, 20),
('Piano Classes', 'Master piano playing with classical and modern techniques.', 'Music Academy', 75.00, 15),
('Drum Lessons', 'Learn rhythm and drumming techniques from professional drummers.', 'Music Studio', 65.00, 18),
('Vocal Training', 'Improve your singing voice with professional vocal coaches.', 'Voice Studio', 70.00, 16),
('Music Production', 'Learn music production and recording techniques.', 'Recording Studio', 120.00, 12),
('Band Practice', 'Join band practice sessions and improve ensemble playing.', 'Music Center', 45.00, 20),
('Karaoke Night', 'Sing your heart out in our professional karaoke setup.', 'Karaoke Bar', 25.00, 40),
('Concert Experience', 'Attend live concerts and musical performances.', 'Concert Hall', 80.00, 25),

-- Language & Communication
('English Speaking Club', 'Improve your English speaking skills in a supportive environment.', 'Language Center', 35.00, 25),
('Spanish Language Class', 'Learn Spanish from native speakers with cultural insights.', 'Language School', 55.00, 20),
('French Conversation', 'Practice French conversation with native speakers.', 'French Institute', 60.00, 18),
('Public Speaking Workshop', 'Overcome stage fright and improve public speaking skills.', 'Communication Center', 85.00, 20),
('Debate Club', 'Join lively debates and improve critical thinking skills.', 'Debate Center', 40.00, 22),
('Storytelling Workshop', 'Learn the art of storytelling and narrative techniques.', 'Creative Center', 50.00, 20),
('Interview Skills', 'Master job interview techniques and build confidence.', 'Career Center', 75.00, 18),
('Presentation Skills', 'Learn to create and deliver compelling presentations.', 'Business Center', 65.00, 20),

-- Home & Lifestyle
('Interior Design Workshop', 'Learn interior design principles and create beautiful spaces.', 'Design Studio', 90.00, 15),
('Gardening Class', 'Learn gardening techniques and plant care from experts.', 'Garden Center', 45.00, 25),
('Cooking at Home', 'Master home cooking techniques and recipe creation.', 'Culinary Studio', 70.00, 18),
('Home Organization', 'Learn to organize and declutter your living spaces.', 'Lifestyle Center', 55.00, 20),
('DIY Home Projects', 'Create beautiful home decor and furniture with DIY techniques.', 'Craft Studio', 65.00, 18),
('Pet Care Workshop', 'Learn proper pet care, training, and health maintenance.', 'Pet Center', 40.00, 22),
('Sustainable Living', 'Learn eco-friendly living practices and sustainability tips.', 'Eco Center', 50.00, 20),
('Home Security', 'Learn home security measures and safety protocols.', 'Security Center', 60.00, 18);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for better security
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for activities (public read access)
CREATE POLICY "Activities are viewable by everyone" ON activities
    FOR SELECT USING (true);

-- Create RLS policies for bookings (users can only see their own bookings)
CREATE POLICY "Users can view their own bookings" ON bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);
