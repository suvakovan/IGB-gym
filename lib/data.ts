import { createClient } from '@/lib/supabase/client';

export const supabase = createClient();

export async function getGymContext() {
    const { data: gymInfo, error } = await supabase
        .from('gym_info')
        .select('category, key, value');

    if (error) {
        console.error('Error fetching gym info:', error);
        return null;
    }

    // Reconstruct the nested object structure for the AI prompt
    const knowledge: any = {
        hours: {},
        pricing: {},
        contact: {},
        programs: [],
        trainers: []
    };

    gymInfo.forEach((item: any) => {
        try {
            if (item.category === 'programs' || item.category === 'trainers') {
                knowledge[item.category] = item.value; // These are stored as JSON arrays
            } else if (knowledge[item.category]) {
                // Check if value is a JSON string that needs parsing (double encoded) or just a value
                let val = item.value;
                knowledge[item.category][item.key] = val;
            }
        } catch (e) {
            console.error(`Error processing item ${item.category}.${item.key}`, e)
        }
    });

    return knowledge;
}

export async function getExercises(muscleGroup: string) {
    const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('muscle_group', muscleGroup);

    if (error) throw error;
    return data;
}

export async function getAllExercises() {
    const { data, error } = await supabase.from('exercises').select('*');
    if (error) throw error;
    return data;
}

export async function getMeals(type?: string) {
    let query = supabase.from('meals').select('*');
    if (type) {
        query = query.eq('type', type);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function fetchFullExerciseDatabase() {
    const { data, error } = await supabase.from('exercises').select('*');
    if (error) {
        console.error('Error fetching exercises:', error);
        return {};
    }

    // Group by muscle group
    const db: Record<string, any[]> = {};
    data.forEach((ex: any) => {
        const group = ex.muscle_group.toLowerCase();
        if (!db[group]) db[group] = [];
        db[group].push(ex);
    });
    return db;
}

export async function fetchFullMealDatabase() {
    const { data, error } = await supabase.from('meals').select('*');
    if (error) {
        console.error('Error fetching meals:', error);
        return {};
    }

    // Group by type
    const db: Record<string, any[]> = {};
    data.forEach((meal: any) => {
        const type = meal.type.toLowerCase(); // breakfast, lunch...
        if (!db[type]) db[type] = [];
        // Ensure ingredients is an array if it came back as string/json (Supabase handles jsonb as object usually)
        let ingredients = meal.ingredients;
        if (typeof ingredients === 'string') {
            try { ingredients = JSON.parse(ingredients); } catch (e) { }
        }

        db[type].push({
            ...meal,
            ingredients
        });
    });
    return db;
}
