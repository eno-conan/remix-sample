
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import type { LoaderArgs } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";


interface Position {
    lat: number;
    lng: number;
}
const containerStyle = {
    width: '50%',
    height: '250px',
};
const center = {
    lat: 35.681167,
    lng: 139.767052,
};
// 東京駅
const postionTokyo = {
    lat: 35.68181227967,
    lng: 139.76692300691604
}
// 大阪駅
const postionOsaka = {
    lat: 34.70263090912583,
    lng: 135.4961759014006
}

// 画面表示時にGoogle API Keyの値取得
export const loader = async ({ request }: LoaderArgs) => {
    return json({
        ENV: {
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
            SUPABASE_URL: process.env.SUPABASE_URL,
            SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        },
    });
};

export default function Add() {
    const [title, setTitle] = useState("");
    const [position, setPosition] = useState<Position | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const data = useLoaderData<typeof loader>();
    // Googleマップの読み込み
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: data.ENV.GOOGLE_API_KEY ?? ''
    })

    // 画像ファイル設定
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    // Map上にポインタを設定
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const newPosition = {
            lat: event.latLng!.lat(),
            lng: event.latLng!.lng(),
        };
        setPosition(newPosition);
    };
    // 中央の表示位置更新
    const updateStartPosition = (place: string) => {
        setPosition(position => postionOsaka);
    }

    // 送信（テーブル・ストレージへの登録）
    const handleSubmit = async () => {
        // SupabaseのClient定義
        const supabaseUrl = data.ENV.SUPABASE_URL;
        const supabaseAnonKey = data.ENV.SUPABASE_ANON_KEY;
        const supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!)
        if (file) {
            // const { data, error } = await supabaseClient.storage
            //     .from('place-images')
            //     .upload(`image/${file.name}`, file, {
            //         cacheControl: '3600',
            //         upsert: true,
            //     });
            // if (error) {
            //     console.error(error);
            // } else {
            //     alert('Upload successful');
            // window.location.href = "/";
            // }
        } else {
            alert('ファイルを選択してください')
        }
    };

    return (
        <div className="bg-gray-100">
            <div className="mx-10 mt-4">
                <label className="flex w-full flex-col gap-1">
                    <label htmlFor="title">タイトル</label>
                    <div className="text-red-500 font-semibold text-xs">必須
                        入力です</div>
                    <input
                        id="title"
                        // name="title"
                        value={title}
                        className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                        onChange={(e) => setTitle(e.target.value)}
                    // aria-invalid={actionData?.errors?.title ? true : undefined}
                    // aria-errormessage={
                    //     actionData?.errors?.title ? "title-error" : undefined
                    // }
                    />
                </label>
            </div>

            <div className="mx-10 mt-4">
                <label className="flex w-full flex-col gap-1">
                    <label htmlFor="comment">コメント</label>
                    <div className="text-red-500 font-semibold text-xs">必須入力です</div>
                    <textarea
                        // name="comment"
                        rows={3}
                        className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
                    // aria-invalid={actionData?.errors?.body ? true : undefined}
                    // aria-errormessage={
                    //     actionData?.errors?.body ? "body-error" : undefined
                    // }
                    />
                </label>
            </div>
            <div className="mx-10 mt-6">
                <label className="flex w-1/4 flex-col gap-1">
                    <label htmlFor="image">画像登録</label>
                    <div className="text-green-600 font-bold">未登録でも構いません</div>
                    <input id="image" type="file" accept="image/*" onChange={handleChange} />
                </label>
            </div>
            <div className="mx-10 mt-6">
                <label htmlFor="position">訪問場所</label>
                <div className="text-green-600 font-bold">未登録でも構いません</div>
                <button type="button" className="bg-green-200 border-e-2" onClick={() => updateStartPosition('Osaka')}>
                    大阪駅
                </button>
            </div>
            <div className="mx-10 mt-2">
                {isLoaded ?
                    (<GoogleMap
                        mapContainerStyle={containerStyle}
                        center={position ?? center}
                        zoom={13}
                        onClick={handleMapClick}
                    >
                        <Marker position={position ?? postionTokyo} />
                        <input id="position" type="hidden" value={`${position?.lat!}/${position?.lng!}`} />
                    </GoogleMap>
                    )
                    :
                    <></>
                }
            </div>
            <div className="mr-10 my-6 text-right">
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-800 focus:bg-green-800 mr-4"
                >
                    確認画面へ
                </button>
            </div>
        </div>
    )

}