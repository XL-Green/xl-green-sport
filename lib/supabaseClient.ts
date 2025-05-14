import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://buqessyprcaehdrcerix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cWVzc3lwcmNhZWhkcmNlcml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxOTcxOTgsImV4cCI6MjA2Mjc3MzE5OH0.lrUDJD5f8bz1JJ21lG_7iySQdiS4PaIWvYEDrPqHW14';

export const supabase = createClient(supabaseUrl, supabaseKey);
