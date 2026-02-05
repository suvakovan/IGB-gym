
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const getEnvVar = (key: string) => {
    const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
    return match ? match[1].trim() : '';
};
const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
    console.log('🧪 Testing Chat Log Insertion...');
    const { data, error } = await supabase.from('chat_logs').insert({
        role: 'user',
        message: 'Test message from verification script ' + new Date().toISOString()
        // user_id is null/undefined
    }).select();

    if (error) {
        console.error('❌ Insert Failed:', error.message);
        console.error('Details:', error);
    } else {
        console.log('✅ Insert Successful:', data);
    }
}

testInsert();
