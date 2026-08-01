import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
  console.log('Testing login for moinuddinhassan758@gmail.com');
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'moinuddinhassan758@gmail.com',
    password: 'password123', // Just a guess, we want to see the error
  });
  
  if (error) {
    console.error('Login Failed:');
    console.error(error.message, error.status, error.name);
  } else {
    console.log('Login Succeeded!');
    console.log(data.user);
  }
}

testLogin();
