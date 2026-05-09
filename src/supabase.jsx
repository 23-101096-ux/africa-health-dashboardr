
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://fqadriqnnueajmtgujdd.supabase.co'
const supabaseKey = 'sb_publishable_JsrfGg3eXM8C67owwnIoUA_2KlQf-M1'
export const supabase = createClient(supabaseUrl, supabaseKey)