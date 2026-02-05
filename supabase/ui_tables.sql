-- Create tables for UI content persistence

-- 1. Programs
CREATE TABLE IF NOT EXISTS content_programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Trainers
CREATE TABLE IF NOT EXISTS content_trainers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    experience TEXT NOT NULL,
    rating NUMERIC DEFAULT 5.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Pricing Plans
CREATE TABLE IF NOT EXISTS content_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    period TEXT DEFAULT '/month',
    features JSONB DEFAULT '[]'::jsonb,
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Testimonials
CREATE TABLE IF NOT EXISTS content_testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    text TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies (Allow access for demo purposes)
-- Note: In production, you'd want strictly authenticated insert/update/delete.
-- For this migration demo, we'll allow public (anon) access to "get it working" for the user.

ALTER TABLE content_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_testimonials ENABLE ROW LEVEL SECURITY;

-- Programs Policies
CREATE POLICY "Allow public read programs" ON content_programs FOR SELECT USING (true);
CREATE POLICY "Allow public insert programs" ON content_programs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update programs" ON content_programs FOR UPDATE USING (true);
CREATE POLICY "Allow public delete programs" ON content_programs FOR DELETE USING (true);

-- Trainers Policies
CREATE POLICY "Allow public read trainers" ON content_trainers FOR SELECT USING (true);
CREATE POLICY "Allow public insert trainers" ON content_trainers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update trainers" ON content_trainers FOR UPDATE USING (true);
CREATE POLICY "Allow public delete trainers" ON content_trainers FOR DELETE USING (true);

-- Plans Policies
CREATE POLICY "Allow public read plans" ON content_plans FOR SELECT USING (true);
CREATE POLICY "Allow public insert plans" ON content_plans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update plans" ON content_plans FOR UPDATE USING (true);
CREATE POLICY "Allow public delete plans" ON content_plans FOR DELETE USING (true);

-- Testimonials Policies
CREATE POLICY "Allow public read testimonials" ON content_testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public insert testimonials" ON content_testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update testimonials" ON content_testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow public delete testimonials" ON content_testimonials FOR DELETE USING (true);


-- SEED INITIAL DATA (Optional, so the page isn't empty)
-- We insert the defaults from the current page.tsx

INSERT INTO content_programs (title, description, icon) VALUES 
('Muscle Gain', 'Build lean muscle mass with our strength training programs designed for maximum hypertrophy.', 'Dumbbell'),
('Weight Loss', 'Burn fat and transform your body with our high-intensity cardio and metabolic conditioning.', 'TrendingUp'),
('Cardio Training', 'Improve cardiovascular endurance and stamina through structured aerobic exercise programs.', 'Heart'),
('Yoga & Flexibility', 'Enhance mobility, balance, and mental wellness with our yoga and stretching classes.', 'Target');

INSERT INTO content_trainers (name, specialization, experience, rating) VALUES 
('Marcus Steel', 'Strength & Conditioning', '10+ Years', 4.9),
('Sarah Phoenix', 'CrossFit & HIIT', '8+ Years', 4.8),
('David Iron', 'Bodybuilding Coach', '12+ Years', 5.0),
('Emma Flex', 'Yoga & Pilates', '7+ Years', 4.9);

INSERT INTO content_plans (name, price, period, features, popular) VALUES 
('Basic', '$29', '/month', '["Gym Access", "Locker Room", "Free WiFi", "Basic Equipment"]'::jsonb, false),
('Standard', '$59', '/month', '["All Basic Features", "Group Classes", "Nutrition Guide", "Shower Facilities", "Free Parking"]'::jsonb, true),
('Premium', '$99', '/month', '["All Standard Features", "Personal Training", "Meal Planning", "Sauna & Steam Room", "24/7 Access", "Guest Passes"]'::jsonb, false);

INSERT INTO content_testimonials (name, text, rating) VALUES 
('John Martinez', 'Alpha Gym transformed my life! Lost 30 pounds in 4 months and gained incredible strength.', 5),
('Lisa Chen', 'The trainers are phenomenal and the community is so supportive. Best gym experience ever!', 5),
('Mike Anderson', 'State-of-the-art equipment and amazing facilities. Worth every penny of the membership.', 5);
