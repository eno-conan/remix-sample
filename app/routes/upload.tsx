import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const loader = async ({ request }: LoaderArgs) => {
    return json({
        ENV: {
            SUPABASE_URL: process.env.SUPABASE_URL,
            SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        },
    });
};

export default function Upload() {
    const data = useLoaderData<typeof loader>();
    const supabaseUrl = data.ENV.SUPABASE_URL;
    const supabaseAnonKey = data.ENV.SUPABASE_ANON_KEY;
    // Supabase
    const supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!)

    const [file, setFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (file) {
            const { data, error } = await supabaseClient.storage
                .from('place-images')
                .upload(`image/${file.name}`, file, {
                    cacheControl: '3600',
                    upsert: true,
                });
            if (error) {
                console.error(error);
            } else {
                alert('Upload successful');
                window.location.href = "/upload";
            }
        } else {
            alert('ファイルを選択してください')
        }
    };

    return (
        <>
            <div className="mt-6 mx-10">
                <input type="file" accept="image/*" onChange={handleChange} />
                <button onClick={() => handleSubmit()} disabled={file === null}
                    className="bg-green-400 disabled:bg-gray-100 disabled:text-gray-300 font-bold py-2 px-4 rounded">
                    送信</button>
            </div>
        </>
    );
}
