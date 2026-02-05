-- Seed Data for Alpha Gym

-- GYM INFO
INSERT INTO gym_info (category, key, value) VALUES ('hours', 'weekday', '"Monday - Friday: 5am - 11pm"'::jsonb);
INSERT INTO gym_info (category, key, value) VALUES ('hours', 'weekend', '"Saturday - Sunday: 7am - 9pm"'::jsonb);
INSERT INTO gym_info (category, key, value) VALUES ('hours', 'premium', '"24/7 for Premium Members"'::jsonb);
INSERT INTO gym_info (category, key, value) VALUES ('pricing', 'basic', '{"name":"Basic","price":"$29/month","features":["Gym Access","Locker Room","Free WiFi","Basic Equipment"]}'::jsonb);
INSERT INTO gym_info (category, key, value) VALUES ('pricing', 'standard', '{"name":"Standard","price":"$59/month","features":["All Basic Features","Group Classes","Nutrition Guide","Shower Facilities","Free Parking"]}'::jsonb);
INSERT INTO gym_info (category, key, value) VALUES ('pricing', 'premium', '{"name":"Premium","price":"$99/month","features":["All Standard Features","Personal Training","Meal Planning","Sauna & Steam Room","24/7 Access","Guest Passes"]}'::jsonb);
INSERT INTO gym_info (category, key, value) VALUES ('contact', 'phone', '"+1 (555) 123-4567"'::jsonb);
INSERT INTO gym_info (category, key, value) VALUES ('contact', 'email', '"info@alphagym.com"'::jsonb);
INSERT INTO gym_info (category, key, value) VALUES ('contact', 'address', '"123 Fitness Street, New York, NY 10001"'::jsonb);
INSERT INTO gym_info (category, key, value) VALUES ('programs', 'list', '["Muscle Gain","Weight Loss","Cardio Training","Yoga & Flexibility"]'::jsonb);
INSERT INTO gym_info (category, key, value) VALUES ('trainers', 'list', '["Marcus Steel - Strength & Conditioning","Sarah Phoenix - CrossFit & HIIT","David Iron - Bodybuilding","Emma Flex - Yoga & Pilates"]'::jsonb);

-- EXERCISES
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Bench Press', 'chest', 4, '8-12', 'Barbell');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Incline Dumbbell Press', 'chest', 3, '10-12', 'Dumbbells');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Cable Flyes', 'chest', 3, '12-15', 'Cable Machine');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Push-Ups', 'chest', 3, '15-20', 'None');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Dips', 'chest', 3, '10-12', 'Dip Station');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Deadlifts', 'back', 4, '6-8', 'Barbell');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Pull-Ups', 'back', 4, '8-12', 'Pull-up Bar');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Bent Over Rows', 'back', 4, '8-10', 'Barbell');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Lat Pulldowns', 'back', 3, '10-12', 'Cable Machine');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Seated Cable Rows', 'back', 3, '10-12', 'Cable Machine');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Overhead Press', 'shoulders', 4, '8-10', 'Barbell');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Lateral Raises', 'shoulders', 3, '12-15', 'Dumbbells');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Front Raises', 'shoulders', 3, '12-15', 'Dumbbells');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Reverse Flyes', 'shoulders', 3, '12-15', 'Dumbbells');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Arnold Press', 'shoulders', 3, '10-12', 'Dumbbells');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Squats', 'legs', 4, '8-12', 'Barbell');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Leg Press', 'legs', 4, '10-12', 'Leg Press Machine');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Romanian Deadlifts', 'legs', 3, '10-12', 'Barbell');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Leg Curls', 'legs', 3, '12-15', 'Machine');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Calf Raises', 'legs', 4, '15-20', 'Machine');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Barbell Curls', 'arms', 3, '10-12', 'Barbell');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Tricep Pushdowns', 'arms', 3, '12-15', 'Cable Machine');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Hammer Curls', 'arms', 3, '10-12', 'Dumbbells');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Skull Crushers', 'arms', 3, '10-12', 'EZ Bar');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Concentration Curls', 'arms', 3, '12-15', 'Dumbbells');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Planks', 'core', 3, '60 sec', 'None');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Hanging Leg Raises', 'core', 3, '12-15', 'Pull-up Bar');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Cable Crunches', 'core', 3, '15-20', 'Cable Machine');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Russian Twists', 'core', 3, '20 each side', 'Medicine Ball');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Ab Wheel Rollouts', 'core', 3, '10-12', 'Ab Wheel');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Treadmill Running', 'cardio', 3, '20-30 min', 'Moderate');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Cycling', 'cardio', 3, '25-35 min', 'Moderate-High');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Rowing', 'cardio', 3, '15-20 min', 'High');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Jump Rope', 'cardio', 3, '10-15 min', 'High');
INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('Stair Climber', 'cardio', 3, '15-20 min', 'Moderate-High');

-- MEALS
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Protein Oatmeal', 'breakfast', 450, 30, 55, 12, '["Oats","Whey protein","Banana","Almond butter"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Egg White Omelette', 'breakfast', 320, 35, 10, 15, '["6 egg whites","Spinach","Tomatoes","Feta cheese"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Greek Yogurt Bowl', 'breakfast', 380, 25, 45, 10, '["Greek yogurt","Berries","Granola","Honey"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Avocado Toast with Eggs', 'breakfast', 420, 20, 35, 25, '["Whole grain bread","Avocado","2 eggs","Cherry tomatoes"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Protein Smoothie', 'breakfast', 350, 35, 40, 8, '["Whey protein","Banana","Oat milk","Peanut butter"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Grilled Chicken Salad', 'lunch', 480, 45, 25, 22, '["Chicken breast","Mixed greens","Avocado","Olive oil dressing"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Quinoa Power Bowl', 'lunch', 520, 28, 60, 18, '["Quinoa","Chickpeas","Roasted vegetables","Tahini"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Turkey Wrap', 'lunch', 450, 35, 40, 18, '["Whole wheat wrap","Turkey","Hummus","Vegetables"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Salmon with Rice', 'lunch', 550, 40, 45, 22, '["Salmon fillet","Brown rice","Steamed broccoli","Lemon"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Lean Beef Stir-Fry', 'lunch', 480, 38, 35, 20, '["Lean beef strips","Mixed vegetables","Brown rice","Soy sauce"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Baked Chicken with Vegetables', 'dinner', 520, 48, 30, 22, '["Chicken thigh","Sweet potato","Brussels sprouts","Olive oil"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Grilled Steak with Salad', 'dinner', 580, 52, 15, 35, '["Sirloin steak","Mixed greens","Cherry tomatoes","Balsamic"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Fish Tacos', 'dinner', 450, 35, 40, 18, '["White fish","Corn tortillas","Cabbage slaw","Lime crema"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Pasta with Turkey Meatballs', 'dinner', 620, 42, 65, 20, '["Whole wheat pasta","Turkey meatballs","Marinara sauce","Parmesan"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Grilled Salmon Bowl', 'dinner', 540, 45, 40, 25, '["Salmon","Quinoa","Edamame","Avocado","Ginger dressing"]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Protein Bar', 'snacks', 200, 20, 22, 8, '[]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Mixed Nuts', 'snacks', 180, 6, 8, 16, '[]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Apple with Almond Butter', 'snacks', 220, 5, 28, 12, '[]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Cottage Cheese with Berries', 'snacks', 180, 20, 15, 5, '[]'::jsonb);
INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('Hard Boiled Eggs (2)', 'snacks', 140, 12, 1, 10, '[]'::jsonb);
