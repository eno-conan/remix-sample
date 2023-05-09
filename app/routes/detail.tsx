import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData, useParams, useSearchParams } from "@remix-run/react";

export default function Detail() {
    const [searchParams] = useSearchParams();

    const url = searchParams.get('url');
    return (
        <>
            <img className="h-64 cursor-pointer" src={url!} alt={"image"} width={250} height={250} />
            Detail
        </>
    )
}