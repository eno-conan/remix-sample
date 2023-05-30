import { json, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PageTitle from "~/components/pageTitle";
import { cache } from "~/utils/cache";

export const loader = async ({ request }: LoaderArgs) => {
    // TODO:Supabaseの処理をFunctionに移行したい=====
    // 画像をsupabaseから取得する前に、cacheに情報が存在するか判定
    if (cache.has("topImagesCache")) {
        console.info('use cache')
        return json(cache.get("topImagesCache"));
    }
    // cacheから情報が取得不可の場合は、supabaseからdata取得
    const supabaseClient = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
    const names: string[] = []
    const { data, error } = await supabaseClient
        .storage
        .from('place-images')
        .list('image', {
            limit: 3,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        })
    // 画像ファイル名を格納し、画面表示用のURLを取得
    // dataが1件もなければ、データ取得はsignedUrlの取得不要
    if (data!.length > 0) {
        data!.forEach((p: any) => {
            // .emptyFolderPlaceholderの場合は取得対象外
            if (p.name !== '.emptyFolderPlaceholder') {
                names.push(`image/${p.name}`);
            }
        })
    }
    if (names.length > 0) {
        console.info("get from supabase")
        const signedUrls = await supabaseClient
            .storage
            .from('place-images')
            .createSignedUrls(names, 600)
        // cacheに画像情報を設定
        cache.set("topImagesCache", {
            signedUrls: signedUrls.data,
            names: names
        }, 1 * 1 * 1000);
        return json({
            signedUrls: signedUrls.data,
            names: names,
            noCache: true,
        });
    } else {
        return json({
            signedUrls: [],
            names: names
        });
    }
};

export const meta: V2_MetaFunction = () => [{ title: "直近の記録" }];
export default function Top() {
    // ローディング表示管理
    const data: any = useLoaderData<typeof loader>();

    const navigate = useNavigate();
    const displayDetail = (url: string, idx: number) => {
        // TODO:このままのURLの場合、参照リンクにした場合に表示できなくなるので、もう少し工夫が必要
        navigate("/detail", {
            state: {
                url: url,
                name: data.names[idx]
            }
        });
    }

    return (
        <>
            <PageTitle pageTitle="最近の写真" />
            <div className="px-2 my-2">
                <div className="flex flex-wrap">
                    {data.signedUrls!.length > 0 ?
                        data.signedUrls!.map((p: any, idx: number) => (
                            <div className="md:w-1/3 sm:w-1/2 m-2 px-2 rounded-lg overflow-hidden shadow-md hover:scale-105"
                                key={p.signedUrl}>
                                <LazyLoadImage src={`${p.signedUrl}`}
                                    alt={p.signedUrl}
                                    effect="opacity"
                                    className="w-full h-full rounded"
                                />
                            </div>
                        ))
                        :
                        <>
                            <div className="bg-white sm:flex sm:items-center sm:justify-center mt-4 text-xl">画像が登録されていません</div>
                        </>
                    }
                </div>
            </div>
            <div className="flex justify-center items-center py-4 bg-gray-100">
                <div className="text-center">
                    <Link to="/list">
                        <div className="text-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">続きを見る</div>
                    </Link>
                </div>
            </div>
        </>
    );
}
