import { createClient } from '@supabase/supabase-js';

require('dotenv').config();

export const api = createClient(process.env.PROJECT_URL, process.env.API_KEY);
