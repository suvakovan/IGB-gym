
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

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

async function verify() {
    console.log('🔍 Verifying Supabase Data...');

    // Check Gym Info
    const { data: gymInfo, error: gymError } = await supabase.from('gym_info').select('count(*)').single();
    if (gymError) {
        console.error('❌ Error fetching gym_info:', gymError.message);
    } else {
        console.log(`✅ Gym Info Count: ${gymInfo?.count ?? 'N/A'}`); // Note: count(*) returns object depending on query, actually select('*', {count: 'exact'}) is better for count
    }

    // Let's just select one item
    const { data: exercises, error: exError } = await supabase.from('exercises').select('name').limit(1);
    if (exError) console.error('❌ Error fetching exercises:', exError.message);
    else console.log(`✅ Exercises Found: ${exercises?.length}`);

    const { data: meals, error: mealError } = await supabase.from('meals').select('name').limit(1);
    if (mealError) console.error('❌ Error fetching meals:', mealError.message);
    else console.log(`✅ Meals Found: ${meals?.length}`);

    if (!gymError && !exError && !mealError) {
        console.log('✨ Verification Successful!');
    } else {
        process.exit(1);
    }
}

verify().catch(e => console.error(e));
