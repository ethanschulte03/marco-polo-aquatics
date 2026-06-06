import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wtwmawzdzumyukinfpcv.supabase.co'
const supabaseKey = 'sb_publishable_D0ZLwbeTEl01ubArMBXt3g_1m_oSDtM'

export const supabase = createClient(supabaseUrl, supabaseKey)
