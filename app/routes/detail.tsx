import { Link } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export default function Detail() {
    const location = useLocation();
    const [image, setImage] = useState<{ url: string, name: string }>(location.state as { url: string, name: string })

    // const [data, setData] = useState<any>(null);

    // useEffect(() => {
    //     async function fetchData() {
    //         const supabaseClient = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
    //         const { data, error } = await supabaseClient
    //             .storage
    //             .from('place-images')
    //             .list('image', {
    //                 limit: 3,
    //                 offset: 0,
    //                 sortBy: { column: 'name', order: 'asc' },
    //             })
    //         // const response = await fetch("https://example.com/data");
    //         // const data = await response.json();
    //         setData(data);
    //     }
    //     fetchData();
    // }, []);
    // ここでデータ取得？サーバサイドからデータ取得だから・・・
    return (
        <>
            <div className="flex bg-gray-100 py-4">
                <div className="w-1/2">
                    {/* 一覧に戻るリンク */}
                    <Link to="/top" className="text-green-500 underline hover:text-green-700 hover:animate-bounce ml-4 text-2xl">
                        一覧に戻る
                    </Link>
                    {/* 左半分 */}
                    <div className="flex justify-center items-center pt-8">
                        {/* 画像 */}
                        <img src="https://dummyimage.com/128x128" alt="example" className="w-96 h-96" />
                    </div>
                </div>

                {/* 右半分 */}
                <div className="w-1/2 pt-4">
                    {/* タイトル */}
                    <h1 className="text-4xl font-bold text-black mb-4">タイトル</h1>
                    {/* 概要 */}
                    <p className="text-gray-800 mb-4 max-w-md overflow-hidden overflow-ellipsis whitespace-pre-line">
                        概要のテキストが入ります。概要のテキストが入ります。概要のテキストが入ります。概要のテキストが入ります。概要のテキストが入ります。概要のテキストが入ります。
                    </p>
                    {/* 画像 */}
                    <img src="https://dummyimage.com/150x150" alt="example" className="w-96 h-48 mb-4" />
                    {/* 編集ボタン */}
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => console.log('Hello World')}>
                        編集
                    </button>
                </div>
            </div>
            {/* {image ?
                <img className="h-64 cursor-pointer" src={image.url!} alt={"image"} width={250} height={250} />
                : <></>
            }
            <div>{image.name!}</div>
            Detail */}
        </>
    )
}