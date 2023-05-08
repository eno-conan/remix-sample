import { createClient } from "@supabase/supabase-js";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderArgs) => {
    return json({
        ENV: {
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
            SUPABASE_URL: process.env.SUPABASE_URL,
            SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        },
    });
};

export default function Supabase() {
    const data = useLoaderData<typeof loader>();

    const supabaseUrl = data.ENV.SUPABASE_URL;
    const supabaseAnonKey = data.ENV.SUPABASE_ANON_KEY;
    const supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!)

}