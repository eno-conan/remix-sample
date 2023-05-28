import { json, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { useEffect, useState } from "react";
import { BeatLoader, PropagateLoader } from "react-spinners";
import { getRecommendPlace } from "~/hooks/chatgpt"

// 画面表示時にGoogle API Keyの値取得
export const loader = async ({ request }: LoaderArgs) => {
    return json({
        ENV: {
            OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        },
    });
};

const genre = [
    { label: '選択してください', value: '' },
    { label: '海・河川', value: '海・河川' },
    { label: '山・森林', value: '山・森林' },
    { label: 'アクティビティ', value: 'アクティビティ' },
    { label: '歴史的建造物', value: '歴史的建造物' },
];

const aria = [
    { label: '選択してください', value: '' },
    { label: '北海道', value: '北海道' },
    { label: '東北', value: '東北' },
    { label: '関東', value: '関東' },
    { label: '近畿', value: '近畿' },
]

export const meta: V2_MetaFunction = () => [{ title: "候補地検索" }];
export default function Search() {
    const data = useLoaderData<typeof loader>();
    const [chatGptAns, setChatGptAns] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    // プルダウン
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const handleSelectGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(event.target.value);
    };
    const handleSelectArea = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedArea(event.target.value);
    };

    async function searchRecommendationPlaces() {
        // バリデーション
        if (selectedGenre.length === 0 || selectedArea.length === 0) {
            alert("プルダウンから値を選択してください");
            return
        }
        setIsLoading(true);
        const questionContent = `${selectedArea}の${selectedGenre}で良い写真が取れそうな場所を2つ教えてください。`;
        // TODO:リンクや地図については最新の情報でない・リンクが404になるケースがあるため、保留
        // また各場所に関連したリンクと地図情報を合わせて教えてください。`;
        try {
            // Dummy Data
            await sleep(1000);
            setChatGptAns('abc');
            // 実Data設定
            const ans = await getRecommendPlace(data.ENV.OPENAI_API_KEY ?? '', questionContent);
            setChatGptAns(ans ?? '');
        } finally {
            setIsLoading(false);
        }
    }

    const BeatLoaderAria = () => {
        return (
            <div className="flex justify-center items-center pt-4">
                <BeatLoader color="#36d7b7" size={18} />
                {/* <PropagateLoader color="#36d7b7" size={20} /> */}
            </div>
        )
    }

    return (
        <>
            <main className="bg-gray-100 sm:items-center sm:justify-center mt-20 pb-10">
                <div className="justify-center items-center py-4">
                    <div className="w-full px-6">
                        <label htmlFor="select-a" className="block text-gray-700 font-bold my-2">
                            ジャンル
                        </label>
                        <div className="relative">
                            <select
                                id="select-a"
                                value={selectedGenre}
                                onChange={handleSelectGenre}
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow focus:outline-none focus:shadow-outline"
                            >
                                {genre.map((sct) => (
                                    <option value={sct.value} key={sct.value}>{sct.label}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-6">
                        <label htmlFor="select-b" className="block text-gray-700 font-bold my-2">
                            エリア
                        </label>
                        <div className="relative">
                            <select
                                id="select-b"
                                value={selectedArea}
                                onChange={handleSelectArea}
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {aria.map((sct) => (
                                    <option value={sct.value} key={sct.value}>{sct.label}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-center my-4">
                        <button
                            className="w-1/8 text-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700"
                            onClick={() => searchRecommendationPlaces()}
                            disabled={isLoading}>
                            聞いてみる</button>
                    </div>
                    <div className="pl-8 text-xl">以下に回答を表示します（～20秒かかります）</div>
                    {isLoading ?
                        <>
                            <BeatLoaderAria />
                        </>
                        :
                        <>
                            <div className="px-6 font-semibold pt-4">
                                {chatGptAns.split("\n").map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                                {chatGptAns ?
                                    <>
                                        <div className="mt-4">
                                            <button
                                                className="w-1/6 text-xl disabled:bg-gray-700 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                // onClick={() => searchRecommendationPlaces()}
                                                disabled={true}>
                                                追加で質問</button>
                                        </div>
                                    </>
                                    :
                                    <></>}
                            </div>
                        </>
                    }
                </div>
            </main>
        </>
    )
}

// ちょっとスリープを設けたいときに使用する
async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
