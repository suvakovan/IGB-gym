
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

    // Check Profiles
    const { data: profiles, error: profError } = await supabase.from('profiles').select('*').limit(1);
    if (profError) console.error('❌ Error fetching profiles:', profError.message);
    else console.log(`✅ Profiles Rows Found: ${profiles?.length}`);

    // Check Chat Logs
    const { data: chats, error: chatError } = await supabase.from('chat_logs').select('*').limit(1);
    if (chatError) console.error('❌ Error fetching chat logs:', chatError.message);
    else console.log(`✅ Chat Logs Found: ${chats?.length}`);

    // Check Gym Info
    const { data: gymInfo, error: gymError } = await supabase.from('gym_info').select('*').limit(1);
    if (gymError) {
        console.error('❌ Error fetching gym_info:', gymError.message);
    } else {
        console.log(`✅ Gym Info Rows Found: ${gymInfo?.length}`);
        if (gymInfo?.length > 0) console.log('Sample:', gymInfo[0].category, gymInfo[0].key);
    }

    // Check Exercises
    const { data: exercises, error: exError } = await supabase.from('exercises').select('*').limit(1);
    if (exError) console.error('❌ Error fetching exercises:', exError.message);
    else console.log(`✅ Exercises Rows Found: ${exercises?.length}`);

    // Check Meals
    const { data: meals, error: mealError } = await supabase.from('meals').select('*').limit(1);
    if (mealError) console.error('❌ Error fetching meals:', mealError.message);
    else console.log(`✅ Meals Rows Found: ${meals?.length}`);

    if (!gymError && !exError && !mealError) {
        if ((gymInfo?.length || 0) + (exercises?.length || 0) + (meals?.length || 0) === 0) {
            console.log('⚠️ Database appears connected but EMPTY.');
        } else {
            console.log('✨ Verification Successful! Data exists.');
        }
    }
}

verify().catch(e => console.error(e));
