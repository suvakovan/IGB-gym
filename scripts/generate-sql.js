
const fs = require('fs');
const path = require('path');

// Embedded Static Data
const gymKnowledge = {
    hours: {
        weekday: "Monday - Friday: 5am - 11pm",
        weekend: "Saturday - Sunday: 7am - 9pm",
        premium: "24/7 for Premium Members"
    },
    pricing: {
        basic: { name: "Basic", price: "$29/month", features: ["Gym Access", "Locker Room", "Free WiFi", "Basic Equipment"] },
        standard: { name: "Standard", price: "$59/month", features: ["All Basic Features", "Group Classes", "Nutrition Guide", "Shower Facilities", "Free Parking"] },
        premium: { name: "Premium", price: "$99/month", features: ["All Standard Features", "Personal Training", "Meal Planning", "Sauna & Steam Room", "24/7 Access", "Guest Passes"] }
    },
    contact: {
        phone: "+1 (555) 123-4567",
        email: "info@alphagym.com",
        address: "123 Fitness Street, New York, NY 10001"
    },
    programs: ["Muscle Gain", "Weight Loss", "Cardio Training", "Yoga & Flexibility"],
    trainers: ["Marcus Steel - Strength & Conditioning", "Sarah Phoenix - CrossFit & HIIT", "David Iron - Bodybuilding", "Emma Flex - Yoga & Pilates"]
};

const exerciseDatabase = {
    chest: [
        { name: "Bench Press", sets: 4, reps: "8-12", equipment: "Barbell" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", equipment: "Dumbbells" },
        { name: "Cable Flyes", sets: 3, reps: "12-15", equipment: "Cable Machine" },
        { name: "Push-Ups", sets: 3, reps: "15-20", equipment: "None" },
        { name: "Dips", sets: 3, reps: "10-12", equipment: "Dip Station" }
    ],
    back: [
        { name: "Deadlifts", sets: 4, reps: "6-8", equipment: "Barbell" },
        { name: "Pull-Ups", sets: 4, reps: "8-12", equipment: "Pull-up Bar" },
        { name: "Bent Over Rows", sets: 4, reps: "8-10", equipment: "Barbell" },
        { name: "Lat Pulldowns", sets: 3, reps: "10-12", equipment: "Cable Machine" },
        { name: "Seated Cable Rows", sets: 3, reps: "10-12", equipment: "Cable Machine" }
    ],
    shoulders: [
        { name: "Overhead Press", sets: 4, reps: "8-10", equipment: "Barbell" },
        { name: "Lateral Raises", sets: 3, reps: "12-15", equipment: "Dumbbells" },
        { name: "Front Raises", sets: 3, reps: "12-15", equipment: "Dumbbells" },
        { name: "Reverse Flyes", sets: 3, reps: "12-15", equipment: "Dumbbells" },
        { name: "Arnold Press", sets: 3, reps: "10-12", equipment: "Dumbbells" }
    ],
    legs: [
        { name: "Squats", sets: 4, reps: "8-12", equipment: "Barbell" },
        { name: "Leg Press", sets: 4, reps: "10-12", equipment: "Leg Press Machine" },
        { name: "Romanian Deadlifts", sets: 3, reps: "10-12", equipment: "Barbell" },
        { name: "Leg Curls", sets: 3, reps: "12-15", equipment: "Machine" },
        { name: "Calf Raises", sets: 4, reps: "15-20", equipment: "Machine" }
    ],
    arms: [
        { name: "Barbell Curls", sets: 3, reps: "10-12", equipment: "Barbell" },
        { name: "Tricep Pushdowns", sets: 3, reps: "12-15", equipment: "Cable Machine" },
        { name: "Hammer Curls", sets: 3, reps: "10-12", equipment: "Dumbbells" },
        { name: "Skull Crushers", sets: 3, reps: "10-12", equipment: "EZ Bar" },
        { name: "Concentration Curls", sets: 3, reps: "12-15", equipment: "Dumbbells" }
    ],
    core: [
        { name: "Planks", sets: 3, reps: "60 sec", equipment: "None" },
        { name: "Hanging Leg Raises", sets: 3, reps: "12-15", equipment: "Pull-up Bar" },
        { name: "Cable Crunches", sets: 3, reps: "15-20", equipment: "Cable Machine" },
        { name: "Russian Twists", sets: 3, reps: "20 each side", equipment: "Medicine Ball" },
        { name: "Ab Wheel Rollouts", sets: 3, reps: "10-12", equipment: "Ab Wheel" }
    ],
    cardio: [
        { name: "Treadmill Running", duration: "20-30 min", intensity: "Moderate" },
        { name: "Cycling", duration: "25-35 min", intensity: "Moderate-High" },
        { name: "Rowing", duration: "15-20 min", intensity: "High" },
        { name: "Jump Rope", duration: "10-15 min", intensity: "High" },
        { name: "Stair Climber", duration: "15-20 min", intensity: "Moderate-High" }
    ]
};

const mealDatabase = {
    breakfast: [
        { name: "Protein Oatmeal", calories: 450, protein: 30, carbs: 55, fat: 12, ingredients: ["Oats", "Whey protein", "Banana", "Almond butter"] },
        { name: "Egg White Omelette", calories: 320, protein: 35, carbs: 10, fat: 15, ingredients: ["6 egg whites", "Spinach", "Tomatoes", "Feta cheese"] },
        { name: "Greek Yogurt Bowl", calories: 380, protein: 25, carbs: 45, fat: 10, ingredients: ["Greek yogurt", "Berries", "Granola", "Honey"] },
        { name: "Avocado Toast with Eggs", calories: 420, protein: 20, carbs: 35, fat: 25, ingredients: ["Whole grain bread", "Avocado", "2 eggs", "Cherry tomatoes"] },
        { name: "Protein Smoothie", calories: 350, protein: 35, carbs: 40, fat: 8, ingredients: ["Whey protein", "Banana", "Oat milk", "Peanut butter"] }
    ],
    lunch: [
        { name: "Grilled Chicken Salad", calories: 480, protein: 45, carbs: 25, fat: 22, ingredients: ["Chicken breast", "Mixed greens", "Avocado", "Olive oil dressing"] },
        { name: "Quinoa Power Bowl", calories: 520, protein: 28, carbs: 60, fat: 18, ingredients: ["Quinoa", "Chickpeas", "Roasted vegetables", "Tahini"] },
        { name: "Turkey Wrap", calories: 450, protein: 35, carbs: 40, fat: 18, ingredients: ["Whole wheat wrap", "Turkey", "Hummus", "Vegetables"] },
        { name: "Salmon with Rice", calories: 550, protein: 40, carbs: 45, fat: 22, ingredients: ["Salmon fillet", "Brown rice", "Steamed broccoli", "Lemon"] },
        { name: "Lean Beef Stir-Fry", calories: 480, protein: 38, carbs: 35, fat: 20, ingredients: ["Lean beef strips", "Mixed vegetables", "Brown rice", "Soy sauce"] }
    ],
    dinner: [
        { name: "Baked Chicken with Vegetables", calories: 520, protein: 48, carbs: 30, fat: 22, ingredients: ["Chicken thigh", "Sweet potato", "Brussels sprouts", "Olive oil"] },
        { name: "Grilled Steak with Salad", calories: 580, protein: 52, carbs: 15, fat: 35, ingredients: ["Sirloin steak", "Mixed greens", "Cherry tomatoes", "Balsamic"] },
        { name: "Fish Tacos", calories: 450, protein: 35, carbs: 40, fat: 18, ingredients: ["White fish", "Corn tortillas", "Cabbage slaw", "Lime crema"] },
        { name: "Pasta with Turkey Meatballs", calories: 620, protein: 42, carbs: 65, fat: 20, ingredients: ["Whole wheat pasta", "Turkey meatballs", "Marinara sauce", "Parmesan"] },
        { name: "Grilled Salmon Bowl", calories: 540, protein: 45, carbs: 40, fat: 25, ingredients: ["Salmon", "Quinoa", "Edamame", "Avocado", "Ginger dressing"] }
    ],
    snacks: [
        { name: "Protein Bar", calories: 200, protein: 20, carbs: 22, fat: 8 },
        { name: "Mixed Nuts", calories: 180, protein: 6, carbs: 8, fat: 16 },
        { name: "Apple with Almond Butter", calories: 220, protein: 5, carbs: 28, fat: 12 },
        { name: "Cottage Cheese with Berries", calories: 180, protein: 20, carbs: 15, fat: 5 },
        { name: "Hard Boiled Eggs (2)", calories: 140, protein: 12, carbs: 1, fat: 10 }
    ]
};


const outputFile = path.join(process.cwd(), 'supabase', 'seed_data.sql');

let sql = `-- Seed Data for Alpha Gym
-- Generated from scripts/generate-sql.js

`;

// 1. Gym Info
sql += `-- GYM INFO\n`;
const addGymInfo = (category, key, value) => {
    // Escape single quotes in JSON or string
    const jsonValue = JSON.stringify(value).replace(/'/g, "''");
    sql += `INSERT INTO gym_info (category, key, value) VALUES ('${category}', '${key}', '${jsonValue}'::jsonb);\n`;
};

// Hours
Object.entries(gymKnowledge.hours).forEach(([key, value]) => addGymInfo('hours', key, value));

// Pricing
Object.entries(gymKnowledge.pricing).forEach(([key, value]) => addGymInfo('pricing', key, value));

// Contact
Object.entries(gymKnowledge.contact).forEach(([key, value]) => addGymInfo('contact', key, value));

// Programs (stored as a single array value)
addGymInfo('programs', 'list', gymKnowledge.programs);

// Trainers (stored as a single array value)
addGymInfo('trainers', 'list', gymKnowledge.trainers);


// 2. Exercises
sql += `\n-- EXERCISES\n`;
Object.entries(exerciseDatabase).forEach(([muscleGroup, exercises]) => {
    exercises.forEach((ex) => {
        const name = ex.name.replace(/'/g, "''");
        const sets = ex.sets || 3;
        const reps = ex.reps || "10-12";
        const equipment = ex.equipment.replace(/'/g, "''");

        sql += `INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('${name}', '${muscleGroup}', ${sets}, '${reps}', '${equipment}');\n`;
    });
});


// 3. Meals
sql += `\n-- MEALS\n`;
Object.entries(mealDatabase).forEach(([mealType, meals]) => {
    meals.forEach((meal) => {
        const name = meal.name.replace(/'/g, "''");
        const calories = meal.calories;
        const protein = meal.protein;
        const carbs = meal.carbs;
        const fat = meal.fat;
        const ingredients = JSON.stringify(meal.ingredients || []).replace(/'/g, "''");

        sql += `INSERT INTO meals (name, type, calories, protein, carbs, fat, ingredients) VALUES ('${name}', '${mealType}', ${calories}, ${protein}, ${carbs}, ${fat}, '${ingredients}'::jsonb);\n`;
    });
});

fs.writeFileSync(outputFile, sql);
console.log(`Seed SQL generated at ${outputFile}`);
