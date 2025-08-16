-- Add More Activities to Activity Booking API
-- Run this script in Supabase SQL Editor to add new activities

-- Sports & Athletics
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('Tennis Lessons', 'Learn tennis fundamentals with certified instructors. All skill levels welcome.', 'Tennis Club', 60.00, 16),
('Golf Academy', 'Master your golf swing with professional golf coaches. Includes course access.', 'Golf Course', 120.00, 12),
('Basketball Training', 'Improve your basketball skills with drills and game practice.', 'Sports Complex', 45.00, 20),
('Soccer Clinic', 'Develop soccer techniques and team play skills.', 'Soccer Field', 50.00, 25),
('Volleyball Workshop', 'Learn volleyball fundamentals and advanced techniques.', 'Sports Center', 40.00, 18),
('Badminton Training', 'Master badminton skills with professional coaching.', 'Badminton Court', 35.00, 22),
('Table Tennis Tournament', 'Compete in friendly table tennis matches with prizes.', 'Recreation Center', 25.00, 30),
('Archery Class', 'Learn archery basics in a safe, controlled environment.', 'Archery Range', 75.00, 15);

-- Nature & Wildlife
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('Bird Watching Tour', 'Discover local bird species with expert ornithologists.', 'Nature Reserve', 35.00, 25),
('Wildlife Photography', 'Capture stunning wildlife photos with professional photographers.', 'National Park', 95.00, 12),
('Nature Walk', 'Explore scenic trails and learn about local flora and fauna.', 'Botanical Garden', 20.00, 40),
('Butterfly Garden Visit', 'Experience the beauty of butterflies in their natural habitat.', 'Butterfly Garden', 25.00, 35),
('Stargazing Night', 'Observe celestial objects through telescopes with astronomers.', 'Observatory', 45.00, 20),
('Fossil Hunting', 'Search for fossils and learn about prehistoric life.', 'Fossil Site', 65.00, 18),
('Cave Exploration', 'Explore underground caves with experienced guides.', 'Cave System', 85.00, 15),
('Mountain Peak Climbing', 'Reach mountain summits with professional mountaineers.', 'Mountain Range', 200.00, 8);

-- Water Sports & Marine
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('Scuba Diving Course', 'Learn scuba diving from certified instructors. Equipment provided.', 'Diving Center', 180.00, 10),
('Surfing Lessons', 'Master the waves with experienced surfing instructors.', 'Beach Resort', 95.00, 15),
('Sailing Adventure', 'Learn to sail on beautiful waters with expert sailors.', 'Marina', 150.00, 12),
('Jet Ski Experience', 'Experience the thrill of jet skiing on open waters.', 'Water Sports Center', 120.00, 14),
('Parasailing Adventure', 'Soar above the water with breathtaking views.', 'Beach Resort', 85.00, 20),
('Water Skiing', 'Learn water skiing techniques with professional instructors.', 'Lake Resort', 75.00, 16),
('Snorkeling Tour', 'Explore underwater marine life with guided snorkeling.', 'Coral Reef', 45.00, 25),
('Deep Sea Fishing', 'Experience deep sea fishing with experienced captains.', 'Fishing Charter', 200.00, 12);

-- Creative Arts & Crafts
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('Origami Workshop', 'Learn the ancient art of paper folding with expert instructors.', 'Art Studio', 30.00, 25),
('Candle Making', 'Create beautiful handmade candles with various scents and colors.', 'Craft Studio', 55.00, 18),
('Soap Making Class', 'Learn to make natural, handmade soaps with essential oils.', 'Craft Center', 65.00, 16),
('Tie-Dye Workshop', 'Create unique tie-dye designs on clothing and fabric.', 'Art Studio', 40.00, 20),
('Mosaic Art', 'Create beautiful mosaic artwork with glass and ceramic tiles.', 'Art Gallery', 75.00, 15),
('Wood Carving', 'Learn traditional wood carving techniques with master carvers.', 'Woodworking Studio', 90.00, 12),
('Leather Crafting', 'Create leather goods like wallets and belts with expert guidance.', 'Craft Studio', 80.00, 14),
('Beadwork & Jewelry', 'Design and create unique beaded jewelry pieces.', 'Jewelry Studio', 45.00, 20);

-- Health & Wellness
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('Reiki Healing Session', 'Experience energy healing and relaxation with certified practitioners.', 'Wellness Center', 80.00, 16),
('Aromatherapy Workshop', 'Learn about essential oils and their therapeutic benefits.', 'Wellness Clinic', 55.00, 20),
('Sound Healing', 'Experience healing through sound therapy and meditation.', 'Wellness Center', 70.00, 18),
('Crystal Healing', 'Learn about crystal properties and healing techniques.', 'Metaphysical Shop', 60.00, 15),
('Chakra Balancing', 'Balance your energy centers with guided meditation.', 'Wellness Studio', 75.00, 16),
('Breathwork Class', 'Master breathing techniques for stress relief and energy.', 'Wellness Center', 45.00, 22),
('Forest Bathing', 'Immerse yourself in nature for mental and physical healing.', 'Forest Reserve', 35.00, 25),
('Hot Stone Massage', 'Relax with therapeutic hot stone massage therapy.', 'Spa Center', 120.00, 10);

-- Adventure & Extreme Sports
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('Skydiving Experience', 'Experience the ultimate thrill of freefall from 10,000 feet.', 'Skydiving Center', 250.00, 8),
('Bungee Jumping', 'Take the leap with professional bungee jumping instructors.', 'Adventure Park', 180.00, 12),
('Rock Climbing', 'Scale challenging rock faces with certified climbing guides.', 'Climbing Gym', 95.00, 15),
('Mountain Biking', 'Navigate challenging mountain trails with experienced riders.', 'Mountain Resort', 85.00, 18),
('White Water Rafting', 'Navigate thrilling rapids with professional rafting guides.', 'River Rapids', 150.00, 16),
('Paragliding', 'Soar through the skies with certified paragliding instructors.', 'Paragliding School', 200.00, 10),
('Cave Diving', 'Explore underwater caves with professional cave divers.', 'Diving Center', 300.00, 6),
('Ice Climbing', 'Climb frozen waterfalls with experienced ice climbing guides.', 'Ice Climbing Center', 180.00, 12);

-- Cricket & Team Sports
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('Cricket Match', 'Join friendly cricket matches with players of all skill levels.', 'Cricket Ground', 30.00, 22),
('Cricket Coaching', 'Learn cricket techniques from professional coaches. Batting, bowling, and fielding.', 'Cricket Academy', 80.00, 15),
('Cricket Tournament', 'Compete in organized cricket tournaments with prizes and trophies.', 'Sports Complex', 50.00, 20),
('Cricket Practice Session', 'Improve your cricket skills with focused practice sessions.', 'Cricket Nets', 25.00, 25),
('Cricket Equipment Training', 'Learn to use cricket equipment properly and safely.', 'Cricket Center', 40.00, 18);

-- Dance & Movement
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('Bollywood Dance Class', 'Learn energetic Bollywood dance moves with professional instructors.', 'Dance Studio', 45.00, 20),
('Hip Hop Dance', 'Master hip hop dance techniques and choreography.', 'Dance Academy', 50.00, 18),
('Salsa Dancing', 'Learn sensual salsa moves and partner dancing skills.', 'Dance Club', 55.00, 16),
('Contemporary Dance', 'Express yourself through modern contemporary dance.', 'Dance Studio', 60.00, 15),
('Ballet Class', 'Learn classical ballet techniques and graceful movements.', 'Ballet Academy', 70.00, 12),
('Street Dance', 'Master street dance styles including breaking and popping.', 'Dance Center', 45.00, 20),
('Zumba Fitness', 'High-energy dance fitness class combining Latin and international music.', 'Fitness Studio', 35.00, 25),
('Belly Dancing', 'Learn the art of belly dancing with traditional and modern styles.', 'Dance Studio', 50.00, 18);

-- Cycling & Outdoor Sports
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('Cycling Tour', 'Explore scenic routes on guided cycling tours with varying difficulty levels.', 'Cycling Center', 65.00, 20),
('Mountain Biking Adventure', 'Navigate challenging mountain trails with experienced guides.', 'Mountain Resort', 85.00, 18),
('Road Cycling', 'Improve your road cycling skills and endurance.', 'Cycling Academy', 55.00, 22),
('BMX Training', 'Learn BMX tricks and techniques in a safe environment.', 'BMX Park', 45.00, 20),
('Cycling Race', 'Participate in organized cycling races and competitions.', 'Race Track', 75.00, 25),
('Family Cycling', 'Enjoy family-friendly cycling routes and activities.', 'Family Center', 40.00, 30),
('Electric Bike Tour', 'Explore the city on electric bikes with guided tours.', 'E-Bike Center', 80.00, 15),
('Cycling Maintenance', 'Learn to maintain and repair your bicycle properly.', 'Bike Shop', 35.00, 20);

-- Travel & Exploration
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('City Walking Tour', 'Discover hidden gems and historical sites on guided walking tours.', 'City Center', 25.00, 35),
('Cultural Heritage Tour', 'Explore local culture, traditions, and historical landmarks.', 'Heritage Center', 45.00, 25),
('Food & Culture Tour', 'Experience local cuisine and cultural traditions in one tour.', 'Cultural Center', 55.00, 20),
('Photography Tour', 'Capture stunning photos while exploring beautiful locations.', 'Photo Studio', 70.00, 18),
('Adventure Travel', 'Embark on thrilling adventure travel experiences.', 'Adventure Center', 120.00, 15),
('Eco Tourism', 'Explore nature while learning about environmental conservation.', 'Eco Center', 65.00, 20),
('Historical Tour', 'Journey through time with expert historians and guides.', 'History Museum', 40.00, 25),
('Local Market Tour', 'Experience local markets and authentic shopping experiences.', 'Market Square', 30.00, 30);

-- Music & Performance
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('Guitar Lessons', 'Learn to play guitar with personalized instruction for all levels.', 'Music School', 60.00, 20),
('Piano Classes', 'Master piano playing with classical and modern techniques.', 'Music Academy', 75.00, 15),
('Drum Lessons', 'Learn rhythm and drumming techniques from professional drummers.', 'Music Studio', 65.00, 18),
('Vocal Training', 'Improve your singing voice with professional vocal coaches.', 'Voice Studio', 70.00, 16),
('Music Production', 'Learn music production and recording techniques.', 'Recording Studio', 120.00, 12),
('Band Practice', 'Join band practice sessions and improve ensemble playing.', 'Music Center', 45.00, 20),
('Karaoke Night', 'Sing your heart out in our professional karaoke setup.', 'Karaoke Bar', 25.00, 40),
('Concert Experience', 'Attend live concerts and musical performances.', 'Concert Hall', 80.00, 25);

-- Language & Communication
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('English Speaking Club', 'Improve your English speaking skills in a supportive environment.', 'Language Center', 35.00, 25),
('Spanish Language Class', 'Learn Spanish from native speakers with cultural insights.', 'Language School', 55.00, 20),
('French Conversation', 'Practice French conversation with native speakers.', 'French Institute', 60.00, 18),
('Public Speaking Workshop', 'Overcome stage fright and improve public speaking skills.', 'Communication Center', 85.00, 20),
('Debate Club', 'Join lively debates and improve critical thinking skills.', 'Debate Center', 40.00, 22),
('Storytelling Workshop', 'Learn the art of storytelling and narrative techniques.', 'Creative Center', 50.00, 20),
('Interview Skills', 'Master job interview techniques and build confidence.', 'Career Center', 75.00, 18),
('Presentation Skills', 'Learn to create and deliver compelling presentations.', 'Business Center', 65.00, 20);

-- Home & Lifestyle
INSERT INTO activities (title, description, location, price, available_slots) VALUES
('Interior Design Workshop', 'Learn interior design principles and create beautiful spaces.', 'Design Studio', 90.00, 15),
('Gardening Class', 'Learn gardening techniques and plant care from experts.', 'Garden Center', 45.00, 25),
('Cooking at Home', 'Master home cooking techniques and recipe creation.', 'Culinary Studio', 70.00, 18),
('Home Organization', 'Learn to organize and declutter your living spaces.', 'Lifestyle Center', 55.00, 20),
('DIY Home Projects', 'Create beautiful home decor and furniture with DIY techniques.', 'Craft Studio', 65.00, 18),
('Pet Care Workshop', 'Learn proper pet care, training, and health maintenance.', 'Pet Center', 40.00, 22),
('Sustainable Living', 'Learn eco-friendly living practices and sustainability tips.', 'Eco Center', 50.00, 20),
('Home Security', 'Learn home security measures and safety protocols.', 'Security Center', 60.00, 18);

-- Verify the new activities were added
SELECT COUNT(*) as total_activities FROM activities;
SELECT title, price, available_slots FROM activities ORDER BY created_at DESC LIMIT 10;
