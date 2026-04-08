// lib/supabase.ts
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "❌ Variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY não encontradas.\n" +
    "Crie um arquivo .env.local na raiz do projeto com essas variáveis."
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Tipos centralizados do banco ──────────────────────────────────────────────

export type Product = {
  id: string           // uuid
  name: string
  description: string | null
  price: number
  image_path: string | null
  category: string | null
  is_new: boolean
  is_available: boolean
  accepts_custom: boolean
  whatsapp_text: string
  created_at: string
}

export type Store = {
  id: string
  user_id: string
  slug: string
  name: string
  description: string | null
  whatsapp: string
  avatar_url: string | null
  city: string | null
  is_active: boolean
  created_at: string
}
