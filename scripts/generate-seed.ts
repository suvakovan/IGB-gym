import fs from 'fs';
import path from 'path';
const { gymKnowledge, exerciseDatabase, mealDatabase } = require('../lib/aiUtils');

const outputFile = path.join(process.cwd(), 'supabase', 'seed_data.sql');

let sql = `-- Seed Data for Alpha Gym
-- Generated from lib/aiUtils.ts

`;

// 1. Gym Info
sql += `-- GYM INFO\n`;
const addGymInfo = (category: string, key: string, value: any) => {
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
    exercises.forEach((ex: any) => {
        const name = ex.name.replace(/'/g, "''");
        const sets = ex.sets;
        const reps = ex.reps; // Keep as string "8-12"
        const equipment = ex.equipment.replace(/'/g, "''");

        sql += `INSERT INTO exercises (name, muscle_group, sets, reps, equipment) VALUES ('${name}', '${muscleGroup}', ${sets}, '${reps}', '${equipment}');\n`;
    });
});


// 3. Meals
sql += `\n-- MEALS\n`;
Object.entries(mealDatabase).forEach(([mealType, meals]) => {
    meals.forEach((meal: any) => {
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
