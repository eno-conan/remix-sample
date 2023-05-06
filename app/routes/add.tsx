
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import type { LoaderArgs } from "@remix-run/node";

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 35.681167,
    lng: 139.767052,
};

const positionAkiba = {
    lat: 35.69731,
    lng: 139.7747,
};

const positionIwamotocho = {
    lat: 35.69397,
    lng: 139.7762,
};

interface Position {
    lat: number;
    lng: number;
}

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    console.info(formData);
    return redirect(`/`);
}

export const loader = async ({ request }: LoaderArgs) => {
    return json({
        ENV: {
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        },
    });
};

export default function Add() {
    const data = useLoaderData<typeof loader>();
    // const actionData = useActionData<typeof action>();
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: data.ENV.GOOGLE_API_KEY ?? ''
    })


    const [position, setPosition] = useState<Position | null>(null);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const newPosition = {
            lat: event.latLng!.lat(),
            lng: event.latLng!.lng(),
        };
        setPosition(newPosition);
    };

    return (<Form
        method="post"
        style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: "100%",
        }}
    >
        <div>
            <label className="flex w-full flex-col gap-1">
                <label htmlFor="title">タイトル</label>
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

        <div>
            <label className="flex w-full flex-col gap-1">
                <label htmlFor="comment">コメント</label>
                <textarea
                    ref={bodyRef}
                    name="comment"
                    rows={8}
                    className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
                // aria-invalid={actionData?.errors?.body ? true : undefined}
                // aria-errormessage={
                //     actionData?.errors?.body ? "body-error" : undefined
                // }
                />
            </label>
            {/* {actionData?.errors?.body ? (
                <div className="pt-1 text-red-700" id="body-error">
                    {actionData.errors.body}
                </div>
            ) : null} */}
        </div>
        <div>
            <label className="flex w-1/4 flex-col gap-1">
                <label htmlFor="image">画像登録</label>
                <input id="image" type="file" accept="image/*" />
            </label>
        </div>
        <div>
            {isLoaded ?
                (<GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                    onClick={handleMapClick}
                >
                    <Marker position={positionAkiba} />
                    <Marker position={positionIwamotocho} />
                </GoogleMap>
                )
                :
                <></>
            }
        </div>
        <div className="text-right">
            <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 mr-4"
            >
                確認画面へ
            </button>
        </div>
    </Form>)

}