
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { gymKnowledge, exerciseDatabase, mealDatabase } from '../lib/staticData';

// Load environment variables from .env manually
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

const getEnvVar = (key: string) => {
    const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
    return match ? match[1].trim() : '';
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log('🌱 Starting seed...');

    // 1. Gym Info
    console.log('Inserting Gym Info...');
    // Clear old entries if needed? Better to just insert/upsert.
    // We'll delete all first to avoid duplicates since we don't have unique keys on category/key constraint (Wait, we might not).
    // Ideally we should have a unique constraint but for now let's just wipe table or assume empty. 
    // Safety: let's delete all first.
    await supabase.from('gym_info').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    const gymEntries: any[] = [];

    // Hours
    Object.entries(gymKnowledge.hours).forEach(([key, value]) => {
        gymEntries.push({ category: 'hours', key, value });
    });
    // Pricing
    Object.entries(gymKnowledge.pricing).forEach(([key, value]) => {
        gymEntries.push({ category: 'pricing', key, value });
    });
    // Contact
    Object.entries(gymKnowledge.contact).forEach(([key, value]) => {
        gymEntries.push({ category: 'contact', key, value });
    });
    // Programs
    gymEntries.push({ category: 'programs', key: 'list', value: gymKnowledge.programs });
    // Trainers
    gymEntries.push({ category: 'trainers', key: 'list', value: gymKnowledge.trainers });

    const { error: gymError } = await supabase.from('gym_info').insert(gymEntries);
    if (gymError) console.error('Error inserting gym info:', gymError);
    else console.log('✅ Gym Info inserted');


    // 2. Exercises
    console.log('Inserting Exercises...');
    await supabase.from('exercises').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const exerciseEntries: any[] = [];
    Object.entries(exerciseDatabase).forEach(([muscleGroup, exercises]) => {
        (exercises as any[]).forEach(ex => {
            exerciseEntries.push({
                name: ex.name,
                muscle_group: muscleGroup,
                sets: ex.sets || 3,
                reps: ex.reps || "10-12",
                equipment: ex.equipment
            });
        });
    });

    const { error: exError } = await supabase.from('exercises').insert(exerciseEntries);
    if (exError) console.error('Error inserting exercises:', exError);
    else console.log(`✅ ${exerciseEntries.length} Exercises inserted`);


    // 3. Meals
    console.log('Inserting Meals...');
    await supabase.from('meals').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const mealEntries: any[] = [];
    Object.entries(mealDatabase).forEach(([type, meals]) => {
        (meals as any[]).forEach(meal => {
            mealEntries.push({
                name: meal.name,
                type: type, // breakfast, etc.
                calories: meal.calories,
                protein: meal.protein,
                carbs: meal.carbs,
                fat: meal.fat,
                ingredients: meal.ingredients
            });
        });
    });

    const { error: mealError } = await supabase.from('meals').insert(mealEntries);
    if (mealError) console.error('Error inserting meals:', mealError);
    else console.log(`✅ ${mealEntries.length} Meals inserted`);

    console.log('✨ Seed completed!');
}

seed().catch(e => console.error(e));
