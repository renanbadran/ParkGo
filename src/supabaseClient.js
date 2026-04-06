import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://unvzbszdocfmcfpguvrc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudnpic3pkb2NmbWNmcGd1dnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0ODI0NjAsImV4cCI6MjA5MTA1ODQ2MH0.ECZr4s_KXYzXrIy_AmNPHayun8Ghouc3EftBDefZLn4'

export const supabase = createClient(supabaseUrl, supabaseKey)