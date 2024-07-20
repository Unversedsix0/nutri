import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = 'https://zuzkyzvirrmvbmuaqarg.supabase.co';

const API_KEY ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1emt5enZpcnJtdmJtdWFxYXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwODUzODksImV4cCI6MjAzNjY2MTM4OX0.If5jFdDeqjiwJab_sDx24xQLQmNXUEiowq1cW1LDlL0';

export const api = createClient(PROJECT_URL, API_KEY);
