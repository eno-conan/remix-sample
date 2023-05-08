/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />
interface Window {
    ENV: {
        SUPABASE_URL: string
        SUPABASE_ANON_KEY: string
        GOOGLE_API_KEY: string
    }
}