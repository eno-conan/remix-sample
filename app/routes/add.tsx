
import { json, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import type { LoaderArgs } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";
// import { check } from "../generated/check";
import { formData } from "~/utils/validation";
import { ZodError } from 'zod';
import GoogleMapField from "~/components/GoogleMapField";
import PageTitle from "~/components/pageTitle";

interface Position {
    lat: number;
    lng: number;
}

// 東京駅
// const postionTokyo = {
//     lat: 35.68181227967,
//     lng: 139.76692300691604
// }
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
        },
    });
};

interface IValidateError {
    title: string[] | undefined;
    comment: string[] | undefined;
}

export const meta: V2_MetaFunction = () => [{ title: "記録追加" }];
export default function Add() {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [position, setPosition] = useState<Position | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<IValidateError>({
        title: [],
        comment: [],
    });
    const data = useLoaderData<typeof loader>();
    // 画像ファイル設定
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    // 中央の表示位置更新（数か所くらい起点を用意する予定）
    const updateStartPosition = (place: string) => {
        setPosition(position => postionOsaka);
    }

    // ========================================
    // 送信（テーブル・ストレージへの登録）
    const handleSubmit = async () => {
        // SupabaseのClient定義
        const supabaseClient = createClient(window.ENV.SUPABASE_URL!, window.ENV.SUPABASE_ANON_KEY!)

        // ==============Typiaを用いたバリデーション==============
        // https://zenn.dev/hr20k_/articles/3ecde4239668b2
        // console.log(check({
        //     title: 'aa1',
        //     comment: 'test@example.com',
        // }));
        // ==============Zodを用いたバリデーション==============
        try {
            formData.parse({ title, comment })
        } catch (e) {
            if (e instanceof ZodError) {
                setErrors({
                    ...errors,
                    title: e.flatten().fieldErrors.title,
                    comment: e.flatten().fieldErrors.comment
                });
                return
            } else {
                console.log(e);
            }
        }
        // テーブルへのデータ登録
        // ストレージへの画像ファイル登録
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
                alert('Upload successful!!!');
            }
        }
        window.location.href = "/";
    };

    // ========================================
    const RequiredFieldMsg = () => {
        return (<div className="text-red-500 font-semibold text-sm">必須入力です</div>);
    }
    const UnRequiredFieldMsg = () => {
        return (<div className="text-green-600 font-bold">未登録でも構いません</div>);
    }
    const FormErrorMsg = (msg: string) => {
        return (<div>{msg}</div>);
    }

    const TitleField = () => {
        return (<>
            <label className="flex w-full flex-col gap-1">
                <label htmlFor="title">タイトル</label>
                <RequiredFieldMsg />
                <input
                    id="title"
                    value={title}
                    className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            {errors?.title && FormErrorMsg(errors?.title[0])}
        </>)
    }

    const CommentField = () => {
        return (
            <>
                <label className="flex w-full flex-col gap-1">
                    <label htmlFor="comment">コメント</label>
                    <RequiredFieldMsg />
                    <textarea
                        value={comment}
                        rows={3}
                        className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    {errors?.comment && FormErrorMsg(errors?.comment[0])}
                </label>
            </>
        )
    }

    const ImageField = () => {
        return (
            <>
                <label className="flex md:w-1/2 sm:w-2/3 flex-col gap-1">
                    <label htmlFor="image">画像登録</label>
                    <UnRequiredFieldMsg />
                    <input id="image" type="file" accept="image/*" onChange={handleChange} />
                </label>
            </>
        )
    }

    const ChangeCenterPlaceCompo = () => {
        return (<>
            <label className="flex md:w-1/2 sm:w-2/3 flex-col gap-1">
                <label htmlFor="position">訪問場所</label>
                <UnRequiredFieldMsg />
                {PlaceButton('大阪駅', 'Osaka')}
                {PlaceButton('福岡駅', 'Fukuoka')}
            </label>
        </>)
    }
    const PlaceButton = (placeLabel: string, placeRome: string) => {
        return (
            <>
                <button type="button" className="bg-green-200 border-e-2" onClick={() => updateStartPosition(placeRome)}>
                    {placeLabel}
                </button>
            </>

        )
    }

    // ========================================

    return (
        <>
            <PageTitle pageTitle="記録追加" />
            <div className="bg-gray-100">
                <div className="mx-8">
                    {TitleField()}
                </div>
                <div className="mx-8 mt-4">
                    {CommentField()}
                </div>
                <div className="mx-8 mt-6">
                    {ImageField()}
                </div>
                <div className="mx-8 mt-6">
                    {ChangeCenterPlaceCompo()}
                </div>
                <div className="mx-8 mt-4">
                    <GoogleMapField position={position} setPosition={setPosition} apiKey={data.ENV.GOOGLE_API_KEY!} />
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
        </>
    )
}