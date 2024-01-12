import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://gyveodrmjtapiehapkxu.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5dmVvZHJtanRhcGllaGFwa3h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyMjA1NzIsImV4cCI6MjAxNzc5NjU3Mn0.-_Ckz1CW-QFOZpcr4oFb3pxYsNAmvplo6zmGytpjbFQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
