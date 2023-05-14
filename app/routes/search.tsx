import { json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";
import { getRecommendPlace } from "~/hooks/chatgpt"

// 画面表示時にGoogle API Keyの値取得
export const loader = async ({ request }: LoaderArgs) => {
    return json({
        ENV: {
            OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        },
    });
};


export default function Search() {
    const data = useLoaderData<typeof loader>();
    const [chatGptAns, setChatGptAns] = useState<string>("");

    async function searchRecommendationPlaces() {
        // getRecommendPlace(data.ENV.OPENAI_API_KEY ?? '');
        const configuration = new Configuration({
            apiKey: data.ENV.OPENAI_API_KEY,
        });
        delete configuration.baseOptions.headers['User-Agent'];
        const content = "進撃の巨人の「リヴァイ」について30文字で教えてください。";
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: content }],
        });

        // レスポンスとしては30秒くらいかな？
        const answer = response.data.choices[0].message?.content;
        setChatGptAns(answer ?? '');
    }

    return (
        <>
            <main className="bg-gray-100 sm:items-center sm:justify-center mt-20 pb-10">
                <div>
                    <div className="text-center mb-4">
                        <div className="w-1/4 text-xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => searchRecommendationPlaces()}>聞いてみる（リヴァイって誰？）</div>
                    </div>
                    <h3>回答結果</h3>
                    {chatGptAns ?
                        <>{chatGptAns}</> :
                        <>Loading...</>}
                </div>
            </main>
        </>

    )
}