
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState, useTransition } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import type { LoaderArgs } from "@remix-run/node";

const containerStyle = {
    width: '30%',
    height: '300px',
};

const center = {
    lat: 35.681167,
    lng: 139.767052,
};

const postionTokyo = {
    lat: 35.68181227967,
    lng: 139.76692300691604
}

const postionOsaka = {
    lat: 34.70263090912583,
    lng: 135.4961759014006
}

interface Position {
    lat: number;
    lng: number;
}

// 追加実行
export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const title = formData.get("title");
    const comment = formData.get("comment");
    const placeImage = formData.get("placeImage");
    const position = formData.get("position");

    console.info(title, comment, placeImage, position);
    return redirect(`/`);
}

// 画面表示時にGoogle API Keyの値取得
export const loader = async ({ request }: LoaderArgs) => {
    return json({
        ENV: {
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        },
    });
};

export default function Add() {
    const data = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);

    const [position, setPosition] = useState<Position | null>(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: data.ENV.GOOGLE_API_KEY ?? ''
    })

    // Map上にポインタを設定
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const newPosition = {
            lat: event.latLng!.lat(),
            lng: event.latLng!.lng(),
        };
        setPosition(newPosition);
    };

    // 中央に表示する位置を更新する
    const updateStartPosition = (place: string) => {
        setPosition(position => postionOsaka);
    }

    return (
        <div className="bg-gray-100">
            <Form
                method="post"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    width: "100%",
                }}
            >
                <div className="mx-10 mt-4">
                    <label className="flex w-full flex-col gap-1">
                        <label htmlFor="title">タイトル</label>
                        <div className="text-red-500 font-semibold text-xs">必須入力です</div>
                        <input
                            id="title"
                            ref={titleRef}
                            name="title"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                        // aria-invalid={actionData?.errors?.title ? true : undefined}
                        // aria-errormessage={
                        //     actionData?.errors?.title ? "title-error" : undefined
                        // }
                        />
                    </label>
                    {/* {actionData?.errors?.title ? (
                <div className="pt-1 text-red-700" id="title-error">
                    {actionData.errors.title}
                </div>
            ) : null} */}
                </div>

                <div className="mx-10">
                    <label className="flex w-full flex-col gap-1">
                        <label htmlFor="comment">コメント</label>
                        <div className="text-red-500 font-semibold text-xs">必須入力です</div>
                        <textarea
                            ref={bodyRef}
                            name="comment"
                            rows={5}
                            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
                        // aria-invalid={actionData?.errors?.body ? true : undefined}
                        // aria-errormessage={
                        //     actionData?.errors?.body ? "body-error" : undefined
                        // }
                        />
                        {/* {actionData?.errors?.body ? (
                <div className="pt-1 text-red-700" id="body-error">
                    {actionData.errors.body}
                </div>
            ) : null} */}
                    </label>
                </div>
                <div className="mx-10 mt-6">
                    <label className="flex w-1/4 flex-col gap-1">
                        <label htmlFor="image">画像登録</label>
                        <div className="text-green-600 font-bold">未登録でも構いません</div>
                        <input id="image" name="placeImage" type="file" accept="image/*" />
                    </label>
                </div>
                <div className="mx-10 mt-6">
                    <label htmlFor="position">訪問場所</label>
                    <div className="text-green-600 font-bold">未登録でも構いません</div>
                    <button type="button" className="bg-green-200 border-e-2" onClick={() => updateStartPosition('Osaka')}>
                        大阪駅
                    </button>
                </div>
                <div className="mx-14">
                    {isLoaded ?
                        (<GoogleMap
                            mapContainerStyle={containerStyle}
                            center={position ?? center}
                            zoom={13}
                            onClick={handleMapClick}
                        // onMouseOver
                        >
                            <Marker position={position ?? postionTokyo} />
                            <input id="position" name="position" type="hidden" value={`${position?.lat!}/${position?.lng!}`} />
                        </GoogleMap>
                        )
                        :
                        <></>
                    }
                </div>
                <div className="mr-10 mb-6 text-right">
                    <button
                        type="submit"
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-800 focus:bg-green-800 mr-4"
                    >
                        確認画面へ
                    </button>
                </div>
            </Form>
        </div>
    )

}